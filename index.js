const { makePayment, checkPayment } = require("./TelrService.js");

async function main() {
    // const payment = await makePayment('6000');
    const payment = await checkPayment('15B181F2DD3004820297DD46DB29DC7B462B7D0B6C8367D9ED4906244D879F2D');
    console.log('Payment:', payment);
}

main();