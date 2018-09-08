const dotEnv = require('dotenv').config();
const API_AI_TOKEN = process.env.API_KEY;
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAO68gHZCrNkBAA2sIOu5SD4zUF4LVXOEiegeuQATVzxCGh9vcvygiSyyCLB6bLSOq5PNZBjsWNkMgl8Sdrk52nxmtUKoA1rdeTZBft7gvrtLpvvXSQKnQXie6oRYwb88vZAWhPvZAMY2YOPhkkqKhzZCmfQahjkaBF9FsKlJeLgZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'tpan'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
