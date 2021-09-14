import {
    getEateries,
    getTrips,
    getBizarreries,
    getAllParks,
} from "./data/DataManager.js";
import { savedTripCard, savedTripCardDetails } from "./cards/SavedTrip.js";

export const updateSavedTrips = () => {
    const savedTripsELem = document.querySelector(".saved-trips-container");
    getTrips().then((tripObjs) => {
        console.log(tripObjs);

        for (const tripObj of tripObjs) {
            savedTripsELem.innerHTML += savedTripCard(tripObj);
        }
    });
};

export const updateSavedTripsDetails = () => {
    let attractionIdToNameDictionary = {};
    let state;

    const savedTripsELem = document.querySelector(".saved-trips-container");

    getTrips()
        .then((tripObjs) => {
            // loop through saved trips and populate a dictionary with keys for each park/biz/eat attraction
            for (const tripObj of tripObjs) {
                console.log(tripObj);

                attractionIdToNameDictionary[`park${tripObj.parkId}`] = null;
                attractionIdToNameDictionary[`biz${tripObj.bazararieIds}`] =
                    null;
                attractionIdToNameDictionary[`eat${tripObj.eateryIds}`] = null;
            }
            console.log("after first fill", attractionIdToNameDictionary);
        })
        .then(
            // look throuch all bizararries for ones saved to a trip and populate them with names
            getBizarreries()
                .then((bizObjs) => {
                    console.log("first pass:", attractionIdToNameDictionary);
                    for (const bizObj of bizObjs) {
                        console.log(
                            `biz${bizObj.id}`,
                            `biz${bizObj.id}` in attractionIdToNameDictionary
                        );
                        // debugger;
                        if (`biz${bizObj.id}` in attractionIdToNameDictionary) {
                            // console.log("setting biz{id} to:");

                            attractionIdToNameDictionary[`biz${bizObj.id}`] =
                                bizObj.name;
                            // // console.log(
                            //     attractionIdToNameDictionary[`biz${bizObj.id}`]
                            // );
                        }
                    }
                })
                .then(
                    // look throuch all eateries for ones saved to a trip and populate them with names
                    getEateries()
                        .then((eatObjs) => {
                            for (const eatObj of eatObjs) {
                                if (
                                    `eat${eatObj.id}` in
                                    attractionIdToNameDictionary
                                ) {
                                    attractionIdToNameDictionary[
                                        `eat${eatObj.id}`
                                    ] = eatObj.businessName;
                                }
                            }
                        })
                        .then(
                            //
                            getAllParks()
                                .then((parkObjs) => {
                                    console.log("parks array", parkObjs);

                                    for (const parkObj of parkObjs) {
                                        if (
                                            `park${parkObj.id}` in
                                            attractionIdToNameDictionary
                                        ) {
                                            attractionIdToNameDictionary[
                                                `park${parkObj.id}`
                                            ] = parkObj.fullName;
                                        }
                                    }
                                })
                                .then(
                                    getTrips().then((tripObjs) => {
                                        console.log(
                                            "attractions saved:",
                                            attractionIdToNameDictionary
                                        );
                                        for (const tripObj of tripObjs) {
                                            // create obj of trip details populated with received info
                                            let parkName =
                                                attractionIdToNameDictionary[
                                                    `park${tripObj.parkId}`
                                                ];
                                            let bizName =
                                                attractionIdToNameDictionary[
                                                    `biz${tripObj.bazararieIds[0]}`
                                                ];
                                            let eatName =
                                                attractionIdToNameDictionary[
                                                    `park${tripObj.eateryIds[0]}`
                                                ];
                                            let tripDetails = {
                                                parkName: parkName,
                                                bizName: bizName,
                                                eatName: eatName,
                                            };
                                            savedTripsELem.innerHTML +=
                                                savedTripCardDetails(
                                                    tripDetails
                                                );
                                        }
                                    })
                                )
                        )
                )
        );
    // run fetch to Trips populate dictionary of ids

    // then run fetch to parks then biz then eats to populate ids:names

    // then run fetch to trips to insert cards
};
