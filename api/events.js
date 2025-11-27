import { FacebookAdsApi, ServerEvent, EventRequest, UserData, CustomData } from 'facebook-nodejs-business-sdk';

const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;

if (access_token) {
    FacebookAdsApi.init(access_token);
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
        console.warn('Missing Facebook Credentials');
        // In production, we might want to return 200 to not break the frontend, but log the error
        return res.status(200).json({ warning: 'Server not configured for CAPI', success: false });
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

        const response = await eventRequest.execute();
        console.log('CAPI Response: ', response);

        return res.status(200).json({ success: true, response });

    } catch (err) {
        console.error('CAPI Error: ', err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}
