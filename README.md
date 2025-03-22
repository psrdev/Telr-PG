# Telr Payment Gateway Integration

A Node.js wrapper for Telr Payment Gateway integration that provides simple methods to create payments and check payment status.

## Installation

```sh
npm install axios dotenv jest
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
const { makePayment } = require("./TelrService.js");

const amount = 100;
const currency = "AED";
const description = "Product Payment";

try {
  const response = await makePayment(amount, currency, description);
  console.log("Payment Response:", response);
} catch (error) {
  console.error("Payment failed:", error);
}
```

### Checking Payment Status

```js
const { checkPayment } = require("./TelrService.js");

try {
  const response = await checkPayment("your_reference_id");
  console.log("Payment Status:", response);
} catch (error) {
  console.error("Status check failed:", error);
}
```

## Testing

Run the test suite using:

```sh
npm test
```

## Features

- Create payment transactions
- Check payment status
- Automatic cart ID generation
- Environment-based configuration
- Error handling
- Comprehensive test coverage

## API Reference

### makePayment(amount, currency, description)

- `amount`: Payment amount (required)
- `currency`: Currency code (default: 'AED')
- `description`: Payment description (default: 'OMD Payment')

Returns a promise that resolves to the Telr API response.

### checkPayment(refId)

- `refId`: Reference ID of the transaction to check

Returns a promise that resolves to the payment status response.

## Security

This implementation includes:

- Secure random cart ID generation using crypto
- Environment variable based configuration
- Error handling and logging
- Request/Response validation
