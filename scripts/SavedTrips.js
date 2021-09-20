import {
    // getEateries,
    getTrips,
    // getBizarreries,
    // getAllParks,
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
import {
    printDirectionsModal,
    printEventsModal,
    printEventsModalNone,
    printDirectionsModalNone,
} from "./cards/modals.js";

export const updateSavedTrips = () => {
    const savedTripsELem = document.querySelector(".saved-trips__cards");
    savedTripsELem.innerHTML = `<div class="saved-trips__header">
                                    <h2>Saved Trips<h2>
                                </div>
                                <div class="saved-tips-cards-container">`;

    getTrips().then((tripObjs) => {
        console.log("receiving GET:", tripObjs);

        // loop through trips saved in DB
        for (const tripObj of tripObjs) {
            let tripDetails = {
                id: tripObj.id,
                parkName: null,
                bizIdArray: [],
                eatIdArray: [],
                bizName: [],
                eatName: [],
            };
            // console.log(tripObj);

            // Make a Fetch to Bizs Eats and Parks by Id and save the name under trip details
            // console.log(tripObj.bazararieIds);
            const joinQuery = `http://localhost:8088/joins/?tripId=${tripDetails.id}`;

            fetch(joinQuery)
                .then((response) => response.json())
                .then((joinObjs) => {
                    for (const joinObj of joinObjs) {
                        if (joinObj.bizId != undefined) {
                            tripDetails.bizIdArray.push(joinObj.bizId);
                        }
                        if (joinObj.eatId != undefined) {
                            tripDetails.eatIdArray.push(joinObj.eatId);
                        }
                    }
                })
                .then(() => {
                    // console.log(tripDetails);
                    // console.log(
                    //     "tripDetails.bizIdArray",
                    //     tripDetails.bizIdArray
                    // );

                    if (tripDetails.bizIdArray.length != 0) {
                        debugger;
                        console.log(
                            "tripDetails.bizIdArray",
                            tripDetails.bizIdArray
                        );

                        getBizarreriesByIdArray(tripDetails.bizIdArray).then(
                            (bizObjs) => {
                                if (tripDetails.bizIdArray != []) {
                                    // console.log(
                                    //     "tripDetails.bizIdArray",
                                    //     tripDetails.bizIdArray,
                                    //     (tripDetails.bizIdArray = [])
                                    // );

                                    for (const bizObj of bizObjs) {
                                        console.log(bizObj.name);
                                        tripDetails.bizName.push(bizObj.name);
                                    }
                                }
                            }
                        );
                    }
                    if (tripDetails.eatIdArray.length != 0) {
                        getEateriesByIdArray(tripDetails.eatIdArray).then(
                            (eatObjs) => {
                                // console.log(
                                //     "tripDetails.eatIdArray",
                                //     tripDetails.eatIdArray
                                // );

                                if (tripDetails.eatIdArray != []) {
                                    for (const eatObj of eatObjs) {
                                        tripDetails.eatName.push(
                                            eatObj.businessName
                                        );
                                    }
                                }
                            }
                        );
                    }
                })
                .then(() => {
                    getParkById(tripObj.parkId)
                        .then((park) => {
                            tripDetails.parkName = park.fullName;
                        })
                        .then(() => {
                            // when all the information is received inject the saved trip card into DOM eith the details containing names
                            savedTripsELem.innerHTML += savedTripCardDetails(
                                tripDetails,
                                tripObj.directionId
                            );
                            // add direction and event buttons
                            directionsFunc(tripObj.directionId);
                            eventFunc(tripObj.directionId);
                        });
                });
        }
    });
};

const modal = document.getElementById("modal");

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
            // directionElement.style.display = "none";
        }
    );
})();

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
                            modal.style.display = "block";
                        } else {
                            modal.innerHTML = printDirectionsModal();
                            const modalDirectionsList =
                                document.querySelector(".directions-list");
                            for (
                                let count = 0;
                                count < event.paths[0].instructions.length;
                                count++
                            ) {
                                console.log(
                                    event.paths[0].instructions[count].text
                                );
                                modalDirectionsList.innerHTML +=
                                    directionLiteral(
                                        event.paths[0].instructions[count].text
                                    );
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
                                modal.innerHTML = printEventsModal(
                                    event[count]
                                );
                                modal.style.display = "block";
                            }
                        } else {
                            for (let count = 0; count < 2; count++) {
                                modal.innerHTML = printEventsModal(
                                    event[count]
                                );
                                modal.style.display = "block";
                            }
                        }
                    });
                });
            });
        }
    });
};
