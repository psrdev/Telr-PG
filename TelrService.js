const axios = require('axios');
const dotenv = require('dotenv');
const { generateCartId } = require('./utils');

dotenv.config();

// Ensure required environment variables are set
const { TELR_AUTH_TOKEN, TELR_STORE_ID, TELR_API_URL, TELR_MODE, CLIENT_DOMAIN } = process.env;
if (!TELR_AUTH_TOKEN || !TELR_STORE_ID || !TELR_API_URL || !TELR_MODE) {
    throw new Error("Missing required environment variables: TELR_AUTH_TOKEN, TELR_STORE_ID, TELR_API_URL, TELR_MODE");
}

const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};
const cartId = generateCartId();


// make payment
async function makePayment(amount, currency = 'AED', description = 'OMD Payment') {
    try {
        const payload = {
            method: 'create',
            store: TELR_STORE_ID,
            authkey: TELR_AUTH_TOKEN,
            framed: 0,
            order: {
                cartid: cartId,
                test: TELR_MODE,
                amount,
                currency,
                description
            },
            return: {
                authorised: `${CLIENT_DOMAIN}/payment-staus?status=authorised&ref=${cartId}`,
                declined: `${CLIENT_DOMAIN}/payment-staus?status=declined&ref=${cartId}`,
                cancelled: `${CLIENT_DOMAIN}/payment-staus?status=cancelled&ref=${cartId}`,

            }
        };

        const { data } = await axios.post(TELR_API_URL, payload, { headers: HEADERS });
        return data;
    } catch (error) {
        console.error('Payment Error:', error.response?.data || error.message);
        throw error; // Re-throw for higher-level handling
    }
}

// check payment status
async function checkPayment(refId) {
    const payload = {
        method: 'check',
        store: TELR_STORE_ID,
        authkey: TELR_AUTH_TOKEN,
        framed: 0,
        order: { ref: refId }
    }
    try {
        const { data } = await axios.post(TELR_API_URL, payload, { headers: HEADERS });
        return data;
    } catch (error) {
        console.error('Check Payment Error:', error.response?.data || error.message);
        throw error; // Re-throw for higher-level handling
    }
}

module.exports = { makePayment, checkPayment };
