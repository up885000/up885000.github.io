'use strict';

const { Pool, Client } = require('pg');

const pool = new Pool({
    user: "up885000",
    password: "softwareServer",
    host: "up885000@up885000.myvm.port.ac.uk",
    port: 5432,
    database: "recipeapp"
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err,res);
  pool.end();
});

const client = new Client({
    user: "up885000",
    password: "softwareServer",
    host: "up885000@up885000.myvm.port.ac.uk",
    port: 5432,
    database: "recipeapp"
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});


function displayRecipe(id) {
    const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
    document.getElementById("recipe").textContent = query;
};
