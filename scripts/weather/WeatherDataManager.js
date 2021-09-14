import { settings } from "../Settings.js"

//Used to get the 5 day weather forecast
export const getWeather = (city) => {

    const key = settings.weatherKey;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse;
        })
    
    }

export const getWeatherZip = (zip) => {

    const key = settings.weatherKey;
    const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse;
        })
    
    }