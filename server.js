/** 
 * @file Manages all of the backend database connections and queries.
 * @author UP891226, UP885000, UP885188, UP905446, UP813077
 */

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
app.use(express.static(__dirname + '/'));
app.use(express.static(`${__dirname }/webpages`));

//set the website url
server.listen(port, () => {
    console.log('Server started:', `http://${ip.address()}:${port}`);
});


/**
 * Function will close the currently open server.ancestors
 * Only called during testing as leaving the server open would cause a build to fail.
 *
 */
function stopServer() {
    server.close();
}


const config = {
    "host": "localhost",
    "user": "webapp",
    "password": "1234",
    "database": "recipeapp"
};

/**
 * This function handles MySQL Database connections.
 * It will return an existing connection to and requesting functions.ancestors
 * If a connection does not exist it will establish a new one.
 *
 * @returns {mysqlConnection} A mySQL database connection.
 */
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

/**
 * This function will establish a connection to the mySQL server.
 * Uses the details in const "config" to establish the connection.
 * 
 * @returns {mysqlConnection} A mySQL database connection.
 */
async function newMysqlConnection() { //Creates a MySQL Database connection
    const newMysqlConn = await mysql.createConnection(config); //Create MySQL connection using the settings from the config
    return newMysqlConn; //Return the new connection
}

/**
 * This function is responsible for retrieving anything from the mySQL database.
 * It takes in a query string and variables to insert into the string.
 * If successful it will return the query results, if unsuccessful it will log an error on the server and return null.
 * 
 * The function will format the SQL in an attempt to prevent SQLi.
 *
 * @param {String} queryStr A string containing an SQL query.
 * @param {String[]} queryVars An array of values to be inserted into the SQL query.
 * @returns {(recordset|null)} Returns a recordset of the SQL query results, A null value to signify an error.
 */
async function mysqlSelect(queryStr, queryVars) { //Runs MySQL Select Queries and returns results
    try {
        const sqlConnection = await newMysqlConnection(); //get the connection
        const newQuery = sqlConnection.format(queryStr, queryVars); //format the query to avoid SQL Injection
        let [results, fields] = await sqlConnection.execute(newQuery); //run query
        sqlConnection.end();
        return results; //return results
    } catch (error) {
        console.log("SQL Failure: ", error); //catch SQL errors and print to console
        return null; //return null as an SQL error was encountered trying to select
    }
}

/**
 * This function is responsible for inserting anything into the mySQL database.
 * It takes in a query string and variables to insert into the string.
 * If successful it will return true, if unsuccessful it will log an error on the server and return false.
 * 
 * The function will format the SQL in an attempt to prevent SQLi.
 *
 * @param {String} queryStr A string containing an SQL query.
 * @param {String[]} queryVars An array of values to be inserted into the SQL query.
 * @returns {Boolean} True/False depending on success of the function.
 */
async function mysqlInsert(queryStr, queryVars) { //Runs MySQL Insert Queries and returns whether the query was successful
    try {
        const sqlConnection = await newMysqlConnection(); //get the connection
        const newQuery = sqlConnection.format(queryStr, queryVars); //format the query to avoid SQL Injection
        await sqlConnection.query(newQuery); //run query
        sqlConnection.end();
        return true; //return true as any errors would drop to the catch statement below
    } catch (error) {
        console.log("SQL Failure: ", error); //catch SQL errors and print to console
        return false; //return false as there was an SQL error
    }
}

app.get('/', function(req, res) {});

app.get('/getRecipe', getRecipe);
app.get('/getRecipeId', getRecipeId);
app.get('/getIngredientsId', getIngredientsId);
app.get('/getRandomImages', getRandomImages);
app.get('/addReview', addReview);

/**
 * This function will attempt to retrieve the recipe id, name, and image location from the database.
 * If the query is successful it will return the requested data to the client.
 * If the query is unsuccessful it will log an error server side and return an error message to the client.
 * 
 * @param {Request} req The request from the client, this contains the necessary variables.
 * @param {Response} res The response from the server, this contains a true/false response.
 */
async function getRecipe(req, res) {
    try {
        let name = req.query.name;
        let category = req.query.category;
        console.log(name);
        const data = await mysqlSelect('select r.recipe_id, r.recipe_name, r.image_location, r.preparation_time, r.cooking_time from recipe r  join recipe_category_line rc on (rc.recipe_id = r.recipe_id) join category c on (rc.category_id = c.category_id) where lower(recipe_name) like ?  and c.category_name like ? group by recipe_id', ["%" + name + "%", "%" + category + "%"]);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("API Error: ", error);
        res.send("Server Error");
    }
}

async function getRandomImages(req, res) {
    try {
        const data = await mysqlSelect('SELECT recipe_id, image_location FROM recipe ORDER BY RAND() LIMIT 0,6', []);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("API Error: ", error);
        res.send("Server Error");
    }
}

/**
 * This function will attempt to retrieve all information about a recipe from the database when provided with a recipe id.
 * If the query is successful it will return the requested data to the client.
 * If the query is unsuccessful it will log an error server side and return an error message to the client.
 * 
 * @param {Request} req The request from the client, this contains the necessary variables.
 * @param {Response} res The response from the server, this contains a true/false response.
 */
async function getRecipeId(req, res) {
    try {
        let id = req.query.id;
        console.log(id);
        const data = await mysqlSelect('select * from recipe where recipe_id = ?', [id]);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("API Error: ", error);
        res.send("Server Error");
    }
}

async function getIngredientsId(req, res) {
    try {
        let id = req.query.id;
        console.log(id);
        const data = await mysqlSelect("SELECT ri.quantity, m.measurement_name, i.ingredients_name FROM recipe_ingredients ri JOIN ingredients i ON(i.ingredients_id = ri.ingredients_id) JOIN measurements m ON(m.measurement_id = ri.measurement_id) WHERE ri.recipe_id = ? and(ri.type = 'metric ' or ri.type = 'neutral ')", [id]);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log("API Error: ", error);
        res.send("Server Error");
    }
}

/**
 * This function will attempt to insert a review into the database.
 * If the query is successful it will log a success message and return true to the client.
 * If the query is unsuccessful it will return false to the client.
 * 
 * @param {Request} req The request from the client, this contains the necessary variables.
 * @param {Response} res The response from the server, this contains a true/false response.
 * @returns {Boolean} True/False depending on success of the function.
 */
async function addReview(req, res) {
    let recipe_id = req.query.recipe_id;
    let rating = req.query.rating;
    let review = req.query.review;
    console.log(recipe_id + rating + review);
    const Query = await mysqlInsert('INSERT INTO reviews (recipe_id, rating, review) VALUES (?,?,?)', [recipe_id, rating, review]);
    if (Query) { //If Query was successfull (if not then error has already been printed to console)
        console.log('Added review for: ', recipe_id);
        return true; //return true so that client can know review was added successfully
    } else {
        return false;
    } //return false so client can know review wasn't added
}

//export functions

if (typeof module !== 'undefined' && module.exports) {
    exports.mysqlSelect = mysqlSelect;
    exports.stopServer = stopServer;
    exports.mysqlInsert = mysqlInsert;
}