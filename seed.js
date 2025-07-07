const db = require('./db');

async function seed() {
    console.log('Seeding database...');

    await db.query(`DROP TABLE IF EXISTS tickets`);
    await db.query(`DROP TABLE IF EXISTS types`);

    await db.query(`
    CREATE TABLE types (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    )
  `);

    await db.query(`
    CREATE TABLE tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type_id INT,
      email VARCHAR(255),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (type_id) REFERENCES types(id)
    )
  `);

    await db.query(`INSERT INTO types (name) VALUES ('bug'), ('question'), ('suggestion')`);

    await db.query(`
    INSERT INTO tickets (type_id, email, message)
    VALUES
    (1, 'alice@example.com', 'Bug sur la page d’accueil.'),
    (2, 'bob@example.com', 'Comment fonctionne l’inscription ?'),
    (3, 'carol@example.com', 'Suggestion d’amélioration.')
  `);

    console.log('✅ Base de données initialisée avec succès.');
    process.exit();
}

seed().catch(err => {
    console.error('Erreur lors du seed :', err);
    process.exit(1);
});
