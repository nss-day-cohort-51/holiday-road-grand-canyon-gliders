import { resetTripSelection, runDropdown } from "./dropdown.js";
import { runModal } from "./modal.js";
import { getBizarreryById, getTrips, putTripCall } from "./data/DataManager.js";
import { updateSavedTrips } from "./SavedTrips.js";
import { getParkById } from "./parks/ParkDataManager.js";
import { directionLiteral, getDirections } from "./directions/DirectionDataManager.js";

runDropdown();
runModal();
// populate Saved Trips
updateSavedTrips();


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
