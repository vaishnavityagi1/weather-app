// Your API Key (replace YOUR_API_KEY with actual key)
const API_KEY ="8f535d14c8ce03d22e0c051c466c9481"

// Function to fetch weather data
function fetchWeatherData(city) {
    // OpenWeatherMap API URL for forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === "200") {
                // Display first forecast (current weather approximation)
                const current = data.list[0];
                document.getElementById('city-name').textContent = `City: ${data.city.name}`;
                document.getElementById('temperature').textContent = `Temperature: ${current.main.temp} °C`;
                document.getElementById('weather-description').textContent = `Description: ${current.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${current.main.humidity}%`;
                document.getElementById('wind').textContent = `Wind: ${current.wind.speed} m/s`;
                document.getElementById('error').textContent = "";
            } else {
                document.getElementById('error').textContent = "City not found!";
            }
        })
        .catch(err => {
            document.getElementById('error').textContent = "Error fetching data";
            console.error(err);
        });
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if(city === "") {
        alert("Please enter a city name");
        return;
    }
    fetchWeatherData(city);
});



