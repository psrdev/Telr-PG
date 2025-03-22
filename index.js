const { makePayment, checkPayment } = require("./TelrService.js");

async function main() {
    const payment = await checkPayment('C2BB32F3734D0EBD881C0BEAC52FBE363D16CC6905A7C79DF6DA2A1F15A7FA4F');
    console.log('Payment:', payment);
}

main();