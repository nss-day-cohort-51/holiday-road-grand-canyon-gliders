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

