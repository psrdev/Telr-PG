const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook/telr', (req, res) => {
    console.log('Telr Webhook Received:', req.body);
    // Save data for later use
    const webhookData = req.body;

    // Example: Save the data to a file
    const filePath = './webhookData.json';

    fs.writeFile(filePath, JSON.stringify(webhookData, null, 2), (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
        } else {
            console.log('Data saved to file for later use:', filePath);
        }
    });


    res.status(200).json({ status: 'success' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});