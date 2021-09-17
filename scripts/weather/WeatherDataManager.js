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

    const dayOne = formatDate(weatherList[0].dt_txt);
    const dayOneTemp = formatTemp(weatherList[0].main.temp);

    const dayTwo = formatDate(weatherList[8].dt_txt);
    const dayTwoTemp = formatTemp(weatherList[8].main.temp);

    const dayThree = formatDate(weatherList[16].dt_txt);
    const dayThreeTemp = formatTemp(weatherList[16].main.temp);

    const dayFour = formatDate(weatherList[24].dt_txt);
    const dayFourTemp = formatTemp(weatherList[24].main.temp);

    const dayFive = formatDate(weatherList[32].dt_txt);
    const dayFiveTemp = formatTemp(weatherList[32].main.temp);

    return ` 
        <span>Forecast For The Next 5 Days in ${zipCode}</span>

        <div class="whole-flip-set">

        <!-- card one -->
        <div class="flip-card">
                <div class="flip-card-inner">
                
                    <div class="flip-card-front">
                    <h3 class="title-front">${dayOne}</h3>
                    <div class="temp">${dayOneTemp}°</div>
                    <div class="outlook">${weatherList[0].weather[0].main}</div>
                    <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[0].weather[0].icon}@2x.png" /></div>
                    </div> <!-- closes flip-card-inner -->

                    <div class="flip-card-back">
                    <h3 class="title-back">${dayOne}</h3>
                    <div class="outlook-back">${weatherList[0].weather[0].description}</div>
                    <div class="temp-title">Low:</div>
                    <div class="temp-result">${formatTemp(weatherList[0].main.temp_min)}°</div>
                    <div class="temp-title">High:</div>
                    <div class="temp-result">${formatTemp(weatherList[0].main.temp_max)}°</div>
                    </div> <!-- closes flip-card-back -->

                </div> <!-- closes flip-card-inner -->
        </div> <!-- closes flip-card -->
    
        <!-- card two -->
        <div class="flip-card">
            <div class="flip-card-inner">

                <div class="flip-card-front">
                <h3 class="forecastTitle">${dayTwo}</h3>
                <div class="temp">${dayTwoTemp}°</div>
                <div class="outlook">${weatherList[8].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[8].weather[0].icon}@2x.png" /></div>
                </div> <!-- closes flip-card-inner -->

                <div class="flip-card-back">
                <h3 class="title-back">${dayTwo}</h3>
                <div class="outlook-back">${weatherList[8].weather[0].description}</div>
                <div class="temp-title">Low:</div>
                <div class="temp-result">${formatTemp(weatherList[8].main.temp_min)}°</div>
                <div class="temp-title">High:</div>
                <div class="temp-result">${formatTemp(weatherList[8].main.temp_max)}°</div>
                </div> <!-- closes flip-card-back -->

            </div> <!-- closes flip-card-inner -->
        </div> <!-- closes flip-card -->
    
        <!-- card three -->
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                <h3 class="forecastTitle">${dayThree}</h3>
                <div class="temp">${dayThreeTemp}°</div>
                <div class="outlook">${weatherList[16].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[16].weather[0].icon}@2x.png" /></div>
                </div> <!-- closes flip-card-inner -->

                <div class="flip-card-back">
                <h3 class="title-back">${dayThree}</h3>
                <div class="outlook-back">${weatherList[16].weather[0].description}</div>
                <div class="temp-title">Low:</div>
                <div class="temp-result">${formatTemp(weatherList[16].main.temp_min)}°</div>
                <div class="temp-title">High:</div>
                <div class="temp-result">${formatTemp(weatherList[16].main.temp_max)}°</div>
                </div> <!-- closes flip-card-back -->

            </div> <!-- closes flip-card-inner -->
        </div> <!-- closes flip-card -->
    
        <!-- card four -->
        <div class="flip-card">
            <div class="flip-card-inner">

                <div class="flip-card-front">
                <h3 class="forecastTitle">${dayFour}</h3>
                <div class="temp">${dayFourTemp}°</div>
                <div class="outlook">${weatherList[24].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[24].weather[0].icon}@2x.png" /></div> 
                </div> <!-- closes flip-card-front -->

                <div class="flip-card-back">
                <h3 class="title-back">${dayFour}</h3>
                <div class="outlook-back">${weatherList[24].weather[0].description}</div>
                <div class="temp-title">Low:</div>
                <div class="temp-result">${formatTemp(weatherList[24].main.temp_min)}°</div>
                <div class="temp-title">High:</div>
                <div class="temp-result">${formatTemp(weatherList[24].main.temp_max)}°</div>
                </div> <!-- closes flip-card-back -->

            </div> <!-- closes flip-card-inner -->
        </div> <!-- closes flip-card -->
    
        <!-- card five -->
        <div class="flip-card">
            <div class="flip-card-inner">

                <div class="flip-card-front">
                <h3 class="forecastTitle">${dayFive}</h3>
                <div class="temp">${dayFiveTemp}°</div>
                <div class="outlook">${weatherList[32].weather[0].main}</div>
                <div><img class="weather-icon" src="http://openweathermap.org/img/wn/${weatherList[32].weather[0].icon}@2x.png" /></div>
                </div> <!-- closes flip-card-front -->

                <div class="flip-card-back">
                <h3 class="title-back">${dayFive}</h3>
                <div class="outlook-back">${weatherList[32].weather[0].description}</div>
                <div class="temp-title">Low:</div>
                <div class="temp-result">${formatTemp(weatherList[32].main.temp_min)}°</div>
                <div class="temp-title">High:</div>
                <div class="temp-result">${formatTemp(weatherList[32].main.temp_max)}°</div>
                </div> <!-- closes flip-card-back -->

            </div> <!-- closes flip-card-inner -->
        </div> <!-- closes flip-card -->
    
    </div> <!-- closes whole-flip-set -->

        `;
};