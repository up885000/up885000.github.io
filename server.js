'use strict';

var {Client} = require('pg');
var client = new Client({
    user: "up885000",
    password: "softwareServer",
    host: "up885000@up885000.myvm.port.ac.uk",
    port: 5432,
    database: "RecipeApp"
});

client.connect();
//.then(() => console.log("Connected successfuly"));


function displayRecipe(id){
  let query = client.query("SELECT * FROM recipe where recipe_id = " + id);
  document.getElementById("recipe").textContent = query;
}
