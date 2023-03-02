var cityList = $("#city-list");
var searchBtn = $(".search-btn");

function Search(event) {
    event.preventDefault();
    var inputCity = $('input[name="search-input"]').val();
    if (!inputCity) {
       alert("Please enter a city to search")
       return;
    }
    cityList.append('<li>' + inputCity)
    $('input[name="search-input"]').val("");
}
searchBtn.on("click", Search);

function getAPI() {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={362ea2014f8c6d8ee9ac4f298c7c1dca}";
    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then
}