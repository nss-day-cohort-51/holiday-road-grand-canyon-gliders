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

export const savedTripCardDetails = (tripDetails, directionId) => {
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

    card += `<button id="directions-btn--${directionId}">DIRECTIONS</button><button id="events-btn--${directionId}">EVENTS</button>
    <ul class="eventFill"></ul>
    </div>`;
    return card;
};

//Literal for events
export const fillEvents = (input) => {
    return `<li class="event">${input}</li>`
}
