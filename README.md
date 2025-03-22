# Telr Payment Gateway Integration

A Node.js wrapper for Telr Payment Gateway integration that provides simple methods to create payments and check payment status.

## Installation

```sh
npm install axios dotenv
```

## Configuration

Create a `.env` file in your project root with the following variables:

```env
TELR_STORE_ID="your_store_id"
TELR_AUTH_TOKEN="your_auth_token"
TELR_API_URL="https://secure.telr.com/gateway/order.json"
TELR_MODE=1  # 0 for live mode, 1 for test mode
```

## Usage

### Making a Payment

```js
import { makePayment } from "./TelrService.js";

const amount = 100;
const currency = "AED";
const description = "Product Payment";

try {
  const response = await makePayment(amount, currency, description);
  console.log("Payment URL:", response.order.url);
} catch (error) {
  console.error("Payment failed:", error);
}
```

### Checking Payment Status

```js
import { checkPayment } from "./TelrService.js";

try {
  const status = await checkPayment("your_reference_id");
  console.log("Payment Status:", status);
} catch (error) {
  console.error("Status check failed:", error);
}
```

## Features

- Create payment transactions
- Check payment status
- Automatic cart ID generation
- Environment-based configuration
- Error handling

## API Reference

### makePayment(amount, currency, description)

- `amount`: Payment amount (required)
- `currency`: Currency code (default: 'AED')
- `description`: Payment description (default: 'OMD Payment')

### checkPayment(refId)

- `refId`: Reference ID of the transaction to check

## Security

This implementation includes:

- Secure random cart ID generation
- Environment variable based configuration
- Error handling and logging
