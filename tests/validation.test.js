const request = require('supertest');
const app = require('../app');
const pool = require('../db');

describe('Validation des tickets', () => {
    test('Refuse un ticket sans email', async () => {
        const res = await request(app).post('/').send({
            type_id: 1,
            message: 'Problème sans email'
        });

        expect(res.statusCode).toBe(400);
    });

    test('Refuse un ticket sans message', async () => {
        const res = await request(app).post('/').send({
            type_id: 1,
            email: 'test@example.com'
        });

        expect(res.statusCode).toBe(400);
    });
});

afterAll(async () => {
    await pool.end();
});
