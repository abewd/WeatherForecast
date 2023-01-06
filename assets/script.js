// Global Variables
var cityList = [];
var cityName = [];

// Local Storage Functions
initCityList();
initWeather();

// This function will display the city into the DOM
function renderCities() {
  $("#cityList").empty();
  $("#cityInput");

  // Create a loop to go through the lenghts for the city
  for (i = 0; i < cityList.length; i++) {
    // This next line of code is creating a new element <a> using jQuery library
    // $ is used to call the jQuery funtion
    // <a> is an argument string that is represents the html element which will be created which is stored in "a"
    var a = $("<a>");
    // a will then be added to the following classes in the html values
    a.addClass(
      "list-group-item list-group-item-action list-group-item-primary city"
    );
    // attr is used to set the function of a value "a"
    // text is used to set the value of "a" to the cityList element
    a.attr("data-name", cityList[i]);
    a.text(cityList[i]);
    // prepend will add multiple elements to the cityList function from a
    $("#cityList").preprnd(a);
  }
}

// This function which will retrieve the city names from a local storage
function initCityList() {
  // storedCities is equal to items from teh local storage in "cities"
  // JSON.parse is in simple terms, changing language JSON to JS
  // JSON === JavsScriptObjectNotation
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // if the storedCities are not equal to null, then input all cityList list into storedCities
  if (storedCities !== null) {
    cityList = storedCities;
  }
  renderCities();
}

// T
