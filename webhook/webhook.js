const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook/telr', (req, res) => {
    console.log('Telr Webhook Received:', req.body);
    const webhookData = req.body;
    const filePath = './webhook/webhookData.json';

    // Read existing data first
    fs.readFile(filePath, (readErr, data) => {
        let existingData = [];

        if (!readErr && data.length > 0) {
            try {
                existingData = JSON.parse(data);
                if (!Array.isArray(existingData)) {
                    existingData = [existingData];
                }
            } catch (parseErr) {
                console.error('Error parsing existing data:', parseErr);
                existingData = [];
            }
        }

        // Add new data with timestamp
        webhookData.timestamp = new Date().toISOString();
        existingData.push(webhookData);

        // Write back the combined data
        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving data to file:', writeErr);
            } else {
                console.log('Data appended to file:', filePath);
            }
        });
    });

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