#!/bin/sh

echo "⏳ Attente que la base MariaDB soit disponible à $DB_HOST:$DB_PORT..."

node <<EOF
const mysql = require('mysql2/promise');

(async () => {
  const maxRetries = 20;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306
      });

      await conn.query('SELECT 1');
      console.log(' MariaDB est prête. Lancement du seed...');
      process.exit(0);
    } catch (err) {
      console.log('Tentative de connexion échouée, nouvelle tentative dans 2s...');
      await new Promise(r => setTimeout(r, 2000));
      attempt++;
    }
  }

  console.error(' Impossible de se connecter à MariaDB après plusieurs tentatives.');
  process.exit(1);
})();
EOF

# Seed la base
node seed.js

# Démarre l'app
npm start
