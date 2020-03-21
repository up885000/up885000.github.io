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


app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'up885000',
        password: 'softwareServer',
        server: 'localhost', 
        database: 'recipeapp' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from ingredients', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5432, function () {
    console.log('Server is running..');
});