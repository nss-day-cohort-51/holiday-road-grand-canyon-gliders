import { getTripDetails } from "../tools/GetTripDetails.js";

// let tripDetails = { parkName: null, bazName: null, eatName: null };

export const savedTripCard = (tripDetails) => {
    // TODO fill in with trip details
    return `
    <div class="saved-trips__card"> 
        <h3>${tripDetails.parkId}</h3>
        <p class="saved-trip--baz"> ${tripDetails.bazararieIds}</p>
        <p class="saved-trip--eat"> ${tripDetails.eateryIds}</p>
    </div>
    `;
};

export const savedTripCardDetails = (tripDetails) => {
    return `
    <div class="saved-trips__card"> 
        <h3>${tripDetails.parkName}</h3>
        <p class="saved-trip--baz"> ${tripDetails.bizName}</p>
        <p class="saved-trip--eat"> ${tripDetails.eatName}</p>
    </div>
    `;
};
