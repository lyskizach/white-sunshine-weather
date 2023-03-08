var cityList = $(".search-bar");
var searchBtn = $(".search-btn");
var APIKey = "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca";
var currentCity = document.getElementById("current-city");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var listBtn = "";

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
            var buttontxt = document.createTextNode(data.name);
            //var className = data.name;
            button.appendChild(buttontxt);
            button.classList.add("list-btn", data.name);
            cityList.append(button);
            console.log(buttontxt.data);
            listBtn = $(".list-btn");
            listBtn.on("click", displayData);
            
            // sets the large display of current date and local time
            currentCity.textContent = data.name + " - " + newtoday;
            temp.textContent = "Temperature: " + data.main.feels_like + " Degree";
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + "%";
            //saves latitiude and longitude of city name
            localStorage.setItem(data.name + "lat", lat);
            localStorage.setItem(data.name + "lon", lon);
            
        })
        // this sets 5 day forecast
        fetch(getFWetURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        // display data upon click event for saved locations
        function displayData() {
            if(this.target === data.name) {
                console.log("success");
                
            }
        }

    
    })

}





