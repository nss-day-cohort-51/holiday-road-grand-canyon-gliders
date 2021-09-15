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

<<<<<<< HEAD
export const savedTripCardDetails = (tripDetails) => {
    let card = `
    <div class="saved-trips__line-break"></div>
    <div class="saved-trips__card"> 
        <h3>${tripDetails.parkName}</h3>`;
    console.log(tripDetails);

    //populate with eateries and Bazarraries
    if (tripDetails.bizName != []) {
        card += `<div class="saved-trip__attraction"> 
                    <h5 class="saved-trip__attraction--header">Bazzararies:</h5>`;
        tripDetails.bizName.forEach((biz) => {
            card += `<p class="saved-trip__attraction--elem"> ${biz}</p>`;
        });
        card += `</div>`;
    }

    if (tripDetails.eatName != []) {
        card += `<div class="saved-trip__attraction"> 
                    <h5 class="saved-trip__attraction--header">Eateries:</h5>`;
        tripDetails.eatName.forEach((eat) => {
            card += `<p class="saved-trip__attraction--elem"> ${eat}</p>`;
        });
        card += `</div>`;
    }

    card += `</div>`;
    return card;
=======
export const savedTripCardDetails = (tripDetails,directionId) => {
    return `
    <div class="saved-trips__card"> 
        <h3>${tripDetails.parkName}</h3>
        <p class="saved-trip--baz">Bazarrarie: ${tripDetails.bizName}</p>
        <p class="saved-trip--eat">Eatery: ${tripDetails.eatName}</p>
        <button id="directions-btn--${directionId}">DIRECTIONS</button>
    </div>
    `;
>>>>>>> feef0bc21e22bd141ec0776c6e4fb1d0fb4f2979
};
