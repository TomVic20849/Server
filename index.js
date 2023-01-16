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
require('dotenv').config()


app.get('/rooms/:id', (req, res) => {
    const id = req.params.id;
    client.query(`SELECT app_pic_number FROM rooms;
                    SELECT ingame_powerup_number FROM ingame;`, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.send(result.rows[0]);
        }
    });
});

app.get('/', (req, res) => {
    res.send("Welcome to the server, you probably should not be seeing this message")
});