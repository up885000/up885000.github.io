// print Window function
function svLcl() {
    window.print();
    console.log("user has initiated a save");
}

// Favourite recipe function
let currentvalue = false;

function fave() {
    let x = document.getElementById('fave');
    if (x.src == "media/offstar.png") {
        currentvalue = false;
    } else if (x.src == "media/onstar.png") {
        currentvalue = true;
    }
    //currentvalue = document.getElementById('fvOnOff').value;
    if (currentvalue == false) {
        currentvalue = true;
        //document.getElementById("fvOnOff").valu = "True";
        // switches the image source from faved to unfaved
        document.getElementById('fave').src = 'media/onStar.png';
        //update sql database that user has faved a recipe
    }
    //Add local storage element here **
    else if (currentvalue == true) {
        currentvalue = false;
        //document.getElementById("fvOnoff").value="False";
        // we need to edit the fave stars to be the same size and file format
        document.getElementById('fave').src = 'media/offStar.png';
        //update sql database that user has unfaved recipe
    }
}

async function findRecipe(){
         //async function to search for recipies needs to be given a proper function
         let name = document.getElementById("recipeName").value;
         console.log(name);
         let response = await fetch('/getRecipe?name=' + name);
         console.log(response);
         let data = await response.json();
         //data is the data outgoing from the sql database
         console.log(data);
     }

function revBtn(){


    //adds recipe_id for the addReview() function to use
    const new_recID = document.createElement('input');
    new_recID.setAttribute('id', 'recipe_id');
    new_recID.setAttribute('type', 'text');
    new_recID.setAttribute('name', 'recipe_id');
    search.appendChild(new_recID);

    //adds rating for the addReview() function to use
    const new_rating = document.createElement('input');
    new_rating.setAttribute('id', 'rating');
    new_rating.setAttribute('type', 'text');
    new_rating.setAttribute('name', 'rating');
    search.appendChild(new_rating);

    //adds review for the addReview() function to use
    const new_review = document.createElement('input');
    new_review.setAttribute('id', 'review');
    new_review.setAttribute('type', 'text');
    new_review.setAttribute('name', 'review');
    search.appendChild(new_review);

    //adds submit button for the addReview() forms to use
    const new_submit = document.createElement('input');
    new_submit.setAttribute('id', 'addReview');
    new_submit.setAttribute('type', 'submit');
    new_submit.setAttribute('name', 'addReview');
    search.appendChild(new_submit);

    //gets the function addReview from the server.js file and runs it
    $.getscript("../server.js",addReview(req, res));
    }


//Initialise js buttons
function init() {
    document.querySelector("#down").addEventListener('click', svLcl);
    document.getElementById("fave").addEventListener('click', fave);

    document.getElementById("findRecipe").addEventListener('click', async() => { findRecipe();});
    document.getElementById("rev").addEventListener('click', revBtn);

}
//add click listeners
window.addEventListener('load', init);
window.addEventListener('featuredRecipe', init);
