import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// In Vercel serverless functions, use non-VITE_ prefixed variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

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
                    nombre_representante: clientData.nombre_representante,
                    nombre_negocio: clientData.nombre_negocio,
                    monto: transactionData.amount_in_cents / 100,
                    fecha_pago: new Date().toLocaleDateString('es-CO'),
                    proximo_pago: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO')
                }
            })
        });

        return await response.json();
    } catch (error) {
        console.error('Error sending payment confirmation email:', error);
        return { success: false, error };
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
                console.error('❌ Invalid signature');
                return res.status(401).json({ error: 'Invalid signature' });
            }
            console.log('✅ Signature verified');
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

        // Only process APPROVED transactions
        if (transaction.status !== 'APPROVED') {
            console.log('ℹ️ Transaction not approved, status:', transaction.status);
            return res.status(200).json({ message: 'Transaction not approved' });
        }

        console.log('💰 Processing approved transaction');
        console.log('📧 Customer email:', transaction.customer_email);
        console.log('💵 Amount:', transaction.amount_in_cents / 100, 'COP');
        console.log('🆔 Transaction ID:', transaction.id);

        // Find client by email
        const { data: client, error: findError } = await supabase
            .from('clientes')
            .select('*')
            .eq('email', transaction.customer_email)
            .single();

        if (findError || !client) {
            console.error('❌ Client not found:', transaction.customer_email);
            console.error('Find error:', findError);

            // Try to find by most recent pending client (fallback)
            const { data: recentClient, error: recentError } = await supabase
                .from('clientes')
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
            .from('clientes')
            .update({
                estado_pago: 'activo',
                fecha_pago: now.toISOString(),
                proximo_pago: nextPayment.toISOString()
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
