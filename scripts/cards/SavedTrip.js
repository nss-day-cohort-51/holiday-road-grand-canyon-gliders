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
        <div class ="saved-trip__card--header">
            <h3>${tripDetails.parkName}</h3>
        </div>
        <div class="saved-trip__attractions">`;

    //populate with eateries and Bazarraries
    if (tripDetails.bizName != []) {
        card += `<div class="saved-trip__attraction"> 
                    <div class="saved-trip__attraction--header">
                        <h5>Bazzararies:</h5>
                    </div>`;
        tripDetails.bizName.forEach((biz) => {
            card += `<div class="saved-trip__text">
                        <p class="saved-trip__attraction--elem"> ${biz}</p>
                    </div>`;
        });
        card += `</div>`;
    }

    if (tripDetails.eatName != []) {
        card += `<div class="saved-trip__attraction"> 
                    <div class="saved-trip__attraction--header">
                        <h5>Eateries:</h5>
                    </div>`;
        tripDetails.eatName.forEach((eat) => {
            card += `<div class="saved-trip__text">
                        <p class="saved-trip__attraction--elem"> ${eat}</p>
                    </div>`;
        });
        card += `</div></div>`;
    }

    card += `
    <div class="saved-trip__btns"> 
        <button id="directions-btn--${directionId}" class="directions-btn">DIRECTIONS</button>
        <button id="events-btn--${directionId}" class="directions-btn">EVENTS</button>
        <div class="eventFill"></div>
    </div>
    </div>
    </div>`;
    return card;
};

