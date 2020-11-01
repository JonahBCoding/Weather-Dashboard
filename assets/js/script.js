var search = document.querySelector("#srch-btn");


//Load API Data
var getWeather = function (e) {
    var cityName = document.querySelector("#city-srch-input").value;
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=6db35a7c1d7e41c02d39de4643d89022")
        .then(r => r.json())
        .then(function (data) {

            console.log(data)
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

            console.log(coordLat, coordLon)


            console.log(document.querySelector("#temperature"))
            console.log(document.querySelector("#humidity"))
            console.log(document.querySelector("#wind-speed"))
            console.log(document.querySelector("#city-name"))
            console.log(document.querySelector("#current-img"))
        })

}
search.onclick = getWeather;

