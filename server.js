'use strict';

//selects port to run the server on
const port = process.env.PORT || 8080;

//various packages used for the server
const express = require('express');
const http = require('http');
const ws = require('ws');
const ip = require("ip");
const mysql = require("mysql2/promise");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));


let mysqlConn = null;


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

const config = {
    "host": "localhost",
    "user": "webapp",
    "password": "1234",
    "database": "recipeapp"
}

async function mysqlConnection() //Handles MySQL Database connections
{
    if (mysqlConn) //If a connection already exists
    {
        return mysqlConn; //Return the existing connection
    } else { //Else if no connection exists
        mysqlConn = newMysqlConnection(); //Make a new connection
        return mysqlConn; //Return the new connection
    }
}

async function newMysqlConnection() { //Creates a MySQL Database connection
    const newMysqlConn = await mysql.createConnection(config); //Create MySQL connection using the settings from the config
    return newMysqlConn; //Return the new connection
}

async function mysqlSelect(queryStr, queryVars) { //Runs MySQL Select Queries and returns results
    try {
        const sqlConnection = await mysqlConnection(); //get the connection
        const newQuery = sqlConnection.format(queryStr, queryVars); //format the query to avoid SQL Injection
        let [results, fields] = await sqlConnection.execute(newQuery) //run query
        return results; //return results
    } catch (error) {
        console.log("SQL Failure: ", error); //catch SQL errors and print to console
        return null; //return null as an SQL error was encountered trying to select
    }
}

async function mysqlInsert(queryStr, queryVars) { //Runs MySQL Insert Queries and returns whether the query was successful
    try {
        const sqlConnection = await mysqlConnection(); //get the connection
        const newQuery = sqlConnection.format(queryStr, queryVars); //format the query to avoid SQL Injection
        await sqlConnection.query(newQuery) //run query
        return true; //return true as any errors would drop to the catch statement below
    } catch (error) {
        console.log("SQL Failure: ", error); //catch SQL errors and print to console
        return false; //return false as there was an SQL error
    }
}

app.get('/', function(req, res) {});

app.get('/getRecipe', getRecipe);
app.post('/addReview', addReview);

async function getRecipe(req, res) {
    try {
        let name = req.query.name;
        console.log(name);
        const data = await mysqlSelect('select * from recipe where lower(recipe_name) like %?%', [name]);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("API Error: ", error);
        res.send("Server Error");
    }
}

async function addReview(req, res) {
    let recipe_id = req.body.recipe_id;
    let rating = req.body.rating;
    let review = req.body.review;

    const Query = await mysqlInsert(
        'INSERT INTO reviews (recipe_id, rating, review) VALUES (?,?,?)', [recipe_id, rating, review]
    );
    if (Query) { //If Query was successfull (if not then error has already been printed to console)
        console.log('Added review for: ', recipe_id);
        return true; //return true so that client can know Stock Type was added successfully
    } else {
        return false;
    } //return false so client can know Stock Type wasn't added
}