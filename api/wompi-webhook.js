import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase with service role key for server-side operations
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Wompi events secret for signature validation
const wompiEventsSecret = process.env.WOMPI_EVENTS_SECRET;

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Event-Checksum');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    console.log('Wompi Webhook received:', JSON.stringify(req.body, null, 2));

    try {
        const { event, data, signature } = req.body;

        // Validate required fields
        if (!event || !data) {
            console.error('Missing event or data in webhook payload');
            return res.status(400).json({ error: 'Missing event or data' });
        }

        // Validate signature if secret is configured (recommended for production)
        if (wompiEventsSecret && signature?.checksum) {
            const expectedChecksum = generateChecksum(req.body, wompiEventsSecret);
            if (signature.checksum !== expectedChecksum) {
                console.error('Invalid webhook signature');
                return res.status(401).json({ error: 'Invalid signature' });
            }
        }

        // Only process transaction.updated events with APPROVED status
        if (event === 'transaction.updated' && data.transaction?.status === 'APPROVED') {
            console.log('Processing APPROVED transaction:', data.transaction.id);

            // Verify Supabase credentials
            if (!supabaseUrl || !supabaseServiceKey) {
                console.error('Missing Supabase credentials');
                return res.status(500).json({ error: 'Server configuration error' });
            }

            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            // Get customer email from transaction
            const customerEmail = data.transaction.customer_email;
            const transactionId = data.transaction.id;
            const amountInCents = data.transaction.amount_in_cents;

            console.log(`Payment approved for: ${customerEmail}, Amount: ${amountInCents / 100} COP`);

            // Calculate next payment date (1 month from today)
            const today = new Date();
            const nextPaymentDate = new Date(today);
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

            const year = nextPaymentDate.getFullYear();
            const month = String(nextPaymentDate.getMonth() + 1).padStart(2, '0');
            const day = String(nextPaymentDate.getDate()).padStart(2, '0');
            const nextPayment = `${year}-${month}-${day}`;

            // Find client by email and update payment status
            // First, get the user ID from auth.users
            const { data: userData, error: userError } = await supabase.auth.admin.listUsers();

            let userId = null;
            if (!userError && userData?.users) {
                const user = userData.users.find(u => u.email === customerEmail);
                if (user) {
                    userId = user.id;
                }
            }

            // Update client by user_id or by matching email in recent registrations
            let updateResult;

            if (userId) {
                // Update by user_id
                updateResult = await supabase
                    .from('clients')
                    .update({
                        estado_pago: 'activo',
                        status: 'active',
                        next_payment: nextPayment
                    })
                    .eq('user_id', userId);
            }

            // If no user_id match, try to find by email (fallback)
            if (!updateResult?.data || updateResult?.error) {
                // Get all pending clients and find one with matching whatsapp or recent creation
                const { data: clients, error: clientsError } = await supabase
                    .from('clients')
                    .select('*')
                    .eq('estado_pago', 'pendiente')
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (!clientsError && clients?.length > 0) {
                    // Update the most recent pending client
                    const clientToUpdate = clients[0];

                    updateResult = await supabase
                        .from('clients')
                        .update({
                            estado_pago: 'activo',
                            status: 'active',
                            next_payment: nextPayment
                        })
                        .eq('id', clientToUpdate.id);

                    console.log(`Updated client ID: ${clientToUpdate.id}`);
                }
            }

            if (updateResult?.error) {
                console.error('Error updating client:', updateResult.error);
                // Still return 200 to acknowledge receipt
            } else {
                console.log('Client payment status updated successfully');
            }
        } else {
            console.log(`Ignoring event: ${event}, status: ${data.transaction?.status || 'unknown'}`);
        }

        // Always return 200 to acknowledge receipt
        return res.status(200).json({ received: true });

    } catch (err) {
        console.error('Webhook processing error:', err);
        // Return 200 anyway to prevent retries for processing errors
        return res.status(200).json({ received: true, error: err.message });
    }
}

// Generate SHA256 checksum for signature validation
function generateChecksum(payload, secret) {
    const stringToHash = `${payload.data.transaction.id}${payload.data.transaction.status}${payload.timestamp}${secret}`;
    return crypto.createHash('sha256').update(stringToHash).digest('hex');
}
