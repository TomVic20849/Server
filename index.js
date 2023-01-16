const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

  app.get('/', (req, res) => {
    res.send('Potatos!');
  });
  
  //

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
