const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('E2E – Formulaire et tickets', () => {
    test('Soumission du ticket valide', async () => {
        const res = await request(app)
            .post('/')
            .send({ type_id: 1, email: 'e2e@example.com', message: 'Test e2e' });

        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/succès/i);
    });

    test('Accès à /tickets avec HTTP Basic', async () => {
        const res = await request(app)
            .get('/tickets')
            .auth(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Liste des tickets/i);
    });
});
