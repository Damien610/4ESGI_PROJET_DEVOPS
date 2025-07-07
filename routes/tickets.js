const express = require('express');
const router = express.Router();
const db = require('../db');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const base64 = authHeader.split(' ')[1] || '';
    const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');

    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
        return next();
    }

    res.setHeader('WWW-Authenticate', 'Basic');
    res.status(401).send('Authentification requise.');
};

router.get('/', auth, async (req, res) => {
    const [tickets] = await db.query(`
        SELECT t.id, t.email, t.message, t.created_at, ty.name AS type
        FROM tickets t JOIN types ty ON t.type_id = ty.id
        ORDER BY t.created_at DESC
    `);

    const list = tickets.map(t => `
    <li>
      [${t.type}] <strong>${t.email}</strong><br>
      <em>${new Date(t.created_at).toLocaleString()}</em><br>
      <p>${t.message}</p>
    </li>
  `).join('');

    const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><title>Liste des tickets</title></head>
  <body>
    <h1>Liste des tickets</h1>
    <ul>${list}</ul>
  </body>
  </html>
  `;

    res.send(html);
});


module.exports = router;
