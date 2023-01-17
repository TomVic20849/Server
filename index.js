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

app.put('/rooms/1/:pfp_num', (req, res) =>{
    let pfp_num = req.params.pfp_num;
    res.send(pfp_num);
    pool.query(`SELECT password, app_pic_number, is_app_connected, powerup_id FROM rooms WHERE rooms_id = ${id};`, (err, res) =>{
        if(err){
            res.status(500).send('Error, cannot send information into the database');
        }else{
            pool.query(`UPDATE rooms SET app_pic_number = $pfp_num WHERE rooms_id = ${id};`, (err, res) =>{
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(res.rows);
                }
            });
            res.send(res.rows[0]);
        }
    });
});

app.get('/rooms/:id/app_pic1', (req, res) => {
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


