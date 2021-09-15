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
import { getDirections, directionLiteral } from "./directions/DirectionDataManager.js";

// export const updateSavedTrips = () => {
//     const savedTripsELem = document.querySelector(".saved-trips-container");
//     getTrips().then((tripObjs) => {
//         console.log(tripObjs);

//         for (const tripObj of tripObjs) {
//             savedTripsELem.innerHTML += savedTripCard(tripObj);
//         }
//     });
// };
// let tripDetails = {
//     parkName: null,
//     bizName: null,
//     eatNAME: null,
// };

export const updateSavedTrips = () => {
    let attractionIdToNameDictionary = {};
    let state;

    const savedTripsELem = document.querySelector(".saved-trips__cards");
    savedTripsELem.innerHTML = "";

    getTrips().then((tripObjs) => {
        // loop through trips saved in DB
        for (const tripObj of tripObjs) {
            console.log(tripObj);
            let tripDetails = {
                parkName: null,
                bizName: null,
                eatNAME: null,
            };
            //Make a Fetch to Bizs Eats and Parks by Id and save the name under trip details
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
                                        savedTripCardDetails(tripDetails)
                                        directionsFunc(3);
                                });
                        });
                });
        }
    });
};


const directionsFunc = (int) => {
    let currentLat;
    let currentLong;

    //Lines 22-29 used for gaining permission for location
    (function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLat = position.coords.latitude;
            currentLong = position.coords.longitude;
        },
            function (error) {
                directionElement.style.display = "none";
            })
    })();

    const directionElement = document.querySelector(".directions-btn");
    const fillDirections = document.querySelector(".directions-fill");
    directionElement.addEventListener("click", event => {

        let parkLat;
        let parkLong;

        fillDirections.innerHTML = "";
        const getTrip = getTrips().then(taco => {
            console.log(taco[int].parkId);
            getParkById(taco[int].parkId).then(parkLoc => {
                parkLat = parkLoc.latitude;
                parkLong = parkLoc.longitude;
                const useVar = getDirections(currentLat, currentLong, parkLat, parkLong).then(function (event) {

                    for (let count = 0; count < event.paths[0].instructions.length; count++) {

                        fillDirections.innerHTML += directionLiteral(event.paths[0].instructions[count].text);

                    }
                })
            });
        })
    })
}