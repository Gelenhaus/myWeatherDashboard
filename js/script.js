var myArray = [];
var myFiveArray = [];
var theWholeThing = document.body;
var whereToPutWeather = document.querySelector('#whereToPlace');
var whereToPutOldCities = document.querySelector('#oldCities');
var windspeed = 0;
var typedInCityEl = document.querySelector('#typedInCity');
var submitButtonEl = document.querySelector('#submitButtonId');

var gettingCitiesFunction = function () {
    whereToPutWeather.textContent = "";

    var typedInContent = typedInCityEl.value;

    // Store
    localStorage.setItem("cityName", typedInContent);




    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + typedInContent + "&units=imperial&appid=d39be77cf7aaa059d24bf872ae34d526";

    fetch(apiUrl)
        .then(response => {
            return response.json();
        }).then(data => {
            myArray = data;
            // console.log(myArray);

            var mahIcon = myArray.weather[0].icon;
            // console.log(mahIcon);
            //figure out how to display the icon for the weather here.
            weatherAttributes = "Your selected city of " + myArray.name + " Has a wind speed of " + myArray.wind.speed + " with a temperature of " + myArray.main.temp + " fahrenheit " + " With " + myArray.main.humidity + "% humidity";

            const iconImage = document.createElement('img');
            iconImage.src = 'http://openweathermap.org/img/wn/' + mahIcon + '@2x.png';

            var space = document.createElement('div');
            space.innerHTML = "<br></br>";
            var newAddition = document.createElement('div');
            var todayTitle = document.createElement('h1');
            todayTitle.textContent = "TODAYS WEATHER";
            newAddition.textContent = weatherAttributes;
            whereToPutWeather.appendChild(todayTitle);
            whereToPutWeather.appendChild(iconImage);
            whereToPutWeather.appendChild(newAddition);
            whereToPutWeather.appendChild(space);
        })
}

var gettingFiveDay = function () {
    var typedInCity = typedInCityEl.value;
    var apiFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + typedInCity + "&appid=e9bf4eae67ac379ae2322ee990868590";

    fetch(apiFiveDay)
        .then(response => {
            return response.json();
        }).then(info => {

            myFiveArray = info;
            // console.log(dahIcon);
            console.log(myFiveArray);
            // console.log(myFiveArray.list[0].weather[0].main);
            var fiveDayTitle = document.createElement('h1');
            fiveDayTitle.textContent = "Five Day Forecast";
            whereToPutWeather.appendChild(fiveDayTitle);

            for (var i = 1; i < 39; i += 8) {
                var dahIcon = myFiveArray.list[i].weather[0].icon;
                // console.log(i);
                // console.log(dahIcon);

                const icons = document.createElement('img');
                icons.src = 'http://openweathermap.org/img/wn/' + dahIcon + '@2x.png';
                whereToPutWeather.appendChild(icons);

                var theWeatherWillBe = " Temperature: " + myFiveArray.list[i].main.temp + " Wind Speed: " + myFiveArray.list[i].wind.speed + " Humidity: " + myFiveArray.list[i].main.humidity;
                // console.log(theWeatherWillBe);
                var fiveDaysOWeather = document.createElement('div');
                fiveDaysOWeather.textContent = theWeatherWillBe;
                whereToPutWeather.appendChild(fiveDaysOWeather);
            }
        });
};

submitButtonEl.addEventListener("click", () => {
    gettingCitiesFunction();
    gettingFiveDay();
});



