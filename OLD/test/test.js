/* 
Requirements:
    1. findRecipe must exist.
    2. findRecipe must be a function.
    3. Must return an sql value with valid input.
    4. Must return an error with invalid input.
*/
if (typeof(require) !== 'undefined') {
  // It's important to define it with the very same name in order to have both browser and CLI runs working with the same test code
  findRecipe = require('../webpages/index.js').findRecipe;
  revBtn = require('../webpages/index.js').revBtn;
}

//const testlib = require('../webpages/index.js');

QUnit.module('SQL Query');

QUnit.test('findRecipe Exists 🥕', function(assert){
    assert.ok(findRecipe, 'findRecipe found ✅');
})

QUnit.test('findRecipe is a function 🥞', function(assert) {
  assert.ok(typeof findRecipe === 'function', 'findRecipe is a function ✅');
});

QUnit.module('SQL Insert');

QUnit.test('addReview Exists 🦐', function(assert){
    assert.ok(revBtn, 'addReview found ✅');
})

QUnit.test('addReview is a function 🦑', function(assert) {
  assert.ok(typeof revBtn === 'function', 'addReview is a function ✅');
});