var cityList = $("#city-list");
var searchBtn = $(".search-btn");
var lat = ""
var lon = ""
var APIKey = "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca";

$(".search-btn").on("click", getWeatherData);

function getWeatherData() {
    var inputCity = $('input[name="search-input"]').val();
    if (!inputCity) {
       alert("Please enter a city to search")
       return;
    }
    cityList.append('<li>' + inputCity)
    $('input[name="search-input"]').val("");

    
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca";
    fetch(requestURL)
    .then(function (response) {
        return response.json();
        })
    .then(function (data) {
        console.log(data);
        var lat = data.city.coord.lat;
        var lon = data.city.coord.lon;
        //console.log(lat);
        //console.log(lon);
        // I have repeated myself here to follow the guidelines of the Module
        // however, the first fetch already provides weather forecast and this next fetch is unnecessary :)

        var getWetURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=362ea2014f8c6d8ee9ac4f298c7c1dca";
        fetch(getWetURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
    
    })
}