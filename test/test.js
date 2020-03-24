/* 
This file contains unit test that will run via the npm test command,
They are written using the QUnit testing framework.
*/

if (typeof(require) !== 'undefined') {
  // It's important to define it with the very same name in order to have both browser and CLI runs working with the same test code
  findRecipe = require('../webpages/index.js').findRecipe;
  revBtn = require('../webpages/index.js').revBtn;
  mysqlSelect = require('../server.js').mysqlSelect;
}

//const testlib = require('../webpages/index.js');

QUnit.module('SQL Query');

QUnit.test('findRecipe Exists 🥕', function(assert){
    assert.ok(findRecipe, 'findRecipe found ✅');
});

QUnit.test('findRecipe is a function 🥞', function(assert){
  assert.ok(typeof findRecipe === 'function', 'findRecipe is a function ✅');
});

QUnit.test('RecipeApp database is queryable 🥗', async function(assert){
  let query = 'select recipe_id,recipe_name,image_location from recipe where lower(recipe_name) like ?';
  let vars = ["%" + "chicken" + "%"];
  let expected = 'Chicken burritos';
  let response = await mysqlSelect(query, vars);
  let parsed = response[0].recipe_name;

  assert.equal(parsed, expected, 'findRecipe returns correct value ✅');
});

QUnit.module('SQL Insert');

QUnit.test('addReview Exists 🦐', function(assert){
    assert.ok(revBtn, 'addReview found ✅');
});

QUnit.test('addReview is a function 🦑', function(assert){
  assert.ok(typeof revBtn === 'function', 'addReview is a function ✅');
});