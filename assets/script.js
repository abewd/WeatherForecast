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

// This function will retrieve the city into the local storage
// and display it on the weather forecast

function initWeather() {
  var storedWeather = json.parse(localStorage.getItem("currentCity"));

  // If storedWeather are not equal to null, then input all the cityName elements into storedWeather
  if (storedWeather !== null) {
    cityName = storedWeather;

    // These functions will display the weather and the forecast
    // I have no idea why theyre here...
    displayWeather();
    displayFiveDayForecast();
  }
}

// This function will save the city into the local storage

function storeCityArray() {
  // Difference between parse and stringify?
  // A: stringify turns JS into JSON
  localStorage.setItem("cities", JSON.stringify(cityName));
}

// Convert the click into a search for city function
$("#citySearchBtn").on("click", function (event) {
  // This will allow the event to be cancelled if it does not complete itself
  event.preventDefault();

  // .val() = Counts the numbers of elements in a string
  // .trim() = Remvoes whitespace
  // inserting cityInput into the cityName and checking to see if it exists in the localStorage
  cityName = $("#cityInput").val().trim();
  // if the cityName is empty
  if (cityName === "") {
    alert("Please Enter A City Name");
  } else if (cityList.length >= 5) {
    cityList.shift();
    cityList.push(cityname);
  } else {
    cityList.push(cityname);
  }
  storeCurrentCity();
  storeCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});

// Advancing the Open Weather API AJAX CALL and displaying the current city, weather, forecast 

// Creating a variable which contains the API key 
var APIkey = 811dae424e8d1fb5ea1b2108129389bd;


async function displayWeather () {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q="+
    cityName+"&units=metric&appid="+APIkey;

    // send HTTP request to server 
    var response = await $.ajax({
        url: queryURL,
        method: "GET",
    });
    console.log(response);

    

}