'use strict';

//selects port to run the server on
const port = process.env.PORT || 8080;

//various packages used for the server
const express = require('express');
const http = require('http');
const ws = require('ws');
const ip = require("ip");

//create express server
const app = express();

const server = http.createServer(app);

const wss = new ws.Server({
    server: server
});
//set which directory to read from
app.use(express.static(`${__dirname }/webpages`));
//set the website url
server.listen(port, () => {
    console.log('Server started:', `http://${ip.address()}:${port}`)
});

// Database Functions

const pg = require('pg');
const {
    Pool,
    Client
  } = pg;
const client = new Client({
    user: "up885000",
    password: "softwareServer",
    host: "localhost",
    port: 5432,
    database: "recipeapp"
  });
  
  client.connect();
  
  client.query('SELECT * from ingredients', (err, res) => {
    console.log(err, res);
    client.end();
  });
  
  function init(){
    displayRecipe(4);
  }
  
  function displayRecipe(id) {
    const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
    document.getElementById("recipe").textContent = query;
  };