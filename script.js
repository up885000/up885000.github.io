function svLcl() {
  window.print();
  console.log("user has initiated a save");
}

function faveCheck(){
/*if user has added page to faveourites{
    document.getElementById('fave').src  = 'onStar.jpg';
  }
  else{
    document.getElementById('fave').src  = 'offStar.jpeg';
  }*/
}

function fave(){
currentvalue = document.getElementById('fvOnOff').value;
  if(currentvalue == "False")
      document.getElementById("fvOnOff").value = "True";
      // switches the image source from faved to unfaved
      document.getElementById('fave').src  = 'onStar.jpg';
      //update sql database that user has faved a recipe
  }
  else{
      document.getElementById("fvOnoff").value="False";
      // we need to edit the fave stars to be the same size and file format
      document.getElementById('fave').src  = 'offStar.jpeg';
      //update sql database that user has unfaved recipe
  }
}

//if checked state = checked then add RandUserId to database of people who have faved item.

function featuredTag(){
  //either randomly generate number and use it to find tag id or randomly generate number and use it to take the a tag using the array index of tag list
}




function init(){
  document.querySelector("#down").addEventListener('click', svLcl);
  document.querySelector("#fave").addEventListener('click', fave);
}
window.addEventListener('load', init);
