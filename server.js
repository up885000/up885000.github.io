'use strict';

const port = process.env.PORT || 1234;

const express = require('express');
const http = require('http');
const ws = require('ws');
const ip = require("ip");

const app = express();

const server = http.createServer(app);

const wss = new ws.Server({ server: server });

app.use( express.static(`${__dirname }/webpages`));

server.listen(port, () => {console.log('Server started:', `http://${ip.address()}:${port}`)});
