var search = document.querySelector("#srch-btn");


//Load API Data
var getWeather = function (e) {
    var cityName = document.querySelector("#city-srch-input").value;
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6db35a7c1d7e41c02d39de4643d89022")
        .then(r => r.json())
        .then(function (weather) {
            console.log(weather)
        })
        
}
search.onclick = getWeather;

