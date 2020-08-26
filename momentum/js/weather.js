const weatherHTML = document.querySelector('.js-weather');

const WEATHER_API_KEY = '2c86b5e6c3f717a8696ad85e1a858e3d';
const COORDS = 'coords';

function getWeather(lat, lon)
{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(json => {
        const temperature = json.main.temp;
        const place = json.name;
        weatherHTML.innerHTML = `${Math.floor(temperature)}º @ ${place}`;
    });
}

function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // have to stringify to save js object
}

function handleGeoSuccess(position)
{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // same latitude: latitude
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError()
{
    console.error(`Can't access current position`);
}

function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords()
{
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null)
    {
        askForCoords();
    }
    else
    {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();