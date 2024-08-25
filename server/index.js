// server/index.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.post('/api/contact', (req, res) => {
    const { firstname, lastname, email, phone, message } = req.body;

    const query = `
        INSERT INTO customers (firstname, lastname, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        firstname = VALUES(firstname),
        lastname = VALUES(lastname),
        phone = VALUES(phone),
        message = VALUES(message)
    `;

    db.query(query, [firstname, lastname, email, phone, message], (err, result) => {
        if (err) {
            console.error('Error saving contact:', err);
            res.status(500).send('Error saving contact');
            return;
        }
        res.status(200).send('Form submitted successfully');
    });
});

// Get all customers
app.get('/api/customers', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
