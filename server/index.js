const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bizSdk = require('facebook-nodejs-business-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Facebook CAPI Setup
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;

const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const pixel_id = process.env.FACEBOOK_PIXEL_ID;

// Initialize only if credentials are present to avoid crash on start without env
if (access_token) {
    bizSdk.FacebookAdsApi.init(access_token);
}

app.post('/api/events', (req, res) => {
    const { eventName, eventId, eventSourceUrl, userData: clientUserData, customData: clientCustomData } = req.body;

    if (!eventName || !eventId) {
        return res.status(400).json({ error: 'Missing eventName or eventId' });
    }

    if (!access_token || !pixel_id) {
        console.warn('Missing Facebook Credentials');
        return res.status(503).json({ error: 'Server not configured for CAPI' });
    }

    const current_timestamp = Math.floor(new Date() / 1000);

    const userData = (new UserData())
        .setClientIpAddress(req.connection.remoteAddress)
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

    eventRequest.execute().then(
        response => {
            console.log('CAPI Response: ', response);
            res.json({ success: true, response });
        },
        err => {
            console.error('CAPI Error: ', err);
            res.status(500).json({ error: err });
        }
    );
});

app.get('/', (req, res) => {
    res.send('AMC Agency CAPI Server Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
