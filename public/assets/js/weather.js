const apiKey = 'fd32cf128ce55e41a5155af66db8e54b';
const units = 'imperial'; // 'imperial' for Fahrenheit, 'metric' for Celsius

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error fetching weather data: ${response.statusText}`);
            return;
        }

        const data = await response.json();

        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = `${data.main.temp}°F`;
        document.getElementById('description').textContent = data.weather[0].description;
    } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
    }
}

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value;
    if (cityInput) {
        fetchWeather(cityInput);
    } else {
        alert('Please enter a city name');
    }
});
