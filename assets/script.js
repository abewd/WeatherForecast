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
    $("#cityList").prepend(a);
  }
}

// This function which will retrieve the city names from a local storage
function initCityList() {
  // storedCities is equal to items from teh local storage in "cities"
  // JSON.parse is in simple terms, changing language JSON to JS
  // JSON === JavsScriptObjectNotation
  //   var storedCities = JSON.parse(localStorage.getItem("cities"));

  //   // if the storedCities are not equal to null, then input all cityList list into storedCities
  //   if (storedCities !== null) {
  //     cityList = storedCities;
  //   }
  renderCities();
}

// This function will retrieve the city into the local storage
// and display it on the weather forecast

function initWeather() {
  var storedWeather = JSON.parse(localStorage.getItem("currentCity"));

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
function storeCurrentCity() {
  //   localStorage.setItem("currentCity", JSON.stringify(cityName));
  localStorage.setItem("cities", JSON.stringify(cityList.push(cityName)));
}

function storeCityArray() {
  // Difference between parse and stringify?
  // A: stringify turns JS into JSON
  localStorage.setItem("cities", JSON.stringify(cityName));
}

// Convert the click into a search for city function
$("#citySearchBtn").on("click", function (event) {
  console.log("testBUtton");
  // This will allow the event to be cancelled if it does not complete itself
  event.preventDefault();

  // .val() = Counts the numbers of elements in a string
  // .trim() = Remvoes whitespace
  // inserting cityInput into the cityName and checking to see if it exists in the localStorage
  cityName = $("#cityInput").val().trim();
  // if the cityName is empty
  if (cityName === "") {
    alert("Please Enter A City Name");
    // this section of the code isnt working very well...
    //   } else if (cityList.length >= 5) {
    //     cityList.shift();
    //     cityList.push(cityName);
    //   } else {
    //     cityList.push(cityName);
  }
  storeCurrentCity();
  storeCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});

// Advancing the Open Weather API AJAX CALL and displaying the current city, weather, forecast

// Creating a variable which contains the API key
// var APIkey = 811dae424e8d1fb5ea1b2108129389bd;

async function displayWeather() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid=811dae424e8d1fb5ea1b2108129389bd";

  // send HTTP request to server
  var response = await $.ajax({
    url: queryURL,
    method: "GET",
  });
  // Display what response we got from the API in the console log
  console.log(response);

  var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
  var getCurrentCity = response.name;
  var date = new Date();
  var val =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  var getCurrentWeatherIcon = response.weather[0].icon;
  var displayCurrentWeatherIcon = $(
    "<img src = http://openweathermap.org/img/wn/" +
      getCurrentWeatherIcon +
      "@2x.png />"
  );
  var currentCityEl = $("<h3 class = 'card-body'>").text(
    getCurrentCity + " (" + val + ")"
  );
  currentCityEl.append(displayCurrentWeatherIcon);
  currentWeatherDiv.append(currentCityEl);
  var getTemp = response.main.temp.toFixed(1);
  var tempEl = $("<p class='card-text'>").text(
    "Temperature: " + getTemp + "° F"
  );
  currentWeatherDiv.append(tempEl);
  var getHumidity = response.main.humidity;
  var humidityEl = $("<p class='card-text'>").text(
    "Humidity: " + getHumidity + "%"
  );
  currentWeatherDiv.append(humidityEl);
  var getWindSpeed = response.wind.speed.toFixed(1);
  var windSpeedEl = $("<p class='card-text'>").text(
    "Wind Speed: " + getWindSpeed + " mph"
  );
  currentWeatherDiv.append(windSpeedEl);
  var getLong = response.coord.lon;
  var getLat = response.coord.lat;

  var uvURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=d3b85d453bf90d469c82e650a0a3da26&lat=" +
    getLat +
    "&lon=" +
    getLong;
  var uvResponse = await $.ajax({
    url: uvURL,
    method: "GET",
  });
}
// This function runs the AJAX call for the 5 day forecast and displays them to the DOM
async function displayFiveDayForecast() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=metric&appid=d3b85d453bf90d469c82e650a0a3da26";

  // Awaits response from the API
  var response = await $.ajax({
    url: queryURL,
    method: "GET",
  });
  var forecastDiv = $("<div  id='fiveDayForecast'>");
  var forecastHeader = $("<h5 class='card-header border-secondary'>").text(
    "5 Day Forecast"
  );
  forecastDiv.append(forecastHeader);
  var cardDeck = $("<div  class='card-deck'>");
  forecastDiv.append(cardDeck);

  console.log(response);
  for (i = 0; i < 5; i++) {
    var forecastCard = $("<div class='card mb-3 mt-3'>");
    var cardBody = $("<div class='card-body'>");
    var date = new Date();
    var val =
      date.getMonth() +
      1 +
      "/" +
      (date.getDate() + i + 1) +
      "/" +
      date.getFullYear();
    var forecastDate = $("<h5 class='card-title'>").text(val);

    cardBody.append(forecastDate);
    var getCurrentWeatherIcon = response.list[i].weather[0].icon;
    console.log(getCurrentWeatherIcon);
    var displayWeatherIcon = $(
      "<img src = http://openweathermap.org/img/wn/" +
        getCurrentWeatherIcon +
        "@2x.png />"
    );
    cardBody.append(displayWeatherIcon);
    var getTemp = response.list[i].main.temp;
    var tempEl = $("<p class='card-text'>").text("Temp: " + getTemp + "° F");
    cardBody.append(tempEl);
    var getHumidity = response.list[i].main.humidity;
    var humidityEl = $("<p class='card-text'>").text(
      "Humidity: " + getHumidity + "%"
    );
    cardBody.append(humidityEl);
    forecastCard.append(cardBody);
    cardDeck.append(forecastCard);
  }
  $("#forecastContainer").html(forecastDiv);
}

// This function is used to pass the city in the history list to the displayWeather function
function historyDisplayWeather() {
  cityName = $(this).attr("data-name");
  displayWeather();
  displayFiveDayForecast();
  console.log(cityName);
}

$(document).on("click", ".city", historyDisplayWeather);

console.log("test");
