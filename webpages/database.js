'use strict';
const {Pool, Client} = require('pg')

const pool = new Pool({
  user: "up885000",
  password: "softwareServer",
  host: "localhost",
  port: 5432,
  database: "recipeapp"
});

pool.query("Select recipe_name,recipe_description from recipe where recipe_id = 4",(err,res)=>{
  console.log(err,res)
  pool.end()
})

// client.connect();

// client.query('SELECT * from ingredients', (err, res) => {
//   console.log(err, res);
//   client.end();
// });

// function init(){
//   displayRecipe(4);
// }

// function displayRecipe(id) {
//   const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
//   document.getElementById("recipe").textContent = query;
// };