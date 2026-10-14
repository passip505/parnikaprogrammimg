const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m,rain&timezone=auto&forecast_days=1";

function getWeather() {

    // Variables
    let currentTime = new Date();

    let delhiTime = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hourCycle: "h23"
    }).formatToParts(currentTime);

    let parts = {};

    delhiTime.forEach(part => {
        parts[part.type] = part.value;
    });

    let currentHour =
        parts.year + "-" +
        parts.month + "-" +
        parts.day + "T" +
        parts.hour + ":00";

    // API
    document.getElementById("message").textContent =
        "Loading weather...";

    fetch(weatherURL)

        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            return response.json();
        })

        .then(data => {

            // Find the current hour in Delhi
            let hour = data.hourly.time.indexOf(currentHour);

            if (hour === -1) {
                throw new Error("Current hour not found in forecast");
            }

            let temperature =
                data.hourly.temperature_2m[hour];

            let rain =
                data.hourly.rain[hour];

            // Flow
            if (temperature > 30) {
                console.log("Hot in Delhi.");
            } else {
                console.log("Temperature is comfortable.");
            }

            // DOM manipulation
            document.getElementById("time").textContent =
                "Current Time in Delhi: " +
                parts.hour + ":00";

            document.getElementById("temperature").textContent =
                "Temperature: " + temperature + " °C";

            document.getElementById("rain").textContent =
                "Rain: " + rain + " mm";

            document.getElementById("message").textContent =
                "Weather updated successfully!";

        })

        .catch(error => {

            console.error("Error fetching weather data:", error);

            document.getElementById("message").textContent =
                "Could not load weather. Please try again.";

        });
}

// Function call
getWeather();

// Refresh button
document.getElementById("refresh").addEventListener("click", getWeather);

// Update every minute
setInterval(getWeather, 60000);