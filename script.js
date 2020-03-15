function svLcl() {
    window.print();
    console.log("user has initiated a save");
}

function faveCheck() {
    /*if user has added page to faveourites{
        document.getElementById('fave').src  = 'onStar.jpg';
      }
      else{
        document.getElementById('fave').src  = 'offStar.jpeg';
      }*/
}

let currentvalue = false;

// function fave() {
//   let x = document.getElementById('fave');
//   if (x.src = "offStar.png") {
//     document.getElementById('fave').src = 'onStar.png';
//     //window.localStorage.setItem(recipe_id, "True");
//   }
//   else if (x.src = "onStar.png"){
//     document.getElementById('fave').src = 'offStar.png';
//     //window.localStorage.removeItem(recipe_id);
//   }
// }

function fave() {
    let x = document.getElementById('fave');
    if (x.src == "offstar.png") {
        currentvalue = false;
    } else if (x.src == "onstar.png") {
        currentvalue = true;
    }
    if (currentvalue == false) {
        currentvalue = true;
        // switches the image source from faved to unfaved
        document.getElementById('fave').src = 'onStar.png';
        //update sql database that user has faved a recipe
    }
    else if (currentvalue == true) {
        currentvalue = false;
        document.getElementById('fave').src = 'offStar.png';
    }
}

//if checked state = checked then add RandUserId to database of people who have faved item.

function featuredTag() {
    //either randomly generate number and use it to find tag id or randomly generate number and use it to take the a tag using the array index of tag list
}




function init() {
    document.querySelector("#down").addEventListener('click', svLcl);
    document.getElementById("fave").addEventListener('click', fave);
}
window.addEventListener('load', init);
