import { settings } from "../Settings.js";



export const getDirections = (startLat,startLong,endLat,endLong) => {
    const key = settings.graphhopperKey;
    const url = `https://graphhopper.com/api/1/route?point=${startLat},${startLong}&point=${endLat},${endLong}&vehicle=car&locale=us&instructions=true&calc_points=true&key=${key}`

    return fetch(url).then(response => response.json()).then(parsedResponse => {
        return parsedResponse;
    })
}

export const directionLiteral = (input) => {
    return ` <li>${input}</li>`
}