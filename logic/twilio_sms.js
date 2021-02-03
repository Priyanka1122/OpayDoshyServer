const accountSid = 'ACbedaa641ca7c3849a73792c8b4cd272a';
const authToken = 'c194c51ee1cb0d141a03a18bb69cf8c5';
const client = require('twilio')(accountSid, authToken);
const from = '+91 98016 81870'
sendTwilioMsg = (body, to) => {

    client.messages
        .create({ body: body, from: from, to: to })
        .then(message => console.log('success'))
        .catch((error) => { console.log(error) });
}

module.exports = sendTwilioMsg