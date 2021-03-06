/**
 * @file Manages all of the fontend, clientside javascript interactions.
 * @author UP891226, UP885000, UP885188, UP905446, UP813077
 */

// print Window function
function svLcl() {
    window.print();
    console.log("User has initiated a save.");
}

/**
 * This function manages saving and removing recipes in local storage.
 * 
 * @param {String} fileName The name of the currently open recipe.
 */
function fave() {
    let fileName = document.getElementById('recipeTitle').innerHTML;
    let fileCheck = localStorage.getItem(fileName);

    if(fileCheck !== null){ //Remove files from storage
        window.localStorage.removeItem(fileName);
    }

    if (fileCheck === null) { //Adds file to storage and validates name.
        if (fileName == null || fileName == "") {
            alert("Error: Invalid FileName");
        } else {
            const savefile = document.getElementById('recipe').innerHTML;
            window.localStorage.setItem(fileName, savefile);
        }
    }

    faveCheck(fileName);
}

let savefiles = [];

function showSaves() {
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        savefiles.push(localStorage.key(i));
    }
    window.alert(savefiles);
    savefiles = [];
}


/**
 * This function manages loading saved recipes from local storage.
 *
 * @param {String} fileName The name of the recipe attempting to be opened.
 */ 
function load() {
    let fileName = prompt("fileName: ", "");
    if (localStorage.getItem(fileName) !== null){
      const savefile = window.localStorage.getItem(fileName);
      document.getElementById('recipe').innerHTML = savefile;
      document.getElementById('fave').src = 'media/onStar.png';
    }
    else {
      window.alert("Error: Invalid fileName");
    }
}


/**
 * This function will query the database for information about a selected recipe and then display it to the user.
 * It is displayed by updating the recipe list/buttons on the screen.
 *
 * @param {String} name Pulls the recipe being search for from the HTML element recipeName.
 */
async function findRecipe() {
    //async function to search for recipies needs to be given a proper function
    let name = document.getElementById("recipeName").value;
    let sortMethod = document.getElementById('sortBy').value;
    let category = document.getElementById('category').value;
    let response = await fetch('/getRecipe?name=' + name + '&category=' + category);
    let data = await response.json();
    data.sort(sortByProperty(sortMethod));

    updateButtons(data);
}

/**
 * Generic array sorting
 *
 * @param property
 * @returns {Function}
 */
