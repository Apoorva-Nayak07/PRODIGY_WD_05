const apiKey = "b6d00912e07c46fab359c6665d380c7b"; 

function getWeatherByCity() {
    const city = document.getElementById("city-input").value;
    if (city) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    } else {
        alert("Please enter a city name.");
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        }, () => {
            alert("Geolocation access denied. Please enter a city manually.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert("City not found. Please enter a valid city name.");
            }
        })
        .catch(error => alert("Error fetching weather data."));
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weather-result");
    const iconCode = data.weather[0].icon; 
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 

    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>🌤 Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

