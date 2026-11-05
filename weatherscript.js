// OUR VARIABLE: weatherURL is a name we created.
// const is a predefined JavaScript keyword.
// The URL tells the API which location and weather data we need.

const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m,rain&timezone=auto&forecast_days=1";


// FUNCTION: function is a predefined JavaScript keyword.
// getWeather is the function name WE created.
// () holds parameters. We haven't used any parameters here.

function getWeather() {

    // VARIABLES

    // let = predefined JavaScript keyword for declaring a variable.
    // currentTime = variable name WE created.
    // new = predefined JavaScript keyword used to create an object.
    // Date = built-in JavaScript Date constructor.
    // new Date() gets the current date and time automatically.
    // We don't need to enter the date and time manually.

    let currentTime = new Date();


    // Intl = built-in JavaScript internationalisation object.
    // DateTimeFormat = built-in feature for formatting dates and times.
    // "en-CA" = locale setting that gives us a year-month-day format.
    // timeZone = predefined option name.
    // "Asia/Kolkata" = Delhi's timezone.
    // year, month, day, hour and hourCycle = predefined formatting options.
    // formatToParts() = built-in method that separates the formatted
    // date and time into individual objects.
    // currentTime = the variable we created above and pass into this method.

    let delhiTime = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hourCycle: "h23"
    }).formatToParts(currentTime);


    // let = predefined keyword.
    // parts = object name WE created.
    // {} = object literal, used to create an empty object.
    // We will store date components inside this object.

    let parts = {};


    // forEach() = predefined JavaScript array method.
    // It goes through every item in the array.
    // part = parameter name WE chose for the current item.
    // => = predefined JavaScript arrow function syntax.
    //
    // type and value = properties provided by formatToParts().
    // part.type tells us what the component is (year, month, day, hour).
    // part.value gives us its actual value (2026, 11, 05, etc.).
    //
    // parts[part.type] = part.value
    // [] = bracket notation, used to access an object's property dynamically.
    // We use the type as the property name and store its value.
    // forEach saves us from manually assigning every component.

    delhiTime.forEach(part => {
        parts[part.type] = part.value;
    });


    // currentHour = variable name WE created.
    // + = string concatenation operator, joining pieces of text.
    // year, month, day and hour = properties in our parts object.
    // "-", "T" and ":00" = text characters we added manually.
    // We create a timestamp that can be matched with the API's timestamps.

    let currentHour =
        parts.year + "-" +
        parts.month + "-" +
        parts.day + "T" +
        parts.hour + ":00";


    // DOM MANIPULATION

    // document = predefined browser object representing the HTML page.
    // getElementById() = built-in DOM method that finds an HTML element.
    // "message" = the ID we gave our paragraph in HTML.
    // textContent = built-in DOM property that changes its text.
    // We display a loading message while the API request is happening.

    document.getElementById("message").textContent =
        "Loading weather...";


    // FETCH API

    // fetch() = built-in browser function that sends an API request.
    // weatherURL = the URL variable we created above.
    // fetch returns a Promise because the response takes time to arrive.

    fetch(weatherURL)

        // .then() = built-in Promise method.
        // response = parameter name WE chose.
        // The Promise automatically passes the API response into it.
        // => = arrow function syntax.

        .then(response => {

            // response = the Response object returned by fetch().
            // ok = predefined property of the Response object.
            // ! = NOT operator.
            // if = predefined conditional keyword.
            // Error = built-in JavaScript Error constructor.
            // throw = predefined keyword that raises an error.

            if (!response.ok) {
                throw new Error("Could not fetch weather data");
            }

            // json() = built-in Response method.
            // It reads and parses the JSON response into JavaScript data.
            // return passes that data to the next .then().
            // JSON is a data format, not a programming language.

            return response.json();
        })


        // SECOND .then()
        // data = parameter name WE chose.
        // It receives the parsed JSON data from the previous .then().
        // data contains the weather information returned by the API.

        .then(data => {

            // FIND THE CURRENT HOUR

            // hourly and time = properties provided by the API's JSON data.
            // indexOf() = predefined JavaScript array method.
            // It searches the time array for our currentHour.
            // If found, it returns the position. If not, it returns -1.
            // hour = variable name WE created to store that position.

            let hour = data.hourly.time.indexOf(currentHour);


            // if = predefined conditional keyword.
            // === = strict equality operator.
            // -1 means the timestamp was not found.
            // throw new Error() raises an error if it is missing.

            if (hour === -1) {
                throw new Error("Current hour not found in forecast");
            }


            // temperature = variable name WE created.
            // data.hourly.temperature_2m = temperature array from the API.
            // [hour] = gets the value at the matching array position.
            // We use the index found above to get the correct temperature.

            let temperature =
                data.hourly.temperature_2m[hour];


            // rain = variable name WE created.
            // data.hourly.rain = rainfall array from the API.
            // [hour] = gets rainfall at the same matching position.

            let rain =
                data.hourly.rain[hour];


            // FLOW: CONDITIONAL STATEMENT

            // if and else = predefined JavaScript keywords.
            // > = greater-than operator.
            // console = predefined browser object.
            // log() = built-in method that prints a message in the console.
            // We check whether the temperature is above 30 degrees.

            if (temperature > 30) {
                console.log("Hot in Delhi.");
            } else {
                console.log("Temperature is comfortable.");
            }


            // DOM MANIPULATION: DISPLAY TIME

            // getElementById() finds the HTML paragraph with id="time".
            // textContent updates the text inside it.
            // parts.hour = the Delhi hour we extracted earlier.
            // + joins the label and the hour together.

            document.getElementById("time").textContent =
                "Current Time in Delhi: " +
                parts.hour + ":00";


            // DISPLAY TEMPERATURE
            // Finds the paragraph with id="temperature".
            // + joins the label, temperature value and Celsius unit.

            document.getElementById("temperature").textContent =
                "Temperature: " + temperature + " °C";


            // DISPLAY RAINFALL
            // Finds the paragraph with id="rain".
            // + joins the label, rainfall value and millimeter unit.

            document.getElementById("rain").textContent =
                "Rain: " + rain + " mm";


            // SUCCESS MESSAGE
            // Finds the same paragraph with id="message".
            // Replaces the previous loading text with a success message.

            document.getElementById("message").textContent =
                "Weather updated successfully!";

        })


        // ERROR HANDLING

        // catch() = built-in Promise method.
        // It handles errors from the fetch Promise chain.
        // error = parameter name WE chose.
        // It receives information about the error.
        // => starts the arrow function that handles the error.

        .catch(error => {

            // console.error() = built-in console method.
            // Displays the error in the browser's developer console.

            console.error("Error fetching weather data:", error);


            // Finds the same message paragraph in our HTML.
            // Changes its text to tell the user something went wrong.

            document.getElementById("message").textContent =
                "Could not load weather. Please try again.";

        });

} // This closes the getWeather function.


// FUNCTION CALL
// getWeather = function name WE created.
// () = calls and executes the function.
// This runs the weather process when the script executes.

getWeather();


// REFRESH BUTTON

// addEventListener() = built-in DOM method.
// "click" = event name.
// getWeather = our function, passed to the event listener.
// It runs again when the user clicks the HTML refresh button.

document.getElementById("refresh").addEventListener("click", getWeather);


// AUTOMATIC UPDATE

// setInterval() = built-in browser function.
// getWeather = our function that we want to repeat.
// 60000 = time interval in milliseconds.
// 60000 milliseconds = 60 seconds = 1 minute.
// It automatically runs getWeather every minute.

setInterval(getWeather, 60000);
