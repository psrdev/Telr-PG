const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { signData } = require('../TelrService.js');

const app = express();
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// Webhook endpoint
app.post('/webhook/telr', (req, res) => {
    // const parsedUrl = url.parse(req.url, true);
    const fullUrl = `http://${req.headers.host}${req.url}`; // Construct the full URL
    const parsedUrl = new URL(fullUrl); // Parse the URL
    // console.log(fullUrl);
    const queryParams = parsedUrl.searchParams;
    // const fields = [

    //     queryParams.get('tran_store'),
    //     queryParams.get('tran_type'),
    //     queryParams.get('tran_class'),
    //     queryParams.get('tran_test'),
    //     queryParams.get('tran_ref'),
    //     queryParams.get('tran_prevref'),
    //     queryParams.get('tran_firstref'),
    //     queryParams.get('tran_currency'),
    //     queryParams.get('tran_amount'),
    //     queryParams.get('tran_cartid'),
    //     queryParams.get('tran_desc'),
    //     queryParams.get('tran_status'),
    //     queryParams.get('tran_authcode'),
    //     queryParams.get('tran_authmessage')
    // ];
    const hashCheck = signData(fullUrl);


    console.log('Webhook received');
    // parsedUrl.searchParams.get('tran_type')
    // console.log(queryParams);
    // console.log(parsedUrl);
    //    Verify the webhook signature
    // const hashCheck = signData(req.body);
    // console.log(req);
    // console.log(req.body)
    // if (req.body.tran_check !== hashCheck) {
    //     console.error("Check mismatch - possible tampering");
    //     return res.status(400).send("Check mismatch");
    // }
    // console.log("Webhook data verified");

    // const webhookData = req.body;
    // const filePath = './webhook/webhookData.json';

    // Read existing data first
    // fs.readFile(filePath, (readErr, data) => {
    //     let existingData = [];

    //     if (!readErr && data.length > 0) {
    //         try {
    //             existingData = JSON.parse(data);
    //             if (!Array.isArray(existingData)) {
    //                 existingData = [existingData];
    //             }
    //         } catch (parseErr) {
    //             console.error('Error parsing existing data:', parseErr);
    //             existingData = [];
    //         }
    //     }

    //     // Add new data with timestamp
    //     webhookData.timestamp = new Date().toISOString();
    //     existingData.push(webhookData);

    //     // Write back the combined data
    //     fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
    //         if (writeErr) {
    //             console.error('Error saving data to file:', writeErr);
    //         } else {
    //             console.log('Data appended to file:', filePath);
    //         }
    //     });
    // });

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