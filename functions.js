// lists of known states and cities, and saved user inputs
var knownCities = [];
var knownStates = [];
var userInputs = [];
var statesToCities = {};

// load the data and fill in the dropdown when the page loads
$(document).ready(function(){
  // load the data; this function then calls populateDropdown()
  loadData();
});

// get the user input enter key is pressed
$(document).keypress(function(e) {
    if(e.which == 13) {
        // get the input
        let cityEntered = document.getElementById("cityInput").value;
        console.log("City entered: " + cityEntered);

        // check if it is a valid city
        if(isCityValid(cityEntered) && !userInputs.includes(cityEntered)){
          // if so, add it somewhere on the page
          let para = document.createElement("P");
          let t = document.createTextNode(cityEntered);
          para.appendChild(t);
          document.getElementById("validCities").appendChild(para);

          // add this to the user's list
          userInputs.push(cityEntered);
        }
        // don't allow duplicates
        else if(isCityValid(cityEntered) && userInputs.includes(cityEntered)){
          alert("You've already listed this city!");
        }
        // throw an error only if there was text in the input box
        else if(cityEntered.length > 0){
          alert("Sorry, we do not know this city. Please try another one.");
        }

        // clear the input box
        document.getElementById("cityInput").value = '';
        console.log(userInputs);
    }
});

// check if the input city is valid
function isCityValid(input){
  inputLower = input.toLowerCase();
  for(let i=0; i<knownCities.length; ++i){
    if(inputLower == knownCities[i].toLowerCase()){
      return true;
    }
  }
  return false;
}

// push data to knownStates and knownCities (arrays)
function loadData(){
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", "city-data-scrape.csv", false);
  rawFile.onreadystatechange = function (){
    if(rawFile.readyState === 4){
      if(rawFile.status === 200 || rawFile.status == 0){
        let allText = rawFile.responseText;
        lines = allText.split('\n');

        // loop starts from 1 to exclude the header from the list
        for(let i=1; i<lines.length-1; ++i){
          cols = lines[i].split(',');
          state = cols[0];
          city = cols[1];

          // append the names of cities and states to the lists
          if(!knownStates.includes(state))
            knownStates.push(state);
          knownCities.push(city);
        }
      }
    }
  }
  rawFile.send(null);

  // populate the dropdown once all the data is loaded
  populateDropdown();
}

// populate the dropdown menu with values in knownStates
function populateDropdown(){
  for(let i=0; i<knownStates.length; ++i){
    let op = document.createElement("OPTION");
    op.setAttribute("value", knownStates[i]);
    let t = document.createTextNode(knownStates[i]);
    op.appendChild(t);
    document.getElementById("statesDropdown").appendChild(op);
  }
}

// implement reset function
function reset(){
  // clear the user input array
  userInputs = [];
  console.log(userInputs);

  // clear all the text in div id=validCities
  $("#validCities").empty();
}

// TODO: call the python script
function callPy(){

}

// TODO: get the results after calling the py script; delete it after use
function getRecommendations(){

}

/*
  The functions below came with w3school's template.
  https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_startup
*/
// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
    } else {
        mySidebar.style.display = 'block';
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
}
