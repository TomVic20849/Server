const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
const { Client } = require('pg')

// create a new client 
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

// Connect to the database
client.connect();

//
require('dotenv').config()


app.get('/rooms/:id', (req, res) => {
    const id = req.params.id;
    client.query(`SELECT password, is_app_connected FROM rooms WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.send(result.rows[0]);
        }
    });
});

app.get('/', (req, res) => {
    const id = req.params.id;
    client.query(`SELECT * FROM rooms`, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.send(result.rows[0]);
        }
    });
});