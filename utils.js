import crypto from 'crypto';


// Generate a random 20 digit number
function generateCartId() {
    return BigInt('0x' + crypto.randomBytes(10).toString('hex')).toString().padStart(20, '0');
}
export { generateCartId };