const { makePayment, checkPayment } = require("./TelrService.js");

async function main() {
    const customer = {

        email: "test@test.com",
        name: {

            forenames: "Pravin",
            surname: "Singh Rana"
        },
        address: {

            city: "xxx",
            state: "xxx",
            country: "AE",

        },
        phone: "918318658485"
    };
    const payment = await makePayment('200', customer);
    // const payment = await checkPayment('15B181F2DD3004820297DD46DB29DC7B462B7D0B6C8367D9ED4906244D879F2D');
    console.log('Payment:', payment);
}

main();