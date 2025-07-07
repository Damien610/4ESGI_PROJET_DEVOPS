CREATE TABLE types (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(50) NOT NULL
);

INSERT INTO types (name) VALUES ('bug'), ('question'), ('suggestion');

CREATE TABLE tickets (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         type_id INT,
                         email VARCHAR(255),
                         message TEXT,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (type_id) REFERENCES types(id)
);
