import { settings } from "../Settings.js"


//Used to get 5 day weather report by zip code
export const getWeatherZip = (zip) => {

    const key = settings.weatherKey;
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse;
        })
    
    }