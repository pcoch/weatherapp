import moment from 'moment';

//adding event listeners on load
window.onload = () => {
    getToDayWeather();

    //event listener for enter
    const input = document.getElementById('input');
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            getToDayWeather();
        }
    });

};

//todays weather
async function getToDayWeather () {

    try {
    //input location
    let inputLocation = document.getElementById('input').value;

    //setting location default to Brisbane
    if (inputLocation == '') {
         inputLocation = 'Brisbane'
    };

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=2b86b59c4b088c1efe2e48f7ca5acfc3&units=metric`, {mode: 'cors'});
    const weatherData = await response.json();
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    const weatherDesc = weatherData.weather[0].description;
    const weather = weatherData.weather[0].main;
    const date = moment().format('dddd, Do MMMM');
    const location = weatherData.name;
    const min = weatherData.main.temp_min;
    const max = weatherData.main.temp_max;
    console.log(weatherData)

    //update html elements
    const locationEl = document.getElementById('location');
    const tempEl = document.getElementById('temp');
    const weatherEl = document.getElementById('weather');
    const weatherImg = document.getElementById('weather-img');
    const dateEl = document.getElementById('date');
    const windEl = document.getElementById('wind');
    const humidityEl = document.getElementById('humidity');
    const minMaxEl = document.getElementById('minmax');
    const degreeEl = document.querySelector('.degree')

    tempEl.innerHTML = Math.round(temp);
    weatherEl.innerHTML = weatherDesc;
    dateEl.innerHTML = date;
    degreeEl.innerHTML = '&#xb0;';
    locationEl.innerHTML = location;
    windEl.innerHTML = `${Math.round(wind)} km/h`;
    humidityEl.innerHTML = `${humidity} %`;
    minMaxEl.innerHTML = `${Math.round(min)}&#xb0; / ${Math.round(max)}&#xb0;`

    //injecting images on load
    //insert pin icon next to city name
    const localDiv = document.querySelector(".location-city");
    const img = document.createElement("img");
    img.setAttribute("id","pin");
    if (img.id != "pin" || localDiv.children.length == 1) {
    localDiv.prepend(img);
    img.src = "/assets/location.png";
    };

    //render weather image
    const background = document.querySelector('.container-top');

    switch (weather) {
        case 'Clear':
        weatherImg.src = '/assets/sunny.png';
        break;

        case 'Clouds':
        if (weatherDesc == 'overcast clouds') {
            weatherImg.src = '/assets/overcast-clouds.png';
        } else weatherImg.src = '/assets/scatteredclouds.png';
        break;

        case 'Drizzle':
         weatherImg.src = '/assets/light-rain.png';
        break;

        case 'Rain':
        backgroundweatherImg.src = '/assets/moderate-rain.png';
        break;

        case 'Thunderstorm':
        weatherImg.src = '/assets/thunderstorms.png';
        break;

        case 'Tornado':
            weatherImg.src = '/assets/tornado.png';
        break;

        case 'Haze':
            weatherImg.src = '/assets/foggy.png';
        break;

        case 'Mist':
            weatherImg.src = '/assets/foggy.png';
        break;

        case 'Snow':
            weatherImg.src = '/assets/snow.png';
        break;
    }

    } catch (error) {
        let inputLocation = document.getElementById('input').value;
        alert(`${inputLocation} is not a valid city. Please check the spelling and try again.`);
    }
};

//features to add
//if it's night time, show dark background

//bugs to fix
//random reload

