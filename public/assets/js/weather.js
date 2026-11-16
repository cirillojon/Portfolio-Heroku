const apiKey = 'fd32cf128ce55e41a5155af66db8e54b';
const units = 'imperial'; // 'imperial' for Fahrenheit, 'metric' for Celsius

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error fetching weather data: ${response.statusText}`);
            showWeatherError(response.status === 404 ? 'City not found.' : 'Weather is currently unavailable.');
            return;
        }

        const data = await response.json();

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = `${data.main.temp}°F`;
        document.getElementById('description').textContent = data.weather[0].description;
    } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
        showWeatherError('Weather is currently unavailable.');
    }
}

function showWeatherError(message) {
    document.getElementById('city-name').textContent = message;
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = '';
}

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value;
    if (cityInput) {
        fetchWeather(cityInput);
    } else {
        alert('Please enter a city name');
    }
});
