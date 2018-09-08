const express = require('express');
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log('Webhook server is listening on port ' + PORT));

const verificationController = require('./controllers/verification')
const messageWebhookController = require('./controllers/messageWebhook');

app.get('/', verificationController)
app.post('/', messageWebhookController);
