//Html elements
let todayWeather = document.querySelector(".today-weather");
let tomorrowWeather = document.querySelector(".tomorrow-weather");
let dayAfterTomorrow = document.querySelector(".day-after-tomorrow ");
let links = document.querySelectorAll(".navbar-nav .nav-item a")
let searchInput = document.querySelector(".locationInput")
let findButton = document.querySelector(".findButton")
let weatherContainer ;
let userLocation;
//app variables
const today = new Date();
//functions

// get today weather data
async function getTodayWeather(country) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=ed126743c00445e59ba113400241210&q=${country}`);
    const data = await response.json();
    
    let { location, current } = data;
    const date = new Date(location.localtime);
    
    displayTodayWeather(location, current, date);
};


function displayTodayWeather(location, current, date) {
    const weatherContainer = 
        `
        <div class="weather-header  d-flex justify-content-between align-items-center px-3  py-2 fw-light text-center">
            <div class="day ">${today.toLocaleString("en-us", { weekday: "long" })}</div>
            <div class="date  "><p><span>${date.getDate()}</span> ${date.toLocaleString("default", { month: "long" })}</p></div>
        </div>
        <div class="content mt-3 ">
            <div class="mb-3 px-4 fw-light ">
                <p>${location.name},</p>
            </div>
            <div class="degree d-flex flex-column justify-content-center align-items-start  px-5">
                <h2 class="display-6 ">${Math.round(current.temp_c)}<sup>o</sup>C</h2>
                <img class="w-25" src="https://${current.condition.icon}" alt="weather icon">
            </div>
            <div class="weather-state my-2 px-4 fw-light ">
            <p class="text-primary">${current.condition.text}</p>
            </div>
        </div>
        <div class="icons d-flex px-3 py-2 mb-0 gap-4 text-secondary">
            <p class="m-0">
                <i class="fa-solid fa-umbrella me-1 fs-5"></i>
                <span>${current.humidity}%</span>
            </p>
            <p class="m-0">
                <i class="fa-solid fa-wind me-1 fs-5"></i><span>${current.wind_kph} km / h</span>
            </p>
            <p class="m-0">
                <i class="fa-regular fa-compass me-1 fs-5"></i><span>${current.wind_dir}</span>
            </p>
        </div>
        `;
    
    todayWeather.innerHTML = weatherContainer;
};

// get tomorrow weather data
async function getTomorrowWeather(country) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ed126743c00445e59ba113400241210&days=3&q=${country}`
    );
    const data = await response.json();
    let { location, current, forecast } = data;
    const date = new Date(forecast.forecastday[1].date);
    displayTomorrowWeather(location, current, forecast, date);
}

function displayTomorrowWeather(location, current, forecast, date) {
    const weatherContainer = 
       `
        <div class="weather-header text-center fw-light  p-2 ">
            <p class="day">${date.toLocaleString("en-us", { weekday: "long" })}</p>
        </div>
        <div class="content d-flex flex-column justify-content-center align-items-center py-3">
            <img class="w-25" src="https://${current.condition.icon}" alt="weather icon">
            <div class="degree d-flex flex-column justify-content-center align-items-start px-5">
                <h2 class="display-6">${Math.round(forecast.forecastday[1].day.maxtemp_c)}<sup>°</sup>C</h2>
                <p>${Math.round(forecast.forecastday[1].day.mintemp_c)}<sup>°</sup>C</p>
            </div>
            <div class="weather-state my-1 px-4 fw-light ">
                <p class="text-primary">${forecast.forecastday[1].day.condition.text}</p>
            </div>
        </div>
        `;
    
    tomorrowWeather.innerHTML = weatherContainer;
}



// get day after tomorrow weather data
async function getDayAfterTomorrowWeather(country) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ed126743c00445e59ba113400241210&days=3&q=${country}`
    );
    const data = await response.json();
    let { location, current, forecast } = data;
    const date = new Date(forecast.forecastday[2].date);
    displayDayAfterTomorrowWeather(location, current, forecast, date);
}

function displayDayAfterTomorrowWeather(location, current, forecast, date) {
    const weatherContainer = 
       `
        <div class="weather-header text-center fw-light  p-2 ">
            <p class="day">${date.toLocaleString("en-us", { weekday: "long" })}</p>
        </div>
        <div class="content d-flex flex-column justify-content-center align-items-center py-3 ">
            <img class="w-25" src="https://${current.condition.icon}" alt="weather icon">
            <div class="degree d-flex flex-column justify-content-center align-items-start px-5">
                <h2 class="display-6">${Math.round(forecast.forecastday[2].day.maxtemp_c)}<sup>°</sup>C</h2>
                <p>${Math.round(forecast.forecastday[2].day.mintemp_c)}<sup>°</sup>C</p>
            </div>
            <div class="weather-state my-1 px-4 fw-light ">
                <p class="text-primary">${forecast.forecastday[1].day.condition.text}</p>
            </div>
        </div>
        `;
    
    dayAfterTomorrow.innerHTML = weatherContainer;
};




getTodayWeather("Luxor");
getTomorrowWeather("Luxor");
getDayAfterTomorrowWeather("Luxor")




//events
// loop through navbar links to add event for them
for (let i = 0 ; i< links.length ; i++){
    links[i].addEventListener("click" , function(e){
        let activeLink = document.querySelector(".navbar-nav .active");
        activeLink.classList.remove("active");
        e.target.classList.add("active");

    })
}

// add input event for search input
searchInput.addEventListener("input", function (e) {
    if (e.target.value == "") {
        console.log("plz leave your country") 
    } else {
      let countryValue = e.target.value;
      getTodayWeather(countryValue);
      getTomorrowWeather(countryValue);
      getDayAfterTomorrowWeather(countryValue);
    }
  });


// get user location
findButton.addEventListener("click" , function(){
    navigator.geolocation.getCurrentPosition(
        data=>
         {console.log(data)})
})






