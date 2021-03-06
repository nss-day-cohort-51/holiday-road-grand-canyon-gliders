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
    getSingleTripByDirectionId,
} from "./data/DataManager.js";
import { savedTripCard, savedTripCardDetails } from "./cards/SavedTrip.js";
import {
    getDirections,
    directionLiteral,
} from "./directions/DirectionDataManager.js";
import { getEventsByParkCode } from "./parks/ParkDataManager.js";
import { printDirectionsModal, printEventsModal, printEventsModalNone, printDirectionsModalNone } from "./modal.js";


export const updateSavedTrips = () => {
    let attractionIdToNameDictionary = {};
    let state;

    const savedTripsELem = document.querySelector(".saved-trips__cards");
    savedTripsELem.innerHTML = `<div class="saved-trips__header">
                                    <h2>Saved Trips<h2>
                                </div>
                                <div class="saved-tips-cards-container">`;

    getTrips().then((tripObjs) => {
        // loop through trips saved in DB
        for (const tripObj of tripObjs) {
            let tripDetails = {
                id: null,
                parkName: null,
                bizName: [],
                eatName: [],
            };
            // console.log(tripObj);

            // Make a Fetch to Bizs Eats and Parks by Id and save the name under trip details
            // console.log(tripObj.bazararieIds);
            getBizarreriesByIdArray(tripObj.bazararieIds)
                .then((bizObjs) => {
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
                                    eventFunc(tripObj.directionId);
                                });
                        });
                });
        }
    });
};

const modal = document.getElementById("modal");

//function used for gaining permission for location
(function () {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            currentLat = position.coords.latitude;
            currentLong = position.coords.longitude;
        },
        function (error) {
            // directionElement.style.display = "none";
        }
    );
})();

let currentLat;
let currentLong;

const directionsFunc = (input) => {
    //query slectors for directions button and directions fill
    const directionElement = document.getElementById(`container`);

    // const fillDirections = document.querySelector(".directions-fill");

    //event listener for button
    directionElement.addEventListener("click", (event) => {
        if (event.target.id == `directions-btn--${input}`) {
            let parkLat;
            let parkLong;

            //getTrip is used to get directions from local api trips
            const getTrip = getSingleTripByDirectionId(input).then((taco) => {
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
                            modal.innerHTML = printDirectionsModalNone();
                            modal.style.display = "block"
                        } else {
                            modal.innerHTML = printDirectionsModal();
                            const modalDirectionsList = document.querySelector(".directions-list");
                            for (
                                let count = 0;
                                count < event.paths[0].instructions.length;
                                count++
                            ) {
                                console.log(event.paths[0].instructions[count].text);
                                modalDirectionsList.innerHTML += directionLiteral(event.paths[0].instructions[count].text);
                                modal.style.display = "block";
                            }
                        }
                    });
                });
            });
        }
    });
};




//Events Function
export const eventFunc = (input) => {
    //obtain container for eventListener
    const directionElement = document.getElementById(`container`);

    //add eventListener for on clic;
    directionElement.addEventListener("click", (event) => {

        //if statement to decide which card the user selected
        if (event.target.id == `events-btn--${input}`) {

            //fetch calls to gather the trip selected--then gather the parkId of selected trip and pass that parkId to the getParks to then get activities from that specific park
            const getTrip = getSingleTripByDirectionId(input).then((taco) => {
                getParkById(taco[0].parkId).then((parkEvent) => {
                    console.log(parkEvent.parkCode);
                    getEventsByParkCode(parkEvent.parkCode).then((event) => {
                        console.log(event);
                        if (event.length == 0) {
                            modal.innerHTML = printEventsModalNone();
                            modal.style.display = "block";
                        } else if (event.length == 1) {
                            for (let count = 0; count < event.length; count++) {
                                modal.innerHTML = printEventsModal(event[count]);
                                modal.style.display = "block";
                            };
                        } else {
                            for (let count = 0; count < 2; count++) {
                                modal.innerHTML = printEventsModal(event[count]);
                                modal.style.display = "block";
                            };
                        }
                    });
                });
            });
        }
    });
};
