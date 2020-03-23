/* 
Requirements:
    1. findRecipe must exist.
    2. findRecipe must be a function.
    3. Must return an sql value with valid input.
    4. Must return an error with invalid input.
*/

QUnit.test('findRecipe Exists', function(assert){
    assert.ok(findRecipe, 'findRecipe found ✅');
})

QUnit.test('findRecipe is a function', function(assert) {
  assert.ok(typeof findRecipe === 'function', 'findRecipe is a function ✅');
});