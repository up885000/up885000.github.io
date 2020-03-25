/** 
 * @file This file contains unit tests that will run via the npm test command. They are written using the QUnit testing framework.
 * @author UP891226, UP885000, UP885188, UP905446, UP813077
 */


if (typeof(require) !== 'undefined') {
  // It's important to define it with the very same name in order to have both browser and CLI runs working with the same test code
  findRecipe = require('../webpages/index.js').findRecipe;
  revBtn = require('../webpages/index.js').revBtn;
  mysqlSelect = require('../server.js').mysqlSelect;
  stopServer = require('../server.js').stopServer;
  mysqlInsert = require('../server.js').mysqlInsert;
  fave = require('../webpages/index.js').fave;
  submitForm = require('../webpages/index.js').submitForm;
  selectRecipe = require('../webpages/index.js').selectRecipe;
}

// These test make sure that the database has been successfully deployed.
QUnit.module('Database 🥕');

QUnit.test('Recipe table exists', async function(assert){
  let query = 'select recipe_id from recipe where lower(recipe_name) like ?';
  let vars = ["%" + "Jollof" + "%"];
  let expected = '1';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].recipe_id;
  stopServer();

  assert.equal(parsed, expected, 'Recipe table exists ✅');
});


QUnit.test('Category table exists', async function(assert){
  let query = 'select category_id from category where lower(category_name) like ?';
  let vars = ["%" + "African" + "%"];
  let expected = '1';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].category_id;
  stopServer();

  assert.equal(parsed, expected, 'Category table exists ✅');
});

QUnit.test('Ingredients table exists', async function(assert){
  let query = 'select ingredients_id from ingredients where lower(ingredients_name) like ?';
  let vars = ["%" + "Sunflower Oil" + "%"];
  let expected = '1';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].ingredients_id;
  stopServer();

  assert.equal(parsed, expected, 'Ingredients table exists ✅');
});

QUnit.test('Reviews table exists', async function(assert){
  let query = 'select reviews_id from reviews where lower(review) like ?';
  let vars = ["%" + "This recipe was very good. I made this for 8, and we all thoroughly enjoyed it." + "%"];
  let expected = '1';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].reviews_id;
  stopServer();

  assert.equal(parsed, expected, 'Reviews table exists ✅');
});

QUnit.test('recipe_category_line table exists', async function(assert){
  let query = 'select recipe_id from recipe_category_line where lower(recipe_id) like ?';
  let vars = ["%" + "1" + "%"];
  let expected = '1';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].recipe_id;
  stopServer();

  assert.equal(parsed, expected, 'Recipe Category Line table exists ✅');
});

QUnit.test('recipe_ingredients table exists', async function(assert){
  let query = 'select quantity from recipe_ingredients where (recipe_id, ingredients_id, type) = (?, ?, ?)';
  let vars = ["1", "32", "metric"];
  let expected = "400";
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].quantity;
  stopServer();

  assert.equal(parsed, expected, 'Recipe Ingredients table exists :white_check_mark:');
});

QUnit.test('Measurements table exists', async function(assert){
  let query = 'select measurement_id from measurements where lower(measurement_name) like ?';
  let vars = ["%" + "ml" + "%"];
  let expected = '2';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].measurement_id;
  stopServer();

  assert.equal(parsed, expected, 'Measurements table exists ✅');
});

// These tests make sure the app can query the attached database.
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

// These tests make sure the app can insert into and update the attached database.
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

// These tests make sure the client-side functions of the program are present and have not been broken or removed during development.
QUnit.module('Frontend 💻');

QUnit.test('favouriteRecipe exists', function(assert){
  assert.ok(fave, 'favouriteRecipe found ✅');
});

QUnit.test('favouriteRecipe is a function', function(assert){
assert.ok(typeof fave === 'function', 'favouriteRecipe is a function ✅');
});

QUnit.test('submitForm exists', function(assert){
  assert.ok(submitForm, 'submitForm found ✅');
});

QUnit.test('submitForm is a function', function(assert){
assert.ok(typeof submitForm === 'function', 'submitForm is a function ✅');
});

QUnit.test('selectRecipe exists', function(assert){
  assert.ok(selectRecipe, 'selectRecipe found ✅');
});

QUnit.test('selectRecipe is a function', function(assert){
assert.ok(typeof selectRecipe === 'function', 'selectRecipe is a function ✅');
});