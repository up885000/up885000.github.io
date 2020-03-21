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

//if checked state = checked then add RandUserId to database of people who have faved item.

function featuredRecipe(){
  //take random PK id's and display 6 recipe images on html page. Connect their onclick source to the correct recipe (using the PK)
  //let query = pgClient.query("");
/*take id from html and cycle through fi+ random generation
  take image source and set source to img + random generation
  unsure on how to asscoiate correct page with the image when clicked on */

for (let i = 0; i < 6; i++){
  //loop to itterate 6 times
  console.log( 'i is equal to ' + i);
  let tempNum = randomIdGen() 
  let fiTemp = fI + tempNum;
  document.getElementById(fiTemp).src  = '/webpages/media/'+ "img" + tempNum + '.jpg';
}
  
}
function randomIdGen(){
  //generate "random" id
    //array with numbers in it.
    //randomly takes a number out of array based of Math.random()* array.length
    //gives number out as answer
    //deletes number from array
    // if array.length = 0 add 1,2,3,4,5,6 to array.
  let ranArray = [1,2,3,4,5,6];
  const theNum = Math.floor(Math.random() * ranArray.length)
  const Decision = ranArray[theNum];
  let removedItem = ranArray.splice(theNum, 1)
  console.log(removedItem);
  return Decision;
  while(ranArray.length < 1) {
    let newLength = ranArray.push('1','2','3','4','5','6')
  }
}
function testQuery(){
  let sqlInput = document.getElementById('testbox').textcontent;
}

function init() {
  document.querySelector("#down").addEventListener('click', svLcl);
  document.getElementById("fave").addEventListener('click', fave);
}

window.addEventListener('load', init);
window.addEventListener('featuredRecipe', init);

// Database Functions 
const client = require("./database");

client.query('SELECT * from ingredients', (err, res) => {
  console.log(err, res);
  client.end();
});

function init(){
  displayRecipe(4);
}

function displayRecipe(id) {
  const query = client.query("SELECT * FROM recipe where recipe_id = " + id);
  document.getElementById("recipe").textContent = query;
};