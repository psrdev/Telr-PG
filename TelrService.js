import axios from 'axios';
import dotenv from 'dotenv';
import { generateCartId } from './utils.js';

dotenv.config();

// Ensure required environment variables are set
const { TELR_AUTH_TOKEN, TELR_STORE_ID, TELR_API_URL, TELR_MODE } = process.env;
if (!TELR_AUTH_TOKEN || !TELR_STORE_ID || !TELR_API_URL || !TELR_MODE) {
    throw new Error("Missing required environment variables: TELR_AUTH_TOKEN, TELR_STORE_ID, TELR_API_URL, TELR_MODE");
}


const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

// make payment
async function makePayment(amount, currency = 'AED', description = 'OMD Payment') {
    try {
        const payload = {
            method: 'create',
            store: TELR_STORE_ID,
            authkey: TELR_AUTH_TOKEN,
            framed: 0,
            order: {
                cartid: generateCartId(),
                test: TELR_MODE,
                amount,
                currency,
                description
            },
            return: {
                authorised: 'https://www.mysite.com/authorised',
                declined: 'https://www.mysite.com/declined',
                cancelled: 'https://www.mysite.com/cancelled'
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


export { makePayment, checkPayment };
