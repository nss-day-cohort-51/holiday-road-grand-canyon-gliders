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
    const dateStr = date.toString();
    console.log("dateStr is: ", dateStr);
    console.log(typeof dateStr);
    const formattedDate = dateStr.substring(0,3);
    return formattedDate;
}

const formatTemp = (obj) => {
    const temp = Math.round(obj);
    return temp;
}

export const addWeather = (weatherList, zipCode) => {

    const dayOne = formatDate(weatherList[3].dt_txt);
    console.log("day one is:", dayOne);
    const dayOneTemp = formatTemp(weatherList[3].main.temp);

    const dayTwo = formatDate(weatherList[11].dt_txt);
    console.log("day two is:", dayTwo);
    const dayTwoTemp = formatTemp(weatherList[11].main.temp);

    const dayThree = formatDate(weatherList[19].dt_txt);
    console.log("day three is:", dayThree);
    const dayThreeTemp = formatTemp(weatherList[19].main.temp);

    const dayFour = formatDate(weatherList[27].dt_txt);
    console.log("day four is:", dayFour);
    const dayFourTemp = formatTemp(weatherList[27].main.temp);

    const dayFive = formatDate(weatherList[35].dt_txt);
    console.log("day five is:", dayFive);
    const dayFiveTemp = formatTemp(weatherList[35].main.temp);

    return `
        <span>Forecast For The Next 5 Days in ${zipCode}</span>
        <div class="forecastCardList">
            
            <section class="forecastCard dayOne">  
                <h3 class="forecastTitle">${dayOne}</h3>
                <div>${dayOneTemp}°</div>
                <div>${weatherList[3].weather[0].main}</div>
            </section> <!-- closes dayOne -->

            <section class="forecastCard dayTwo">
                <h3 class="forecastTitle">${dayTwo}</h3>
                <div>${dayTwoTemp}°</div>
                <div>${weatherList[11].weather[0].main}</div>
            </section> <!-- closes dayTwo -->

            <section class="forecastCard dayThree">
                <h3 class="forecastTitle">${dayThree}</h3>
                <div>${dayThreeTemp}°</div>
                <div>${weatherList[19].weather[0].main}</div>
            </section> <!-- closes dayThree -->

            <section class="forecastCard dayFour">
                <h3 class="forecastTitle">${dayFour}</h3>
                <div>${dayFourTemp}°</div>
                <div>${weatherList[27].weather[0].main}</div>
            </section> <!-- closes dayFour -->

            <section class="forecastCard dayFive">
                <h3 class="forecastTitle">${dayFive}</h3>
                <div>${dayFiveTemp}°</div>
                <div>${weatherList[35].weather[0].main}</div>
            </section> <!-- closes dayFive -->

        </div> <!-- closes forecastCardList -->
    `;
};