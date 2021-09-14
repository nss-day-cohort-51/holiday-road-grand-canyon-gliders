import { settings } from "../Settings.js";

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
export const getParkNameByCode = (input) => {

    const key = settings.npsKey;
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${input}&api_key=${key}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse.data[0].fullName;
        })
    
    }


