const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
    client.query(`SELECT password, app_pic_number, is_app_connected, powerup_id FROM rooms WHERE rooms_id = ${id};`, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            client.query(`UPDATE rooms SET powerup_id = 0 WHERE rooms_id = ${id};`, (err, res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(res.rows);
                }
            });
            res.send(result.rows[0]);
        }
    });
    
});

app.get('/', (req, res) => {
    res.send("Welcome to the server, you probably should not be seeing this message")
});

app.get('/rooms/:id/app_pic_number', (req, res) => {
    const id = req.params.id;
    client.query(`SELECT app_pic_number FROM rooms WHERE rooms_id = ${id};`, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.send(result.rows[0]);
        }
    });
});

app.put('/rooms/:id/app_pic_number', (req, res) => {
    const id = req.params.id;
    const newAppPicNumber = req.body.app_pic_number;
    client.query(`UPDATE rooms SET app_pic_number = ${newAppPicNumber} WHERE rooms_id = ${id};`, (err, result) => {
        if (err) {
            res.status(500).send('Error updating data in database');
        } else {
            res.send({ message: 'app_pic_number updated' });
        }
    });
});


/*
app.get('/rooms/:id/app_pic/:id', (req, res) => {
    res.send(`UPDATE rooms SET app_pic_number = 1 WHERE rooms_id = ${id};`, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });
    res.send(result.rows[0]);
});

app.get('/rooms/:id/app_pic2', (req, res) => {
    res.send(`UPDATE rooms SET app_pic_number = 2 WHERE rooms_id = ${id};`, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });
    res.send(result.rows[0]);
});

app.get('/rooms/:id/app_pic3', (req, res) => {
    res.send(`UPDATE rooms SET app_pic_number = 3 WHERE rooms_id = ${id};`, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });
    res.send(result.rows[0]);
});

app.get('/rooms/:id/app_pic4', (req, res) => {
    res.send(`UPDATE rooms SET app_pic_number = 4 WHERE rooms_id = ${id};`, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });
    res.send(result.rows[0]);
});
*/