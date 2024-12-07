const request = require('supertest');  // Import supertest for HTTP assertions
const express = require('express');    // Import express

// Import the app setup (assuming this Express app code is in app.js or similar)
// Or alternatively define `app` inline, as shown below if you cannot import directly.
const app = express();

// Define routes inline for the test environment
app.get('/', (req, res) => {
    res.send('<h1>Welcome to My Website!</h1><p>This is a simple Node.js website using Express.</p>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1><p>This is the about page of my website.</p>');
});

describe('Express App Routes', () => {
    it('should return the homepage content on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);  // Verify HTTP status
        expect(response.text).toContain('<h1>Welcome to My Website!</h1>'); // Check part of the response
        expect(response.text).toContain('<p>This is a simple Node.js website using Express.</p>');
    });

    it('should return the about page content on GET /about', async () => {
        const response = await request(app).get('/about');
        expect(response.status).toBe(200);
        expect(response.text).toContain('<h1>About Us</h1>');
        expect(response.text).toContain('<p>This is the about page of my website.</p>');
    });

    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/unknown');
        expect(response.status).toBe(404);  // Check if the response is 404 Not Found
    });
});