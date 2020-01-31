function svLcl() {
  window.print();
  console.log("user has initiated a save");
}

function fave(){
currentvalue = document.getElementById('fvOnOff').value;
  if(currentvalue == "Off"){
      document.getElementById("fvOnOff").value="On";
      // switches the image source from faved to unfaved
      document.getElementById('faveImg').src  = 'onStar.jpg';
      //update sql database that user has faved a recipe
  }
  else{
      document.getElementById("itaonoff").value="Off";
      // we need to edit the fave stars to be the same size and file format
      document.getElementById('faveImg').src  = 'offStar.jpeg';
      //update sql database that user has unfaved recipe
  }
}

//if checked state = checked then add RandUserId to database of people who have faved item.






function init(){
  document.querySelector("#down").addEventListener('click', svLcl);
  document.querySelector("#fave").addEventListener('click', fave);
}
window.addEventListener('load', init);
