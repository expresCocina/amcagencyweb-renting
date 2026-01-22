import { FacebookAdsApi, ServerEvent, EventRequest, UserData, CustomData } from 'facebook-nodejs-business-sdk';

// Acceder a las variables de entorno, intentando ambas convenciones (con y sin VITE_)
// NOTA: Para Serverless functions, idealmente no deberían llevar VITE_, pero para compatibilidad
// con lo que ya está configurado en el dashboard, leemos ambas.
const access_token = process.env.FACEBOOK_ACCESS_TOKEN || process.env.VITE_FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID || process.env.VITE_FACEBOOK_PIXEL_ID;

console.log('🔍 Facebook CAPI Configuration Check:');
console.log('  - Access Token:', access_token ? `✅ Present (${access_token.substring(0, 10)}...)` : '❌ Missing');
console.log('  - Pixel ID:', pixel_id ? `✅ Present (${pixel_id})` : '❌ Missing');

if (access_token && pixel_id) {
    try {
        FacebookAdsApi.init(access_token);
        console.log('✅ Facebook Ads API Initialized Successfully');
    } catch (e) {
        console.error('❌ Error initializing Facebook Ads API:', e.message);
    }
} else {
    console.warn('⚠️ Facebook CAPI will not work - Missing credentials');
    if (!access_token) console.warn('  - Missing: FACEBOOK_ACCESS_TOKEN');
    if (!pixel_id) console.warn('  - Missing: FACEBOOK_PIXEL_ID');
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { eventName, eventId, eventSourceUrl, userData: clientUserData, customData: clientCustomData } = req.body;

    if (!eventName || !eventId) {
        return res.status(400).json({ error: 'Missing eventName or eventId' });
    }

    if (!access_token || !pixel_id) {
        const missingVars = [];
        if (!access_token) missingVars.push('FACEBOOK_ACCESS_TOKEN');
        if (!pixel_id) missingVars.push('FACEBOOK_PIXEL_ID');

        console.error('❌ Missing Facebook Credentials:', missingVars.join(', '));
        return res.status(500).json({
            error: 'Server Configuration Error: Missing Facebook Credentials',
            missing: missingVars,
            hint: 'Check Vercel Environment Variables settings'
        });
    }

    try {
        const current_timestamp = Math.floor(new Date() / 1000);

        const userData = (new UserData())
            .setClientIpAddress(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
            .setClientUserAgent(req.headers['user-agent']);

        if (clientUserData) {
            if (clientUserData.email) userData.setEmail(clientUserData.email);
            if (clientUserData.phone) userData.setPhone(clientUserData.phone);
            if (clientUserData.fbp) userData.setFbp(clientUserData.fbp);
            if (clientUserData.fbc) userData.setFbc(clientUserData.fbc);
        }

        const customData = (new CustomData());
        if (clientCustomData) {
            if (clientCustomData.currency) customData.setCurrency(clientCustomData.currency);
            if (clientCustomData.value) customData.setValue(clientCustomData.value);
            if (clientCustomData.content_name) customData.setContentName(clientCustomData.content_name);
        }

        const serverEvent = (new ServerEvent())
            .setEventName(eventName)
            .setEventTime(current_timestamp)
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl(eventSourceUrl)
            .setActionSource('website')
            .setEventId(eventId);

        const eventsData = [serverEvent];
        const eventRequest = (new EventRequest(access_token, pixel_id))
            .setEvents(eventsData);

        let response;
        try {
            response = await eventRequest.execute();
            console.log('✅ CAPI Event Sent Successfully:', eventName);
            console.log('   Response:', JSON.stringify(response, null, 2));
        } catch (executeError) {
            console.error('❌ CAPI Execute Error:', {
                eventName,
                error: executeError.message,
                stack: executeError.stack,
                details: executeError
            });

            // Return success anyway to not break the user flow
            // The browser pixel will still track the event
            return res.status(200).json({
                success: true,
                warning: 'CAPI failed but browser pixel should track',
                error: executeError.message
            });
        }

        return res.status(200).json({ success: true, response });

    } catch (err) {
        console.error('❌ CAPI Handler Error:', {
            message: err.message,
            stack: err.stack,
            name: err.name
        });
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}
