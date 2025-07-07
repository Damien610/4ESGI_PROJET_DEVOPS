const request = require('supertest');
const http = require('http');
const app = require('../app');
require('dotenv').config();

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(() => {
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('E2E – Formulaire et tickets', () => {
    test('Soumission du ticket valide', async () => {
        const res = await request(server)
            .post('/')
            .send({ type_id: 1, email: 'e2e@example.com', message: 'Test e2e' });

        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/succès/i);
    });

    test('Accès à /tickets avec HTTP Basic', async () => {
        const res = await request(server)
            .get('/tickets')
            .auth(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

        expect(res.statusCode).toBe(200);
        expect(res.text).toMatch(/Liste des tickets/i);
    });
});
