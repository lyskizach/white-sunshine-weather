var cityList = $(".search-bar");
var searchBtn = $(".search-btn");
var APIKey = "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca";
var currentCity = document.getElementById("current-city");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var listBtn = "";
var savedData = "";

saveBtns();
$(".search-btn").on("click", getWeatherData);

function getWeatherData() {
    var inputCity = $('input[name="search-input"]').val();
    if (!inputCity) {
       alert("Please enter a city to search")
       return;
    }
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca" + "&units=imperial";
    fetch(requestURL)
    .then(function (response) {
        if(response.status === 200) {
            $('input[name="search-input"]').val("");
            return response.json();
        }
        else if(response.status !== 200) {
            $('input[name="search-input"]').val("");
            alert("There was an error finding that city, please try again");
        }
        })
    .then(function (data) {
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        var currentWetURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + APIKey + "&units=imperial";
        var getFWetURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + APIKey + "&units=imperial";
// this sets current weather box at top 
        fetch(currentWetURL)
        .then(function (response) {
            return response.json();
        })
        .then(function update (data) {
            d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;
            utc = localTime + localOffset;
            var input = utc + (1000 * data.timezone);
            var today = new Date(input).toString();
            var newtoday = today.replace("GMT-0800 (Pacific Standard Time)", "");
            // appends this button into html element
            var button = document.createElement("button");
            button.textContent = data.name;
            localStorage.setItem("city", data.name);
            button.classList.add("list-btn");
            button.setAttribute("lat", lat);
            button.setAttribute("lon", lon);
            cityList.append(button);
            
            // sets the large display of current date and local time
            currentCity.textContent = data.name + " - " + newtoday;
            temp.textContent = "Temperature: " + data.main.feels_like + " Degree";
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
        })
        // this sets 5 day forecast
        fetch(getFWetURL)
        .then(function (response) {
            return response.json();
        })
        // need to add a reset to clear the data!!
        .then(function (data) {
            for(i=0; i<5; i++) {
                var forecastDay = document.createElement("div");
                forecastDay.classList.add("day");
                //forecastDay.setAttribute("lat", lat);
                var listed = document.createElement("ul");
                forecastDay.append(listed);
                var date = document.createElement("li");
                date.textContent = dayjs().add(i, "day").format("MMM D, YYYY");
                listed.append(date);
                var temp = document.createElement("li");
                temp.textContent = "Temp: " + data.list[8*i].main.temp + "'F";
                listed.append(temp);
                var wind = document.createElement("li");
                wind.textContent = "Wind: " + data.list[8*i].wind.speed + "mph";
                listed.append(wind);
                var humidity = document.createElement("li");
                humidity.textContent = "Humidity: " + data.list[8*i].main.humidity + "%";
                listed.append(humidity);
                $(".five-day-forecast").append(forecastDay);
            }
        })
        
    
    })

}

// displays data upon click event for saved location
function savedWeather(event) {
    var lat = event.target.getAttribute("lat");
    var lon = event.target.getAttribute("lon");
    var getFWetURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + APIKey + "&units=imperial";
    var currentWetURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + APIKey + "&units=imperial";
        fetch(currentWetURL)
        .then(function (response) {
             return response.json();
        })
        .then(function update (data) {
            d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;
            utc = localTime + localOffset;
            var input = utc + (1000 * data.timezone);
            var today = new Date(input).toString();
            var newtoday = today.replace("GMT-0800 (Pacific Standard Time)", "");
            currentCity.textContent = data.name + " - " + newtoday;
            temp.textContent = "Temperature: " + data.main.feels_like + " Degree";
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
         })
         fetch(getFWetURL)
        .then(function (response) {
            return response.json();
        })
        // need to add a reset to clear the data!!
        // use attribute to check if the div already exists?
        .then(function (data) {
            for(i=0; i<5; i++) {
                var forecastDay = document.createElement("div");
                forecastDay.classList.add("day");
                var listed = document.createElement("ul");
                forecastDay.append(listed);
                var date = document.createElement("li");
                date.textContent = dayjs().add(i, "day").format("MMM D, YYYY");
                listed.append(date);
                var temp = document.createElement("li");
                temp.textContent = "Temp: " + data.list[8*i].main.temp + "'F";
                listed.append(temp);
                var wind = document.createElement("li");
                wind.textContent = "Wind: " + data.list[8*i].wind.speed + "mph";
                listed.append(wind);
                var humidity = document.createElement("li");
                humidity.textContent = "Humidity: " + data.list[8*i].main.humidity + "%";
                listed.append(humidity);
                $(".five-day-forecast").append(forecastDay);
            }
        })
}
// access the local storage and create buttons upon inital load or refresh
function saveBtns() {
    var city = localStorage.getItem("city");
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca" + "&units=imperial";
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        var currentWetURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + APIKey + "&units=imperial";
        fetch(currentWetURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var button = document.createElement("button");
            button.setAttribute("lat", lat);
            button.setAttribute("lon", lon);
            button.textContent = data.name;
            localStorage.setItem("city", data.name);
            button.classList.add("list-btn");
            button.setAttribute("lat", lat);
            button.setAttribute("lon", lon);
            cityList.append(button);
            listBtn = $(".list-btn");
            listBtn.on("click", savedWeather);
        })
    })
}
