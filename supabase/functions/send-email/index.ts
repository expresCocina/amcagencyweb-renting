
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { Resend } from "npm:resend";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const payload = await req.json();

        // This function expects to be called by a Database Webhook (INSERT on notifications)
        // Payload structure: { type: 'INSERT', table: 'notifications', record: { ... }, schema: 'public' }
        // OR direct call: { email, subject, html }

        const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY');

        const resend = new Resend(RESEND_API_KEY);

        // 1. Handle Direct Call (Manual test or specific trigger)
        if (payload.email && payload.subject) {
            const { email, subject, html } = payload;
            const data = await resend.emails.send({
                from: 'AMC CRM <onboarding@resend.dev>', // User needs to verify domain or use this test one
                to: [email],
                subject: subject,
                html: html || 'No content',
            });
            return new Response(JSON.stringify(data), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            });
        }

        // 2. Handle Database Webhook (INSERT on notifications)
        if (payload.type === 'INSERT' && payload.table === 'notifications') {
            const record = payload.record;

            // Allow opting out of email for certain low priority notifs if needed
            // if (record.type === 'info') return ...

            // Need to get user email
            const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

            // Get email from user_profiles (assuming we store it there) -> We do in public.user_profiles?
            // Actually usually user_profiles has email. Let's check.
            // If not, we leverage auth admin (but requires Service Role).

            // Let's try fetching from user_profiles first for speed
            let { data: profile } = await supabase
                .from('user_profiles')
                .select('email')
                .eq('id', record.user_id)
                .single();

            let email = profile?.email;

            // Optional: If profile email is missing, try auth.users (requires permission)
            // But let's assume profile has it for now as per my previous checks.

            if (!email) {
                console.log('No email found for user', record.user_id);
                return new Response(JSON.stringify({ error: 'User email not found' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200 // Don't fail the webhook
                });
            }

            // Send Email
            const emailResponse = await resend.emails.send({
                from: 'AMC CRM <onboarding@resend.dev>',
                to: [email],
                subject: `🔔 Nueva Notificación: ${record.title}`,
                html: `
                    <h2>${record.title}</h2>
                    <p>${record.message}</p>
                    <hr />
                    <a href="${Deno.env.get('SITE_URL') || 'https://amcagencyweb.com'}${record.link || '/crm'}" style="background:#ec4899;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Ver en CRM</a>
                `,
            });

            return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            });
        }

        return new Response(JSON.stringify({ message: 'No action taken', payload }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
