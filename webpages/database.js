'use strict';

client.connect();

client.query('SELECT * from ingredients', (err, res) => {
  console.log(err, res);
  client.end();
});

function init(){
  displayRecipe(4);
}

function displayRecipe(id) {
  const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
  document.getElementById("recipe").textContent = query;
};