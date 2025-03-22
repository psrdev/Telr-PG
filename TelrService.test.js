const axios = require('axios');
const { makePayment, checkPayment } = require('./TelrService.js');
const { generateCartId } = require('./utils.js');

jest.mock('axios');
jest.mock('./utils.js', () => ({ generateCartId: jest.fn(() => 'mockedCartId') }));

describe('Telr Payment Service', () => {
    const TELR_API_URL = process.env.TELR_API_URL;
    const TELR_STORE_ID = process.env.TELR_STORE_ID;
    const TELR_AUTH_TOKEN = process.env.TELR_AUTH_TOKEN;
    const TELR_MODE = process.env.TELR_MODE;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('makePayment should send correct payload and return response data', async () => {
        const mockResponse = { transaction: { status: 'success', ref: 'ABC123' } };
        axios.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await makePayment(100, 'AED', 'Test Payment');

        expect(axios.post).toHaveBeenCalledWith(TELR_API_URL, {
            method: 'create',
            store: TELR_STORE_ID,
            authkey: TELR_AUTH_TOKEN,
            framed: 0,
            order: {
                cartid: 'mockedCartId',
                test: TELR_MODE,
                amount: 100,
                currency: 'AED',
                description: 'Test Payment'
            },
            return: {
                authorised: 'https://www.mysite.com/authorised',
                declined: 'https://www.mysite.com/declined',
                cancelled: 'https://www.mysite.com/cancelled'
            }
        }, { headers: expect.any(Object) });

        expect(result).toEqual(mockResponse);
        expect(result.transaction.ref).toBe('ABC123');
    });

    test('makePayment should handle missing parameters and throw an error', async () => {
        await expect(makePayment()).rejects.toThrow();
    });

    test('makePayment should throw an error if request fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('Network error'));
        await expect(makePayment(100)).rejects.toThrow('Network error');
    });

    test('checkPayment should send correct payload and return response data', async () => {
        const mockResponse = { order: { status: 'paid', ref: '123456' } };
        axios.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await checkPayment('123456');

        expect(axios.post).toHaveBeenCalledWith(TELR_API_URL, {
            method: 'check',
            store: TELR_STORE_ID,
            authkey: TELR_AUTH_TOKEN,
            framed: 0,
            order: { ref: '123456' }
        }, { headers: expect.any(Object) });

        expect(result).toEqual(mockResponse);
        expect(result.order.ref).toBe('123456');
    });

    test('checkPayment should handle invalid reference ID', async () => {
        await expect(checkPayment()).rejects.toThrow();
    });

    test('checkPayment should throw an error if request fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('API error'));
        await expect(checkPayment('123456')).rejects.toThrow('API error');
    });
});

