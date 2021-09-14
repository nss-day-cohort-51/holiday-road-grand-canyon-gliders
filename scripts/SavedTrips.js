import {
    // getEateries,
    getTrips,
    // getBizarreries,
    // getAllParks,
    getBizarreryById,
    getEateryById,
    getParkById,
} from "./data/DataManager.js";
import { savedTripCard, savedTripCardDetails } from "./cards/SavedTrip.js";

// export const updateSavedTrips = () => {
//     const savedTripsELem = document.querySelector(".saved-trips-container");
//     getTrips().then((tripObjs) => {
//         console.log(tripObjs);

//         for (const tripObj of tripObjs) {
//             savedTripsELem.innerHTML += savedTripCard(tripObj);
//         }
//     });
// };

export const updateSavedTrips = () => {
    let attractionIdToNameDictionary = {};
    let state;

    const savedTripsELem = document.querySelector(".saved-trips__cards");
    savedTripsELem.innerHTML = "";

    getTrips().then((tripObjs) => {
        // loop through trips saved in DB
        for (const tripObj of tripObjs) {
            // console.log(tripObj);
            let tripDetails = {
                parkName: null,
                bizName: null,
                eatNAME: null,
            };
            // Make a Fetch to Bizs Eats and Parks by Id and save the name under trip details
            getBizarreryById(tripObj.bazararieIds)
                .then((biz) => {
                    tripDetails.bizName = biz.name;
                })
                .then(() => {
                    getEateryById(tripObj.eateryIds)
                        .then((eat) => {
                            tripDetails.eatName = eat.businessName;
                        })
                        .then(() => {
                            getParkById(tripObj.parkId)
                                .then((park) => {
                                    tripDetails.parkName = park.name;
                                })
                                .then(() => {
                                    // when all the information is received inject the saved trip card into DOM eith the details containing names
                                    savedTripsELem.innerHTML +=
                                        savedTripCardDetails(tripDetails);
                                });
                        });
                });
        }
    });
};
