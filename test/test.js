/* 
This file contains unit test that will run via the npm test command,
They are written using the QUnit testing framework.
*/

if (typeof(require) !== 'undefined') {
  // It's important to define it with the very same name in order to have both browser and CLI runs working with the same test code
  findRecipe = require('../webpages/index.js').findRecipe;
  revBtn = require('../webpages/index.js').revBtn;
  getRecipeInfo = require('../server.js').getRecipeInfo;
}

//const testlib = require('../webpages/index.js');

QUnit.module('SQL Query');

QUnit.test('findRecipe Exists 🥕', function(assert){
    assert.ok(findRecipe, 'findRecipe found ✅');
})

QUnit.test('findRecipe is a function 🥞', function(assert){
  assert.ok(typeof findRecipe === 'function', 'findRecipe is a function ✅');
});

QUnit.test('findRecipe returns correct value 🥗', function(assert){
  let testName = 'Chicken';
  let expected = 'Chicken burritos';

  assert.equal(getRecipeInfo(testName), expected, 'findRecipe returns correct value ✅');
});

QUnit.module('SQL Insert');

QUnit.test('addReview Exists 🦐', function(assert){
    assert.ok(revBtn, 'addReview found ✅');
})

QUnit.test('addReview is a function 🦑', function(assert){
  assert.ok(typeof revBtn === 'function', 'addReview is a function ✅');
});