
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