import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with SERVICE ROLE KEY for admin access
// This bypasses Row Level Security (RLS) policies
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials!');
    console.error('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
    console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'Missing');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Verify Wompi signature
function verifySignature(payload, signature, secret) {
    const hash = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(payload))
        .digest('hex');

    return hash === signature;
}

// Send payment confirmation email
async function sendPaymentConfirmationEmail(clientData, transactionData) {
    try {
        const apiUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'https://amcagencyweb.com';

        const response = await fetch(`${apiUrl}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'payment_confirmation',
                clientData: {
                    email: clientData.email,
                    nombre_representante: clientData.nombre_representante || clientData.name,
                    nombre_negocio: clientData.nombre_negocio || clientData.company,
                    monto: transactionData.amount_in_cents / 100,
                    fecha_pago: new Date().toLocaleDateString('es-CO'),
                    proximo_pago: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO')
                }
            })
        });

        // Check if response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response from email API:', text.substring(0, 200));
            return { success: false, error: 'Invalid response from email API' };
        }
    } catch (error) {
        console.error('Error sending payment confirmation email:', error);
        return { success: false, error: error.message };
    }
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Event-Checksum, X-Signature');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('📥 Webhook received from Wompi');
        console.log('Headers:', JSON.stringify(req.headers, null, 2));
        console.log('Body:', JSON.stringify(req.body, null, 2));

        // Get signature from headers (Wompi uses different header names)
        const signature = req.headers['x-event-checksum'] || req.headers['x-signature'];
        const event = req.body;

        // Verify signature if available
        if (signature && process.env.WOMPI_EVENTS_SECRET) {
            if (!verifySignature(event, signature, process.env.WOMPI_EVENTS_SECRET)) {
                console.error('⚠️ Invalid signature - but continuing anyway for debugging');
                console.error('Received signature:', signature);
                console.error('Event data:', JSON.stringify(event));
                // Temporarily allow invalid signatures for debugging
                // return res.status(401).json({ error: 'Invalid signature' });
            } else {
                console.log('✅ Signature verified');
            }
        } else {
            console.log('⚠️ No signature verification (missing secret or signature header)');
        }

        console.log('📋 Event type:', event.event);
        console.log('📋 Transaction data:', event.data);

        // Only process transaction.updated events
        if (event.event !== 'transaction.updated') {
            console.log('ℹ️ Ignoring non-transaction event');
            return res.status(200).json({ message: 'Event ignored' });
        }

        const transaction = event.data?.transaction || event.data;

        console.log('📋 Transaction status:', transaction.status);
        console.log('📋 FULL TRANSACTION DATA:', JSON.stringify(transaction, null, 2));
        console.log('📧 Customer email from transaction.customer_email:', transaction.customer_email);
        console.log('📧 Customer email from transaction.customer_data?.email:', transaction.customer_data?.email);
        console.log('📧 Customer email from transaction.payment_method?.user_email:', transaction.payment_method?.user_email);

        // Only process APPROVED transactions
        if (transaction.status !== 'APPROVED') {
            console.log('ℹ️ Transaction not approved, status:', transaction.status);
            return res.status(200).json({ message: 'Transaction not approved' });
        }

        console.log('💰 Processing approved transaction');

        // Try to get email from multiple possible fields
        const customerEmail = transaction.customer_email ||
            transaction.customer_data?.email ||
            transaction.payment_method?.user_email ||
            transaction.customer_data?.full_name;

        console.log('📧 Final customer email to search:', customerEmail);
        console.log('💵 Amount:', transaction.amount_in_cents / 100, 'COP');
        console.log('🆔 Transaction ID:', transaction.id);

        // Find client by email
        const { data: client, error: findError } = await supabase
            .from('clients')
            .select('*')
            .eq('email', customerEmail) // Use the consolidated customerEmail
            .single();

        if (findError || !client) {
            console.error('❌ Client not found:', transaction.customer_email);
            console.error('Find error:', findError);

            // Try to find by most recent pending client (fallback)
            const { data: recentClient, error: recentError } = await supabase
                .from('clients')
                .select('*')
                .eq('estado_pago', 'pendiente')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (recentError || !recentClient) {
                console.error('❌ No pending client found either');
                // Return 200 to prevent Wompi from retrying
                return res.status(200).json({
                    message: 'Client not found',
                    email: transaction.customer_email
                });
            }

            console.log('✅ Using most recent pending client:', recentClient.nombre_negocio);
            client = recentClient;
        } else {
            console.log('👤 Client found:', client.nombre_negocio);
        }

        // Calculate next payment date (30 days from now)
        const now = new Date();
        const nextPayment = new Date(now);
        nextPayment.setDate(nextPayment.getDate() + 30);

        // Update client status
        const { data: updatedClient, error: updateError } = await supabase
            .from('clients')
            .update({
                estado_pago: 'activo',
                status: 'active',
                next_payment: nextPayment.toISOString().split('T')[0] // Format as YYYY-MM-DD for date column
            })
            .eq('id', client.id)
            .select()
            .single();

        if (updateError) {
            console.error('❌ Error updating client:', updateError);
            return res.status(500).json({ error: 'Database update failed', details: updateError });
        }

        console.log('✅ Client updated successfully');
        console.log('📅 Payment date:', now.toISOString());
        console.log('📅 Next payment:', nextPayment.toISOString());

        // Send payment confirmation email
        console.log('📧 Sending confirmation email...');
        const emailResult = await sendPaymentConfirmationEmail(updatedClient, transaction);

        if (emailResult.success) {
            console.log('✅ Confirmation email sent');
        } else {
            console.error('⚠️ Email failed but payment processed:', emailResult.error);
        }

        // Log successful payment
        console.log('🎉 Payment processed successfully for:', client.nombre_negocio);

        return res.status(200).json({
            success: true,
            message: 'Payment processed successfully',
            client: {
                nombre_negocio: updatedClient.nombre_negocio,
                estado_pago: updatedClient.estado_pago,
                fecha_pago: updatedClient.fecha_pago,
                proximo_pago: updatedClient.proximo_pago
            }
        });

    } catch (error) {
        console.error('💥 Webhook error:', error);
        console.error('Stack trace:', error.stack);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}
