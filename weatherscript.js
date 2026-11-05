
 // API URL
// const = JavaScript keyword; weatherURL = user-defined variable.
const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&current=temperature_2m,rain&timezone=Asia%2FKolkata";


// MAIN FUNCTION
// function = JavaScript keyword; getWeather = user-defined function.

function getWeather() {

    // DOM: document object, getElementById() method, textContent property.
    document.getElementById("message").textContent =
        "Loading weather...";


    // FETCH API
    // fetch() = built-in browser function; returns a Promise.

    fetch(weatherURL)

        // then() = Promise method.
        // response = user-defined parameter; Response object is supplied by fetch.

        .then(function(response) {

            // ok = Response property; ! = NOT operator.
            // throw = JavaScript keyword; Error = built-in constructor.

            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            // json() = Response method; return = JavaScript keyword.
            return response.json();
        })


        // SECOND THEN
        // data = user-defined parameter containing parsed API data.

        .then(function(data) {

            // currentWeather = user-defined variable.
            // current = property provided by the API.

            let currentWeather = data.current;


            // time = user-defined variable.
            // time = API property; slice() = built-in string method.

            let time = currentWeather.time.slice(11, 16);


            // temperature_2m = API property.
            let temperature = currentWeather.temperature_2m;


            // rain = API property.
            let rain = currentWeather.rain;


            // CONDITIONAL STATEMENT
            // if/else = JavaScript keywords; > = comparison operator.
            // console.log() = built-in console method.

            if (temperature > 30) {
                console.log("Hot in Delhi.");
            } else {
                console.log("Temperature is comfortable.");
            }


            // DOM MANIPULATION
            // getElementById() = DOM method; textContent = DOM property.
            // + = string concatenation operator.

            document.getElementById("time").textContent =
                "Current Time in Delhi: " + time;

            document.getElementById("temperature").textContent =
                "Temperature: " + temperature + " °C";

            document.getElementById("rain").textContent =
                "Rain: " + rain + " mm";


            // SUCCESS MESSAGE
            document.getElementById("message").textContent =
                "Weather updated successfully!";

        })


        // ERROR HANDLING
        // catch() = Promise method; error = user-defined parameter.

        .catch(function(error) {

            // console.error() = built-in console method.

            console.error("Error fetching weather data:", error);

            document.getElementById("message").textContent =
                "Could not load weather. Please try again.";

        });

} // End of getWeather function.


// FUNCTION CALL
getWeather();


// REFRESH BUTTON
// addEventListener() = DOM method; "click" = event type.

document.getElementById("refresh").addEventListener("click", getWeather);


// AUTOMATIC UPDATE
// setInterval() = built-in browser function.
// 60000 = milliseconds (one minute).

setInterval(getWeather, 60000);
