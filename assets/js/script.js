const apiKey = "6db35a7c1d7e41c02d39de4643d89022"

var search = document.querySelector("#srch-btn");
var cityName = document.querySelector("#city-srch-input");
var searchedCities = [];

$(document).ready(function () {
    getSearchHistory();
})

function getSearchHistory() {

    $(".list-group").empty();
    searchedCitiesString = localStorage.getItem("searchedCities");

    searchedCities = JSON.parse(searchedCitiesString);
    if (searchedCities === null) {
        searchedCities = [];
    }
    console.log(searchedCities);

    for (var i = searchedCities.length - 1; i >= 0; i--) {
        var list = document.createElement('li');
        list.setAttribute('class', "list-group-item list-group-item-action");
        list.setAttribute('Onclick', 'research(this)');
        list.setAttribute('value', searchedCities[i]);
        list.innerText = searchedCities[i];
        recentSearches.appendChild(list);
    }
};

// Current Weather Scetion
var getWeather = function (e) {
    var cityName = document.querySelector("#city-srch-input").value;
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + apiKey)
        .then(r => r.json())
        .then(function (data) {



            //declared variables
            var temp = document.querySelector("#temperature")
            var humidity = document.querySelector("#humidity")
            var windSpeed = document.querySelector("#wind-speed")
            var cityName = document.querySelector("#city-name")
            var crntImg = document.querySelector("#current-img")

            // Current Weather Section
            $("#city-name").text(data.city.name);
            $("#current-img").attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
            $("#temperature").text("Temperature: " + data.list[0].main.temp + " \u00b0F");
            $("#humidity").text("Humidity: " + data.list[0].main.humidity + " %");
            $("#wind-speed").text("Wind Speed " + data.list[0].wind.speed + " MPH");

            var coordLat = data.city.coord.lat;
            var coordLon = data.city.coord.lon;

            var apiUrlUVIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coordLat + "&lon=" + coordLon + "&appid=" + "6db35a7c1d7e41c02d39de4643d89022";

            fetch(apiUrlUVIndex)
                .then(response => response.json())
                .then(function (data) {
                    var uvIndex = data.value;

                    if (uvIndex <= 2) {
                        $(".badge-success").text("UV Index: " + uvIndex);
                        $(".badge-danger").hide();
                        $(".badge-success").show();
                        $(".badge-warning").hide();
                    } else if (uvIndex > 2 && uvIndex <= 5) {
                        $(".badge-warning").text("UV Index: " + uvIndex);
                        $(".badge-danger").hide();
                        $(".badge-success").hide();
                        $(".badge-warning").show();
                    } else if (uvIndex > 5) {
                        $(".badge-danger").text("UV Index: " + uvIndex);
                        $(".badge-danger").show();
                        $(".badge-success").hide();
                        $(".badge-warning").hide();
                    }
                })

        })

    var day5Api = ("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + apiKey)

    fetch(day5Api)

        .then(r => r.json())
        .then(function (data) {


            $("#date-1").text(data.list[4].dt_txt)
            $("#icon-1").attr("src", "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png");
            $("#temp-1").text("Temp: " + data.list[4].main.temp + "\u00b0F")
            $("#hum-1").text("Humidity: " + data.list[4].main.humidity + " %");

            $("#date-2").text(data.list[12].dt_txt)
            $("#icon-2").attr("src", "http://openweathermap.org/img/w/" + data.list[12].weather[0].icon + ".png");
            $("#temp-2").text("Temp: " + data.list[12].main.temp + "\u00b0F")
            $("#hum-2").text("Humidity: " + data.list[12].main.humidity + " %");

            $("#date-3").text(data.list[20].dt_txt)
            $("#icon-3").attr("src", "http://openweathermap.org/img/w/" + data.list[20].weather[0].icon + ".png");
            $("#temp-3").text("Temp: " + data.list[20].main.temp + "\u00b0F")
            $("#hum-3").text("Humidity: " + data.list[20].main.humidity + " %");

            $("#date-4").text(data.list[28].dt_txt)
            $("#icon-4").attr("src", "http://openweathermap.org/img/w/" + data.list[28].weather[0].icon + ".png");
            $("#temp-4").text("Temp: " + data.list[28].main.temp + "\u00b0F")
            $("#hum-4").text("Humidity: " + data.list[28].main.humidity + " %");

            $("#date-5").text(data.list[36].dt_txt)
            $("#icon-5").attr("src", "http://openweathermap.org/img/w/" + data.list[36].weather[0].icon + ".png");
            $("#temp-5").text("Temp: " + data.list[36].main.temp + "\u00b0F")
            $("#hum-5").text("Humidity: " + data.list[36].main.humidity + " %")

        })

}

//search.onclick = getWeather;

$("#srch-btn").on("click", function (event) {
    event.preventDefault();

    if ($("#city-srch-input").val() != "") {

        city = $("#city-srch-input").val();


        searchedCities.push(city);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

        getSearchHistory();

        getWeather();
    }

    $("#city-srch-input").val("");

});








