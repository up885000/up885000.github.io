'use strict';

const {Client} = require('pg');
const client = new Client({
    user: "up885000",
    password: "softwareServer",
    host: "up885000@up885000.myvm.port.ac.uk",
    port: 5432,
    database: "recipeapp"
});

client.connect();
.then(() => console.log("Connected successfuly"));



function displayRecipe(id){
  const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
  document.getElementById("recipe").textContent = query;
}
