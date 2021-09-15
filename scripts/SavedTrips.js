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
import {
    getDirections,
    directionLiteral,
} from "./directions/DirectionDataManager.js";

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
                id: null,
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
                                        savedTripCardDetails(
                                            tripDetails,
                                            tripObj.directionId
                                        );
                                    ///
                                    directionsFunc(tripObj.directionId);
                                });
                        });
                });
        }
    });
};

const fillDirections = document.querySelector(".directions-fill");
const directionHeaderElement = document.querySelector(".directions-header");
directionHeaderElement.style.display = "none";

const directionsFunc = (input) => {
    let currentLat;
    let currentLong;

    //function used for gaining permission for location
    (function () {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                currentLat = position.coords.latitude;
                currentLong = position.coords.longitude;
            },
            function (error) {
                directionElement.style.display = "none";
            }
        );
    })();

    //query slectors for directions button and directions fill
    const directionElement = document.getElementById(`container`);

    // const fillDirections = document.querySelector(".directions-fill");

    //event listener for button
    directionElement.addEventListener("click", (event) => {
        if (event.target.id == `directions-btn--${input}`) {
            directionHeaderElement.style.display = "block";
            let parkLat;
            let parkLong;

            //reset the dom for directions
            fillDirections.innerHTML = "";

            //getTrip is used to get directions from local api trips
            const getTrip = getSingleTripByDirectionId(input).then((taco) => {
                console.log(taco);
                getParkById(taco[0].parkId).then((parkLoc) => {
                    console.log(parkLoc);
                    parkLat = parkLoc.latitude;
                    parkLong = parkLoc.longitude;

                    const useVar = getDirections(
                        currentLat,
                        currentLong,
                        parkLat,
                        parkLong
                    ).then(function (event) {
                        if (event.paths == undefined) {
                            fillDirections.innerHTML =
                                directionLiteral("Learn to swim");
                        } else {
                            for (
                                let count = 0;
                                count < event.paths[0].instructions.length;
                                count++
                            ) {
                                fillDirections.innerHTML += directionLiteral(
                                    event.paths[0].instructions[count].text
                                );
                            }
                        }
                    });
                });
            });
        }
    });
};
