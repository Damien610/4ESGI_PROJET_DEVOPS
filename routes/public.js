const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const [types] = await db.query('SELECT * FROM types');

    const options = types.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

    const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head><meta charset="UTF-8"><title>Soumettre un ticket</title></head>
  <body>
    <h1>Soumettre un ticket</h1>
    <form method="POST" action="/">
      <label>Type :</label>
      <select name="type_id">${options}</select><br><br>

      <label>Email :</label>
      <input type="email" name="email" required><br><br>

      <label>Message :</label><br>
      <textarea name="message" rows="5" cols="40" required></textarea><br><br>

      <button type="submit">Envoyer</button>
    </form>
  </body>
  </html>
  `;

    res.send(html);
});


router.post('/', async (req, res) => {
    const { type_id, email, message } = req.body;

    if (!email || !message || !type_id) {
        return res.status(400).send('Champs manquants.');
    }

    await db.query('INSERT INTO tickets (type_id, email, message) VALUES (?, ?, ?)', [type_id, email, message]);
    res.send('Ticket soumis avec succès.');
});


module.exports = router;
