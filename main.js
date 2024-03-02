const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');

const cityName = document.querySelector('h2.city');
const img = document.querySelector('img');
const temperature = document.querySelector('p.temp');
const weatherDescription = document.querySelector('p.weather_description');

const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const wind_speed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=5d92b21ec429a07a6e65f29c115f2597'
const API_UNITS = '&units=metric'
const API_LANG = '&lang=pl'

function getWeather (){
    const API_CITY = input.value;
    const URL = API_LINK + API_CITY + API_KEY + API_UNITS + API_LANG
    axios.get(URL)
        .then(response => {
            // handle success
            weatherDescription.classList.add('color');
            
            errorMessage.textContent = ''
            cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
            img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            temperature.textContent = `${Math.round(response.data.main.temp)}C`;
            weatherDescription.textContent = `${response.data.weather[0].description}`;
            feelsLike.textContent = `${response.data.main.feels_like}`;
            pressure.textContent = `${response.data.main.pressure}hPA`;
            humidity.textContent = `${response.data.main.humidity}%`;
            wind_speed.textContent = `${Math.round(response.data.wind.speed*3.6)}km/h`;
            clouds.textContent = `${response.data.clouds.all}`;
        })
        .catch(error => {
            // handle error
            weatherDescription.classList.remove('color');

            errorMessage.textContent = `${error.response.data.message}`;
            [cityName, temperature, weatherDescription, feelsLike, pressure, humidity, 
            wind_speed, clouds].forEach(element => {
                element.textContent = '';
            });
            img.src = '';
        })
        .finally(function () {
            // always executed
            input.value = '';
        });
    // console.log(URL)
}
button.addEventListener('click', getWeather)

const getWeatherByEnter = e => {
    if (e.key === 'Enter') {
        getWeather();
    }
}


input.addEventListener('keypress', getWeatherByEnter);