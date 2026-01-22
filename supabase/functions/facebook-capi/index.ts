// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This leads to better autocompletion and type checking.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SHA-256 hashing for user data (required by Facebook)
async function sha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { eventName, eventId, eventSourceUrl, userData, customData } = await req.json();

        // Get secrets
        const ACCESS_TOKEN = Deno.env.get('FACEBOOK_ACCESS_TOKEN');
        const PIXEL_ID = Deno.env.get('FACEBOOK_PIXEL_ID');

        if (!ACCESS_TOKEN || !PIXEL_ID) {
            throw new Error('Missing Facebook configuration');
        }

        const current_timestamp = Math.floor(Date.now() / 1000);

        // Prepare User Data (hashing PII)
        const fbUserData: any = {
            client_ip_address: req.headers.get('x-forwarded-for') || '0.0.0.0',
            client_user_agent: req.headers.get('user-agent'),
        };

        if (userData?.email) fbUserData.em = await sha256(userData.email);
        if (userData?.phone) fbUserData.ph = await sha256(userData.phone);
        if (userData?.fbp) fbUserData.fbp = userData.fbp;
        if (userData?.fbc) fbUserData.fbc = userData.fbc;

        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: current_timestamp,
                    action_source: 'website',
                    event_source_url: eventSourceUrl,
                    user_data: fbUserData,
                    custom_data: customData,
                    event_id: eventId,
                },
            ],
            access_token: ACCESS_TOKEN, // Pass token in query param usually, but body also works for batch
        };

        // Send to Facebook Graph API
        // We send access_token as a query param to keep body clean
        const fbUrl = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

        const fbResponse = await fetch(fbUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const fbResult = await fbResponse.json();

        if (!fbResponse.ok) {
            console.error('Facebook API Error:', fbResult);
            return new Response(JSON.stringify({ error: fbResult }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, fbResult }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
