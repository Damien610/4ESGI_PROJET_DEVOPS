const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Authentification requise', () => {
    test('Refuse sans credentials', async () => {
        const res = await request(app).get('/tickets');
        expect(res.statusCode).toBe(401);
    });

    test('Accepte avec credentials corrects', async () => {
        const res = await request(app)
            .get('/tickets')
            .auth(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

        expect(res.statusCode).toBe(200);
    });
});
