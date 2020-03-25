/** 
 * @file Manages all of the fontend, clientside javascript interactions.
 * @author UP891226, UP885000, UP885188, UP905446, UP813077
 */

// print Window function
function svLcl() {
    window.print();
    console.log("user has initiated a save");
}

// Favourite recipe function
let currentvalue = false;

let favestring = null;

function fave() {
    let title = document.getElementById('recipeTitle').innerHTML;
    let favebutton = document.getElementById('fave');
    if (favebutton.src == "media/offstar.png") {
        currentvalue = false;
    } else if (favebutton.src == "media/onstar.png") {
        currentvalue = true;
    }
    if (currentvalue == false) {
        currentvalue = true;
        //this is saveing
        // switches the image source from faved to unfaved
        document.getElementById('fave').src = 'media/onStar.png';
        let fileName = title;
        if (fileName == null || fileName == "") {
            alert("Error: Invalid FileName");
        } else {
            const savefile = document.getElementById('recipe').innerHTML;
            window.localStorage.setItem(fileName, savefile);
        }
    }
    //Add local storage element here **
    else if (currentvalue == true) {
        currentvalue = false;
        //this is un-saveing
        window.localStorage.removeItem(fileName);

        // we need to edit the fave stars to be the same size and file format
        document.getElementById('fave').src = 'media/offStar.png';
        //update sql database that user has unfaved recipe
    }
}

let savefiles = [];

function showSaves() {
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        savefiles.push(localStorage.key(i));
    }
    window.alert(savefiles);
    saveFiles = [];
}


function load() {
    let fileName = prompt("FileName: ", "");
    if (fileName == null || fileName == "" || fileName == " ") {
        alert("Error: Invalid FileName");
    } else {
        const savefile = window.localStorage.getItem(fileName);
        document.getElementById('recipe').innerHTML = savefile;
        document.getElementById('fave').src = 'media/onStar.png';
    }
}


/**
 * This function will query the database for information about a selected recipe and then display it to the user.
 * 
 * Function is largely depreceated and replaced by selectRecipe().
 */
async function findRecipe() {
    //async function to search for recipies needs to be given a proper function
    let name = document.getElementById("recipeName").value;
    console.log(name);
    let response = await fetch('/getRecipe?name=' + name);
    console.log(response);
    let data = await response.json();
    //data is the data outgoing from the sql database
    console.log(data);
    let r_name = data[0].recipe_name; //example of parsing json
    document.getElementById('recipeTitle').innerHTML = r_name;
}

/**
 * This function will query the database for information about a selected recipe and then display it to the user.
 *
 * @param {String} name The name of the recipe being searched for.
 */
async function selectRecipe(name) {
    //async function to search for recipies needs to be given a proper function
    console.log(name);
    let response = await fetch('/getRecipeId?name=' + name);
    console.log(response);
    let data = await response.json();
    //data is the data outgoing from the sql database
    console.log(data);
    document.getElementById('recipeTitle').innerHTML = data[0].recipe_name;
    document.getElementById('recipeImg').src = ".." + data[0].image_location; //===============
    document.getElementById('method').innerHTML = data[0].recipe_description;
    // document.getElementById('ingredients').innerHTML = data[0].recipe_name;
    document.getElementById('prepTime').innerHTML = "Preperation Time: " + data[0].preparation_time;
    document.getElementById('cookingTime').innerHTML = "Cooking Time: " + data[0].cooking_time;
    document.getElementById('difficulty').innerHTML = "Difficulty: " + data[0].difficulty;
    document.getElementById('serving').innerHTML = "Serving Size: " + data[0].recipe_serving;
}

let timesFiredReview = 0;

/**
 * This function creates the neccessary form to enter review information.
 *
 * @param {Number} new_rating A numerical rating for the recipe ranging from 1-5.
 * @param {Number} new_recID A numerical ID attached to the recipe.
 * @param {String} new_review A text review for the recipe.
 * @param {Button} new_submit A sumbit button.
 */
function revBtn(new_rating, new_recID, new_review, new_submit) {
    // setting up vaildation
    if (timesFiredReview < 1) {
        //adds recipe_id for the addReview() function to use
        const new_recID = document.createElement('input');
        new_recID.setAttribute('id', 'recipe_id');
        new_recID.setAttribute('type', 'text');
        new_recID.setAttribute('name', 'recipe_id');
        new_recID.setAttribute('class', 'reviewForm');
        reviewForm.appendChild(new_recID);

        //adds rating for the addReview() function to use
        const new_rating = document.createElement('input');
        new_rating.setAttribute('id', 'rating');
        new_rating.setAttribute('type', 'text');
        new_rating.setAttribute('name', 'rating');
        new_rating.setAttribute('class', 'reviewForm');
        reviewForm.appendChild(new_rating);

        //adds review for the addReview() function to use
        const new_review = document.createElement('input');
        new_review.setAttribute('id', 'review');
        new_review.setAttribute('type', 'text');
        new_review.setAttribute('name', 'review');
        new_review.setAttribute('class', 'reviewForm');
        reviewForm.appendChild(new_review);

        //adds submit button for the addReview() forms to use
        const new_submit = document.createElement('input');
        new_submit.setAttribute('id', 'addReview');
        new_submit.setAttribute('type', 'submit');
        new_submit.setAttribute('name', 'addReview');
        new_submit.setAttribute('class', 'reviewForm');
        reviewForm.appendChild(new_submit);

        timesFiredReview = timesFiredReview + 1;

    } else {
        console.log("error you already have a review form in progress");
    }
}

/**
 * This function is responsible for submitting a review. It uses the "/addReview" endpoint to do this.
 * 
 */
async function submitForm() {

    //gets the function addReview from the server.js file and runs it
    console.log("initiating recipe review");
    let response = await fetch('/addReview?recipe_id=' + new_recID + "&rating=" + new_rating + "&review=" + new_review);
    console.log("you have successfully reviewed this recipe");
    search.removeChild(new_recID);
    search.removeChild(new_rating);
    search.removeChild(new_review);
    search.removeChild(new_submit);
    timesFiredReview = timesFiredReview - 1;
}


/**
 * Initialises Javascript buttons, this function is called immideatly when the page loads.
 *
 */
function init() {
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
    if (document.getElementById("rev")) {
        document.getElementById("rev").addEventListener('click', revBtn);
    }
    if (document.getElementById("submit")) {
        document.getElementById("submit").addEventListener('click', submitForm);
    }
    document.getElementById("showsaves").addEventListener('click', showSaves);
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