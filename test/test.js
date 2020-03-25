/* 
This file contains unit test that will run via the npm test command,
They are written using the QUnit testing framework.
*/

if (typeof(require) !== 'undefined') {
  // It's important to define it with the very same name in order to have both browser and CLI runs working with the same test code
  findRecipe = require('../webpages/index.js').findRecipe;
  revBtn = require('../webpages/index.js').revBtn;
  mysqlSelect = require('../server.js').mysqlSelect;
  stopServer = require('../server.js').stopServer;
  mysqlInsert = require('../server.js').mysqlInsert;
}

//const testlib = require('../webpages/index.js');

QUnit.module('Database 🥕');

QUnit.test('Recipe table exists', async function(assert){
  let query = 'select recipe_id from recipe where lower(recipe_name) like ?';
  let vars = ["%" + "jollof" + "%"];
  let expected = '1';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].recipe_id;
  stopServer();

  assert.equal(parsed, expected, 'Recipe table exists ✅');
});

/*


ADD TESTS FOR REST OF TABLES HERE


*/

QUnit.module('SQL Query 🥞');

QUnit.test('findRecipe Exists', function(assert){
    assert.ok(findRecipe, 'findRecipe found ✅');
});

QUnit.test('findRecipe is a function', function(assert){
  assert.ok(typeof findRecipe === 'function', 'findRecipe is a function ✅');
});

QUnit.test('RecipeApp database is queryable', async function(assert){
  let query = 'select recipe_id,recipe_name,image_location from recipe where lower(recipe_name) like ?';
  let vars = ["%" + "chicken" + "%"];
  let expected = 'Chicken burritos';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].recipe_name;
  stopServer();

  assert.equal(parsed, expected, 'mysqlSelect returns correct value ✅');
});

QUnit.module('SQL Insert 🦐');

QUnit.test('addReview Exists', function(assert){
    assert.ok(revBtn, 'addReview found ✅');
});

QUnit.test('addReview is a function', function(assert){
  assert.ok(typeof revBtn === 'function', 'addReview is a function ✅');
});

QUnit.test('RecipeApp database is insertable', async function(assert){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;

  let query = 'INSERT INTO reviews (recipe_id, rating, review) VALUES (?,?,?)';
  let vars = ["99", "5", "Date: " + dateTime];
  let response = await mysqlInsert(query, vars);
  stopServer();

  assert.equal(response, true, 'mysqlInsert returns correct value ✅');
});

QUnit.test('RecipeApp records are updateable', async function(assert){
  let query = 'DELETE FROM reviews WHERE recipe_id = ?';
  let vars = ["99"];
  let response = await mysqlInsert(query, vars);
  stopServer();

  assert.equal(response, true, 'Test review successfully removed ✅');
});