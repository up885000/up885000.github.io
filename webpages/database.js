'use strict';

const {
  Pool,
  Client
} = require('pg');

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


function displayRecipe(id) {
  const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
  document.getElementById("recipe").textContent = query;
};