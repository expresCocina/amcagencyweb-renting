import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Service Role for secure server-side access)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Fallback for development if env vars are missing
if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials for check-site-status API');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
    // CORS Headers - Allow any domain to call this (since clients will be on their own domains)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Get domain from query parameter
    const { domain } = req.query;

    if (!domain) {
        return res.status(400).json({ error: 'Domain parameter is required' });
    }

    try {
        // Clean domain (remove www., protocols, etc if needed, though exact match is better)
        // We'll search for exact match or contain match
        const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];

        // Query Supabase for client status
        // searching in 'domain' column. Case insensitive
        const { data: client, error } = await supabase
            .from('clients')
            .select('status, estado_pago, name, phone, email, next_payment, plan')
            .ilike('domain', `%${cleanDomain}%`)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No client found
                return res.status(404).json({ error: 'Client not found', status: 'unknown' });
            }
            throw error;
        }

        // Determine strict status
        // Lock if status is 'suspended' OR estado_pago is 'suspendido'
        const isLocked = client.status === 'suspended' || client.estado_pago === 'suspendido';

        return res.status(200).json({
            status: isLocked ? 'suspended' : 'active',
            isLocked: isLocked,
            clientData: {
                name: client.name,
                plan: client.plan,
                phone: client.phone // Return phone for WhatsApp link
            },
            redirectUrl: 'https://amcagencyweb.com/pagos', // General payment page
            whatsappNumber: '3157508492' // Your support number
        });

    } catch (error) {
        console.error('Error checking site status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
