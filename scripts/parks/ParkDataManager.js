import { settings } from "../Settings.js";
import { updateActiveTrip } from "../main.js";
import { getWeather } from "../weather/WeatherDataManager.js";

export const getParks = (input) => {

const key = settings.npsKey;
const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${key}`;

return fetch(url)
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })

}


//Used to get the city using the parkCode
export const getCity = (input) => {

    const key = settings.npsKey;
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${input}&api_key=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse.data[0].addresses[0].city;
        })
    
    }

//Used to get the parks full name by the parkCode
export const getParkByCode = (input) => {

    const key = settings.npsKey;
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${input}&api_key=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse.data[0];
        })
    
    }

    //Used as function for onParkChanged 0n main
export const onParkChanged = (parkId) => {
    const parkNamePreview = document.getElementById("parkPreview");

    //Fix used to gather parkCode as value while also having the Full name of the park for local api and display
    const parkName = getParkByCode(parkId).then(parkFullName => {
        parkNamePreview.innerHTML = parkFullName.fullName;
    });
    //Get Park Id
    const getParkId = getParkByCode(parkId).then(getId => {
        updateActiveTrip("parkId", getId.id);
    });

    //Used to get Weather from API using City Name
    const getCityVar = getCity(parkId).then(cityName => {
        const getWeatherVar = getWeather(cityName).then(fiveDayWeather => {
            console.log(fiveDayWeather.list);
        })
    })
}
