const express = require('express');
const { signData } = require('../TelrService.js');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/webhook/telr', (req, res) => {
    console.log('Webhook received from server');








    const hashCheck = signData(req.body);
    if (hashCheck) {
        // we can send mail to the client here and 
        console.log("Hash check passed");
    }





    res.status(200).json({ status: 'success' });
});

app.get('/', (req, res) => {
    res.send('Server is running');

});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});