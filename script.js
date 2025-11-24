// Your API Key
const API_KEY = "8f535d14c8ce03d22e0c051c466c9481";

// Function to fetch current weather data
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === "200") {
                // Display current weather (first forecast item)
                const current = data.list[0];
                document.getElementById('city-name').textContent = `City: ${data.city.name}`;
                document.getElementById('temperature').textContent = `Temperature: ${current.main.temp} °C`;
                document.getElementById('weather-description').textContent = `Description: ${current.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${current.main.humidity}%`;
                document.getElementById('wind').textContent = `Wind: ${current.wind.speed} m/s`;
                document.getElementById('error').textContent = "";

                // Generate 3-day forecast
                const forecastData = generateWeatherForecast();
                displayForecast(forecastData);
            } else {
                document.getElementById('error').textContent = "City not found!";
            }
        })
        .catch(err => {
            document.getElementById('error').textContent = "Error fetching data";
            console.error(err);
        });
}

// Function to generate random 3-day forecast
function generateWeatherForecast() {
    const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const forecast = [];
    const currentDate = new Date();

    for (let i = 1; i <= 3; i++) { // Next 3 days
        const day = currentDate.getDate() + i;
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const temperature = (Math.random() * 35).toFixed(1); // 0°C to 35°C
        const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const humidity = Math.floor(Math.random() * 100);

        forecast.push({
            date: `${month}/${day}/${year}`,
            temperature: `${temperature}°C`,
            condition,
            humidity: `${humidity}%`
        });
    }

    return forecast;
}

// Function to display forecast in HTML
function displayForecast(forecastData) {
    const forecastContainer = document.querySelector(".forecast-days");
    forecastContainer.innerHTML = ""; // Clear previous forecast

    forecastData.forEach(day => {
        const card = document.createElement("div");
        card.className = "day-card";
        card.innerHTML = `
            <div class="day-date">${day.date}</div>
            <div class="day-temperature">${day.temperature}</div>
            <div class="day-description">${day.condition}</div>
            <div class="day-humidity">Humidity: ${day.humidity}</div>
        `;
        forecastContainer.appendChild(card);
    });
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if(city === "") {
        alert("Please enter a city name");
        return;
    }
    fetchWeatherData(city);
});
