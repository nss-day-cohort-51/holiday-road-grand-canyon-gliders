import { resetTripSelection, runDropdown } from "./dropdown.js";
import { runModal } from "./modal.js";
import { getBizarreryById, putTripCall } from "./data/DataManager.js";
import { updateSavedTrips } from "./SavedTrips.js";
import { getParkById } from "./parks/ParkDataManager.js";
import { directionLiteral, getDirections } from "./directions/DirectionDataManager.js";

runDropdown();
runModal();
// populate Saved Trips
updateSavedTrips();

const directionElement = document.querySelector(".directions-btn");
const fillDirections = document.querySelector(".directions-fill");
fillDirections.style.display = "block";

//used for current location
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

//used to gather the direction material through the parkid and current longitude and latitude
directionElement.addEventListener("click", event => {

    let parkLat;
    let parkLong;
    let bizLat;
    let bizLong;
    let eatLat;
    let eatLong;
    fillDirections.innerHTML = "";
    if (
        activeTripState.parkId != null &&
        activeTripState.bazararieIds.length != 0 &&
        activeTripState.eateryIds.length != 0
    ) {
        console.log(activeTripState.parkId);
        getParkById(activeTripState.parkId).then(parkLoc => {
            parkLat = parkLoc.latitude;
            parkLong = parkLoc.longitude;
            const useVar = getDirections(currentLat, currentLong, parkLat, parkLong).then(function (event) {
                console.log(event.paths[0].instructions.length);

                for (let count = 0; count < event.paths[0].instructions.length; count++) {

                    fillDirections.innerHTML += directionLiteral(event.paths[0].instructions[count].text);

                }
            })
        });

        // getBizarreryById(activeTripState.bazararieIds).then(bizLoc => {
        //     bizLat = bizLoc.latitude;
        //     bizLong = bizLoc.longitude;
        //     const useVar = getDirections(parkLat, parkLong, bizLat, bizLong).then(function (event) {
        //         console.log(event.paths[0].instructions.length);

        //         for (let count = 0; count < event.paths[0].instructions.length; count++) {

        //             fillDirections.innerHTML += directionLiteral(event.paths[0].instructions[count].text);

        //         }
        //     })
        // })

    }

})

// saveActive trip while still being filled out
let activeTripState = {
    state: null,
    parkId: null,
    bazararieIds: [],
    eateryIds: [],
    completed: false,
};

export const returnActiveTripState = () => {
    const activeTripStateCopy = activeTripState;
    return activeTripStateCopy;
};

// update the state of the activeTrip
export const updateActiveTrip = (attribute, value) => {
    console.log(activeTripState);

    switch (attribute) {
        case "state":
        case "parkId":
            // update parkId
            activeTripState[attribute] = value;
            break;
        case "bazararieIds":
        case "eateryIds":
            // update BazarrieIds or eateryIds
            activeTripState[attribute].push(value);
    }
    // check form completion
    if (
        activeTripState.parkId != null &&
        activeTripState.bazararieIds.length != 0 &&
        activeTripState.eateryIds.length != 0
    ) {
        // if complete
        activeTripState.completed = true;
        activateSaveTripButton();
    }
};

const activateSaveTripButton = () => {
    const saveButtonElement = document.querySelector(".save-trip-btn");
    // change cursor of save button on hover if active
    saveButtonElement.style.cursor = "pointer";
    saveButtonElement.style["background-color"] = "green";

    const submitTrip = () => {
        // update server with active trip
        putTripCall().then(updateSavedTrips);
        // repopulate Saved Trips List
        // updateSavedTrips();
        // clear out trip selectors
        resetTripSelection();
        // clear active trip
        clearActiveTripState();
        // remove click eventListener from SubmitButton
        saveButtonElement.removeEventListener("click", submitTrip);
    };

    saveButtonElement.addEventListener("click", submitTrip);
};

const clearActiveTripState = () => {
    activeTripState = {
        parkId: null,
        bazararieIds: [],
        eateryIds: [],
        completed: false,
    };
};
