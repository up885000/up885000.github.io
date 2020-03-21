'use strict';

//selects port to run the server on
const port = process.env.PORT || 8080;

//various packages used for the server
const express = require('express');
const http = require('http');
const ws = require('ws');
const ip = require("ip");
const req = require("requirejs");
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

//Database connections
// const {
//     Pool,
//     Client
// } = require('pg');

// const client = new Client({
//     user: "up885000",
//     password: "softwareServer",
//     host: "localhost",
//     port: 5432,
//     database: "recipeapp"
// });

// client.connect();