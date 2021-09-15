import {
    // getEateries,
    getTrips,
    // getBizarreries,
    // getAllParks,
    getBizarreryById,
    getEateryById,
    getParkById,
    getBizarreriesByIdArray,
    getEateriesByIdArray,
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
                bizName: [],
                eatName: [],
            };
            // console.log(tripObj);

            // Make a Fetch to Bizs Eats and Parks by Id and save the name under trip details
            // console.log(tripObj.bazararieIds);
            console.log(tripObj);
            getBizarreriesByIdArray(tripObj.bazararieIds)
                .then((bizObjs) => {
                    console.log(bizObjs);
                    for (const bizObj of bizObjs) {
                        tripDetails.bizName.push(bizObj.name);
                    }
                })
                .then(() => {
                    getEateriesByIdArray(tripObj.eateryIds)
                        .then((eatObjs) => {
                            for (const eatObj of eatObjs) {
                                tripDetails.eatName.push(eatObj.businessName);
                            }
                        })
                        .then(() => {
                            getParkById(tripObj.parkId)
                                .then((park) => {
                                    tripDetails.parkName = park.fullName;
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
