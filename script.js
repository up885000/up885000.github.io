function svLcl() {
  window.print();
}

function fave(){
currentvalue = document.getElementById('fvOnOff').value;
  if(currentvalue == "Off"){
      document.getElementById("fvOnOff").value="On";
      //make image element source = gold star
      //document . whatever = checked
  }
  else{
      document.getElementById("itaonoff").value="Off";
      //make image element source = unstarred
  }
}

//if checked state = checked then add RandUserId to database of people who have faved item.






function init(){
  window.Download.addEventListener('click', svLcl);
  window.fveBtn.addEventListener('click', fave);
}
