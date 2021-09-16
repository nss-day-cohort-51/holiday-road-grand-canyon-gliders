import { settings } from "../Settings.js"


//Used to get 5 day weather report by zip code
export const getWeatherZip = (zip) => {

    const key = settings.weatherKey;
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&appid=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse;
        })
    
    }


const formatDate = (obj) => {
    const date = new Date(obj);
    const dateStr = date.toString(); // converts date object to a string
    const formattedDate = dateStr.substring(0,3); // takes first 3 letters of date string so we can display it as Mon, Tue, etc
    return formattedDate;
}

const formatTemp = (obj) => {
    const temp = Math.round(obj); // this rounds the temp to a whole number
    return temp;
}

export const addWeather = (weatherList, zipCode) => {

    const dayOne = formatDate(weatherList[3].dt_txt);
    const dayOneTemp = formatTemp(weatherList[3].main.temp);
    const dayOneIcon =  weatherList[3].main;

    const dayTwo = formatDate(weatherList[11].dt_txt);
    const dayTwoTemp = formatTemp(weatherList[11].main.temp);

    const dayThree = formatDate(weatherList[19].dt_txt);
    const dayThreeTemp = formatTemp(weatherList[19].main.temp);

    const dayFour = formatDate(weatherList[27].dt_txt);
    const dayFourTemp = formatTemp(weatherList[27].main.temp);

    const dayFive = formatDate(weatherList[35].dt_txt);
    const dayFiveTemp = formatTemp(weatherList[35].main.temp);

    return ` 
        <span>Forecast For The Next 5 Days in ${zipCode}</span>
        <div class="forecastCardList">

            <section class="forecastCard dayOne">  
                <h3 class="forecastTitle">${dayOne}</h3>
                <div class="temp">${dayOneTemp}°</div>
                <div class="outlook">${weatherList[0].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[0].weather[0].icon}@2x.png" /></div>
            </section> <!-- closes dayOne -->

            <section class="forecastCard dayTwo">
                <h3 class="forecastTitle">${dayTwo}</h3>
                <div class="temp">${dayTwoTemp}°</div>
                <div class="outlook">${weatherList[8].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[8].weather[0].icon}@2x.png" /></div>
            </section> <!-- closes dayTwo -->

            <section class="forecastCard dayThree">
                <h3 class="forecastTitle">${dayThree}</h3>
                <div class="temp">${dayThreeTemp}°</div>
                <div class="outlook">${weatherList[16].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[16].weather[0].icon}@2x.png" /></div>
            </section> <!-- closes dayThree -->

            <section class="forecastCard dayFour">
                <h3 class="forecastTitle">${dayFour}</h3>
                <div class="temp">${dayFourTemp}°</div>
                <div class="outlook">${weatherList[24].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[24].weather[0].icon}@2x.png" />
                </div>
            </section> <!-- closes dayFour -->

            <section class="forecastCard dayFive">
                <h3 class="forecastTitle">${dayFive}</h3>
                <div class="temp">${dayFiveTemp}°</div>
                <div class="outlook">${weatherList[32].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[32].weather[0].icon}@2x.png" />
                </div>
            </section> <!-- closes dayFive -->

        </div> <!-- closes forecastCardList -->
        `;
};