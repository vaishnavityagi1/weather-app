// Your API Key
const API_KEY = "8f535d14c8ce03d22e0c051c466c9481";

// Function to fetch current weather from API
function fetchCurrentWeather(city) {
    if (!city || city.trim() === "") {
        alert("Please enter a valid city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const current = data.list[0];
                document.getElementById('city-name').textContent = `City: ${data.city.name}`;
                document.getElementById('temperature').textContent = `Temperature: ${current.main.temp} °C`;
                document.getElementById('weather-description').textContent = `Description: ${current.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${current.main.humidity}%`;
                document.getElementById('wind').textContent = `Wind: ${current.wind.speed} m/s`;
                document.getElementById('error').textContent = "";

                // Generate random 3-day forecast using coordinates
                const forecastData = generateRandomForecast(city, data.city.coord.lat, data.city.coord.lon);
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

// Generate random 3-day forecast
function generateRandomForecast(city, latitude, longitude) {
    if (typeof city !== 'string' || city.trim() === "") {
        throw new Error("Invalid city name. Please provide a valid city.");
    }

    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const forecast = [];
    const date = new Date();

    for (let i = 1; i <= 3; i++) {
        const day = date.getDate() + i;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const temperature = (Math.random() * 35).toFixed(1);
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const humidity = Math.floor(Math.random() * 100);

        forecast.push({
            date: `${month}/${day}/${year}`,
            temperature: `${temperature}°C`,
            condition,
            humidity: `${humidity}%`,
            latitude,
            longitude
        });
    }

    return forecast;
}

// Display forecast in HTML
function displayForecast(forecastData) {
    const container = document.querySelector(".forecast-days");
    container.innerHTML = "";

    forecastData.forEach(day => {
        const card = document.createElement("div");
        card.className = "day-card";
        card.innerHTML = `
            <div class="day-date">${day.date}</div>
            <div class="day-temperature">${day.temperature}</div>
            <div class="day-description">${day.condition}</div>
            <div class="day-humidity">Humidity: ${day.humidity}</div>
        `;
        container.appendChild(card);
    });
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    fetchCurrentWeather(city);
});

// Optional: simulate user location (latitude & longitude)
function getUserLocation() {
    const isLocationAvailable = Math.random() > 0.2; // 80% chance location is available
    if (!isLocationAvailable) {
        throw new Error("Failed to detect location. Geolocation data is unavailable.");
    }
    return {
        latitude: 40.7128,
        longitude: -74.0060
    };
}

// Example usage of random forecast using location
try {
    const location = getUserLocation();
    const city = "New York";
    const forecastData = generateRandomForecast(city, location.latitude, location.longitude);
    console.log(forecastData);
} catch (error) {
    console.error(error.message);
}
