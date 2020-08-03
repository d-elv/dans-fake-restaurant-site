const WEATHER_URL =
    "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e0c44c0a991be31b5c1f5ee571b94acb&units=Metric";

const promise = fetch(WEATHER_URL);

promise
    .then(function (response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function (processedResponse) {
        const weatherCelsius = document.querySelector(".weather-celsius");
        const weatherDescription = document.querySelector(
            ".weather-description"
        );

        weatherMapMain = processedResponse.main;
        console.log(processedResponse);
        weatherMapDesc = processedResponse.weather[0].description;

        weatherCelsius.innerText = weatherMapMain.temp + " ";
        weatherDescription.innerText = " with " + weatherMapDesc;
    });