function sortByProperty(property) {
    return function(x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
}

/**
 * This function helps track which recipes have been favourited.
 * 
 * @param {String} fileName The name of the recipe currently open.
 */
function faveCheck(fileName){
    let fileCheck = localStorage.getItem(fileName);

    if(fileCheck !== null){
      document.getElementById('fave').src = 'media/onStar.png';
    }
    else if(fileCheck === null){
      document.getElementById('fave').src = 'media/offStar.png';
    }
  }

/**
 * This function will query the database for information about a selected recipe and then display it to the user.
 *
 * @param {String} name The name of the recipe being searched for.
 */
async function selectRecipe(id) {
    //async function to search for recipies needs to be given a proper function
    let response = await fetch('/getRecipeId?id=' + id);
    let data = await response.json();
    //data is the data outgoing from the sql database
    document.getElementById('recipeTitle').innerHTML = data[0].recipe_name;
    document.getElementById('recipeImg').src = ".." + data[0].image_location;
    document.getElementById('method').innerHTML = data[0].recipe_description;
    document.getElementById('prepTime').innerHTML = "Preperation Time: " + data[0].preparation_time;
    document.getElementById('cookingTime').innerHTML = "Cooking Time: " + data[0].cooking_time;
    document.getElementById('difficulty').innerHTML = "Difficulty: " + data[0].difficulty;
    document.getElementById('serving').innerHTML = "Serving Size: " + data[0].recipe_serving;
    response = await fetch('/getIngredientsId?id=' + id);

    selected_recipe = data[0].recipe_id;
    faveCheck(data[0].recipe_name); //checks if favourite star should be on

    data = await response.json();
    var i;
    let ingredients = "";
    for (i = 0; i < data.length; i++) {
        ingredients += "<li>" + data[i].ingredients_name + " " +
            data[i].quantity + " " +
            data[i].measurement_name;
    }
    document.getElementById('ingredients').innerHTML = ingredients;
}

let timesFiredReview = 0;
let selected_recipe = null;

/**
 * This function creates the neccessary form to enter review information.
 *
 * @param {Number} new_rating A numerical rating for the recipe ranging from 1-5.
 * @param {Number} new_recID A numerical ID attached to the recipe.
 * @param {String} new_review A text review for the recipe.
 * @param {Button} new_submit A sumbit button.
 */
function revBtn(new_rating, name, new_review, new_submit) {
    // setting up vaildation
    if (timesFiredReview < 1) {

        //adds rating for the addReview() function to use
        const new_rating = document.createElement('input');
        new_rating.setAttribute('id', 'rating');
        new_rating.setAttribute('type', 'number');
        new_rating.setAttribute('name', 'rating');
        new_rating.setAttribute('placeholder', 'Rating');
        new_rating.setAttribute('min', '0');
        new_rating.setAttribute('max', '5');
        reviewForm.appendChild(new_rating);

        //adds review for the addReview() function to use
        const new_review = document.createElement('input');
        new_review.setAttribute('id', 'review');
        new_review.setAttribute('type', 'text');
        new_review.setAttribute('name', 'review');
        new_review.setAttribute('placeholder', 'Review');
        reviewForm.appendChild(new_review);

        //adds submit button for the addReview() forms to use
        const new_submit = document.createElement('input');
        new_submit.setAttribute('id', 'addReview');
        new_submit.setAttribute('type', 'button');
        new_submit.setAttribute('name', 'addReview');
        new_submit.setAttribute('value', 'Submit');
        reviewForm.appendChild(new_submit);

        timesFiredReview = timesFiredReview + 1;
        document.getElementById('addReview').addEventListener('click', submitForm);

        document.getElementById("review").addEventListener("keyup", function(event) {
            if (event.keyCode == 13) {
                document.getElementById('addReview').click();
            }
        });

    } else {
        console.log("Error: You already have a review form in progress.");
    }
}

/**
 * This function is responsible for submitting a review. It uses the "/addReview" endpoint to do this.
 *
 */
async function submitForm() {
    //gets the function addReview from the server.js file and runs it

    let recipe_id = selected_recipe; //From selectRecipe()
    let rating = document.getElementById('rating').value;
    let review = document.getElementById('review').value;

    if (rating > 5 || rating < 0){
        alert("Please enter a rating between 1 and 5");
    } 
    else {
        let response = fetch('/addReview?recipe_id=' + recipe_id + "&rating=" + rating + "&review=" + review);
        alert("Review has been submitted successfully.");
        reviewForm.removeChild(document.getElementById('rating'));
        reviewForm.removeChild(document.getElementById('review'));
        reviewForm.removeChild(document.getElementById('addReview'));
        timesFiredReview = timesFiredReview - 1;
    }
}

/**
 * Randomly selects 6 recipes to display when the page loads and then maps these images and associated recipe_id's to the html buttons.
 *
 */
async function imageRandomizer() {
    //query server to add all images into array
    let response = await fetch('/getRandomImages');
    let data = await response.json();

    updateButtons(data);
    selectRecipe(document.getElementById("fI1").className);
}

/**
 * This function will update the buttons show on screen so that they match the recipes being searched for.
 *
 * @param {JSON[]} data The array of json given by formatting a fetch api request.
 */
function updateButtons(data) {
    let cycles = 0;
    while (cycles < 6) {
        let currentImage = document.getElementById('fI' + (cycles + 1));
        if (data[cycles]) {
            currentImage.src = data[cycles].image_location;
            currentImage.setAttribute('class', data[cycles].recipe_id);
            cycles = cycles + 1;
        } else {
            currentImage.src = './webpages/media/blank.png';
            currentImage.setAttribute('class', '0');
            cycles = cycles + 1;
        }
    }
}

/**
 * This function will display to the user the average rating a recipe ahs recieved and all of the reviews left for it.
 *
 */
async function displayReviews(){
    let reviewText = '';

    let response = await fetch('/getRating?id=' + selected_recipe);
    let data = await response.json();
    reviewText = 'Average rating: ' + data[0].average_rating;
    
    response = await fetch('/getReview?id=' + selected_recipe);
    data = await response.json();

    var i;
    for (i = 0; i < data.length; i++) {
        reviewText += "<li>" + data[i].rating + " Stars - " + data[i].review;
    }

    document.getElementById('method').innerHTML = reviewText;
}

/**
 * This function will change the size of relevant recipe text on the page.
 *
 * @param {Percentage} textSize A percentage that will change the text size relative to the original.
 */
function changeTextSize(){
    let textSise = prompt('Enter a new text size: (e.g. 120%, 75%)');

    document.getElementById("method").style.fontSize = textSise;
    document.getElementById("ingredients").style.fontSize = textSise;
    document.getElementById("info").style.fontSize = textSise;
}


/**
 * Initialises Javascript buttons, this function is called immideatly when the page loads.
 *
 */
function init() {
    imageRandomizer();
    if (document.getElementById("down")) {
        document.getElementById("down").addEventListener('click', svLcl);
    }
    if (document.getElementById("fave")) {
        document.getElementById("fave").addEventListener('click', fave);
    }
    if (document.getElementById("load")) {
        document.getElementById("load").addEventListener('click', load);
    }
    if (document.getElementById("findRecipe")) {
        document.getElementById("findRecipe").addEventListener('click', async() => {
            findRecipe();
        });
    }
    if (document.getElementById("recipeName")) {
        document.getElementById("recipeName").addEventListener("keyup", function(event) {
            if (event.keyCode == 13) {
                document.getElementById("findRecipe").click();
            }
        });
    }
    if (document.getElementById("rev")) {
        document.getElementById("rev").addEventListener('click', revBtn);
    }
    if (document.getElementById("addReview")) {
        document.getElementById("addReview").addEventListener('click', submitForm);
    }
    document.getElementById("showSaves").addEventListener('click', showSaves);
    document.getElementById("fI1").addEventListener('click', async() => {
        selectRecipe(document.getElementById("fI1").className);
    });
    document.getElementById("fI2").addEventListener('click', async() => {
        selectRecipe(document.getElementById("fI2").className);
    });
    document.getElementById("fI3").addEventListener('click', async() => {
        selectRecipe(document.getElementById("fI3").className);
    });
    document.getElementById("fI4").addEventListener('click', async() => {
        selectRecipe(document.getElementById("fI4").className);
    });
    document.getElementById("fI5").addEventListener('click', async() => {
        selectRecipe(document.getElementById("fI5").className);
    });
    document.getElementById("fI6").addEventListener('click', async() => {
        selectRecipe(document.getElementById("fI6").className);
    });
    document.getElementById("viewReviews").addEventListener('click', async() => {
        displayReviews();
    });
    document.getElementById("settingsButton").addEventListener('click', async() => {
        changeTextSize();
    });
}

//add click listeners

if (typeof window !== 'undefined') {
    window.addEventListener('load', init);
    window.addEventListener('featuredRecipe', init);
}

//export functions

if (typeof module !== 'undefined' && module.exports) {
    exports.revBtn = revBtn;
    exports.findRecipe = findRecipe;
    exports.fave = fave;
    exports.submitForm = submitForm;
    exports.selectRecipe = selectRecipe;
}
