const weatherForm = document.querySelector('form');
const message = document.querySelector('#success-data');
const spinner = document.querySelector('.spinner');
const headerLocation = document.querySelector('#headerLocation');
const imageIcon = document.querySelector('.img-weather');
const card = document.querySelector('.weather-forecast');
const cardLocation = document.querySelector('.card-title');
const cardCurrentWeather = document.querySelector('.card-text');
const cardTemperature = document.querySelector('.btn-temperature');
const weather_icons = document.getElementById("myImg");
const more_info_btn = document.querySelector('.more-info');
const add_more_section = document.querySelector('.add-more-section');
const loading_add_more_section  = document.querySelector('.loading-add-more-section')
const welcome_text = document.querySelector('.welcome-text');
loading_add_more_section.style.display = 'none';
more_info_btn.style.display = 'none';

spinner.style.display = 'none';
card.style.display = 'none';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
     address = document.querySelector('.input-search').value;
    spinner.style.display = 'block';
    //MApBox API to fetch latitude and longitude of the location 
    const mapBoxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGV0ZXJraGFsa28iLCJhIjoiY2ttdGs2dzd6MG0zZzJ4bXdoMDN4dzA1dSJ9.4c4TWb36ppF28TxW6jGBVQ';
    fetch(mapBoxApiUrl).then((response) => {
        response.json().then((data) => {
            if (data.features.length === 0) {
                setTimeout(() => {
                    card.style.display = 'block';
                    cardLocation.innerHTML = `Unable to find : ${address}`;
                    cardTemperature.style.display = 'none';
                    weather_icons.style.display = 'none';
                    cardCurrentWeather.textContent = '';
                    spinner.style.display = 'none';

                }, 1000);

            } else {
                const latitude = data.features[0].center[1];
                const longitude = data.features[0].center[0];
                const location = data.features[0].place_name;
                //calling weather report fetching function
                weatherForecast(latitude, longitude, location, data);
            }
        })
    })
})

const weatherForecast = (latitude, longitude, location, locationData) => {
    //WeatherStack API to fetch weather report of latitude and logitude passed locatio n
    const WeatherAPIurl = 'http://api.weatherstack.com/current?access_key=c0d0059e862ce0aab4dc31d0669d666c&query=' + latitude + ',' + longitude;
    fetch(WeatherAPIurl).then((response) => {
        response.json().then((body) => {
            weatherBody = body;
            setTimeout(() => {
                more_info_btn.innerText = `More on ${address}`
                more_info_btn.style.display = 'block';
                weather_icons.src = body.current.weather_icons;
                card.style.display = 'block';
                cardTemperature.style.display = 'block';
                cardLocation.innerHTML = location;
                cardCurrentWeather.innerHTML = 'Its ' + body.current.weather_descriptions + ' in there';
                cardTemperature.innerHTML = `Temperature: <b>${body.current.temperature} &#8451; `;
                spinner.style.display = 'none';
            }, 1000);
        })
    })
}

more_info_btn.addEventListener('click', () => {
    card.style.display = 'none';
    welcome_text.style.display = 'none';
    loading_add_more_section.style.display = 'block';
    setTimeout(() => {
        loading_add_more_section.style.display = 'none';
        add_more_section.innerHTML = '';
        let originalWeatherArray = [
            weatherBody.request.type,
            weatherBody.location.country,
            weatherBody.location.region,
            weatherBody.location.timezone_id,
            weatherBody.location.lat,
            weatherBody.location.lon,
            weatherBody.location.localtime,
            weatherBody.current.observation_time,
            weatherBody.current.wind_speed,
            weatherBody.current.wind_degree,
            weatherBody.current.wind_dir,
            weatherBody.current.pressure,
            weatherBody.current.humidity,
            weatherBody.current.cloudcover,
            weatherBody.current.feelslike,
            weatherBody.current.uv_index,
            weatherBody.current.is_day,
            weatherBody.location.region,
        ]
        var upperWeatherArray = String.prototype.toUpperCase.apply(originalWeatherArray).split(",");
        originalWeatherArray = upperWeatherArray;
        const p = document.createElement('p');
        p.className = 'slide-in-up';
        p.innerHTML = "Your Search location is:  " + address.toUpperCase() + ".<br /><br />"
            + address.toUpperCase() + " is situated in region " + originalWeatherArray[17] + " and country " + originalWeatherArray[1] + ".<br /><br />"
            + " The time Zone here is  " + originalWeatherArray[3] + ".<br /><br />"
            + " Currently it is " + weatherBody.current.temperature + "&#8451;" + " but, it feels like " + originalWeatherArray[14] + "&#8451;" + ".<br /><br />"
            + "Latitude: " + weatherBody.location.lat + ".<br />"
            + "Logitude: " + weatherBody.location.lon + ".<br /><br />"
            + "Local Time: " + weatherBody.location.localtime + ".<br /><br />"
            + "weather Observation time: " + weatherBody.current.observation_time + ".<br /><br />"
            + "Wind speed: " + weatherBody.current.wind_speed + "mph" + ".<br /><br />"
            + "Wind degree: " + weatherBody.current.wind_degree + "&#176;" + "<br /><br />"
            + "Wind direction: " + originalWeatherArray[10] + "<br /><br />"
            + "Air pressure: " + weatherBody.current.pressure + " atm" + "<br /><br />"
            + "Humidity: " + weatherBody.current.humidity + " g.m<sup>-3</sup>" + "<br /><br />"
            + "Cloud cover: " + weatherBody.current.cloudcover + " oktas" + "<br /><br />"
            + "UV index: " + weatherBody.current.uv_index + "<br /><br />"
            + "Currently is it day ?: " + originalWeatherArray[16] + "<br />"
    
        add_more_section.append(p);
    }, 5000);
    

})


