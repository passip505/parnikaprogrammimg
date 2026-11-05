// const: predefined JavaScript keyword.
// weatherURL: user-defined variable name.
// "..." : string literal.

const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&current=temperature_2m,rain&timezone=Asia%2FKolkata";


// function: predefined JavaScript keyword.
// getWeather: user-defined function name.
// (): parameter list, currently empty.

function getWeather() {

    // document: browser-provided global object.
    // getElementById(): built-in DOM method.
    // "message": string argument, matching an HTML ID.
    // textContent: DOM property.

    document.getElementById("message").textContent =
        "Loading weather...";


    // fetch(): built-in browser Fetch API function.
    // weatherURL: user-defined variable.
    // Returns a Promise.

    fetch(weatherURL)


        // then(): built-in Promise method.
        // function(response): callback function.
        // response: parameter name chosen by us.
        // if: predefined JavaScript keyword.
        // !: logical NOT operator.
        // ok: property of the Response object.
        // throw: predefined JavaScript keyword.
        // Error: built-in JavaScript constructor.

        .then(function(response) {

            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            // json(): built-in Response method.
            // return: predefined JavaScript keyword.

            return response.json();
        })


        // then(): built-in Promise method.
        // function(data): callback function.
        // data: user-defined parameter name.
        // data.current: current property provided by the API.

        .then(function(data) {

            // currentWeather: user-defined variable.
            // data.current: property from the API response.

            let currentWeather = data.current;


            // time: user-defined variable.
            // currentWeather.time: property from the API.
            // slice(): built-in JavaScript string method.
            // 11 and 16: numerical arguments.

            let time = currentWeather.time.slice(11, 16);


            // temperature: user-defined variable.
            // temperature_2m: property provided by the API.

            let temperature = currentWeather.temperature_2m;


            // rain: user-defined variable.
            // rain: property provided by the API.

            let rain = currentWeather.rain;


            // if and else: predefined JavaScript keywords.
            // >: greater-than comparison operator.
            // console: browser-provided global object.
            // log(): built-in console method.

            if (temperature > 30) {
                console.log("Hot in Delhi.");
            } else {
                console.log("Temperature is comfortable.");
            }


            // document: browser-provided global object.
            // getElementById(): built-in DOM method.
            // textContent: DOM property.
            // time: HTML element ID.
            // +: string concatenation operator.
            // parts of the displayed text are string literals.

            document.getElementById("time").textContent =
                "Current Time in Delhi: " + time;


            // temperature: user-defined variable.
            // " °C": string literal.
            // +: string concatenation operator.

            document.getElementById("temperature").textContent =
                "Temperature: " + temperature + " °C";


            // rain: user-defined variable.
            // " mm": string literal.

            document.getElementById("rain").textContent =
                "Rain: " + rain + " mm";


            // message: HTML element ID.
            // textContent: DOM property.

            document.getElementById("message").textContent =
                "Weather updated successfully!";

        })


        // catch(): built-in Promise method.
        // function(error): callback function.
        // error: user-defined parameter name.

        .catch(function(error) {

            // console.error(): built-in console method.
            // error: parameter containing error information.

            console.error("Error fetching weather data:", error);


            // getElementById(): built-in DOM method.
            // textContent: DOM property.
            // "message": HTML element ID.

            document.getElementById("message").textContent =
                "Could not load weather. Please try again.";

        });

}


// getWeather: user-defined function.
// (): function call syntax.

getWeather();


// getElementById(): built-in DOM method.
// addEventListener(): built-in DOM method.
// "click": event type string.
// getWeather: function reference.

document.getElementById("refresh").addEventListener("click", getWeather);


// setInterval(): built-in browser function.
// getWeather: function reference.
// 60000: numerical argument in milliseconds.

setInterval(getWeather, 60000);
