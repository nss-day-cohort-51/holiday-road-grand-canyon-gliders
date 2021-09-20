import { resetTripSelection, runDropdown } from "./dropdown.js";
import { putTripCall, getParkById } from "./data/DataManager.js";
import { runModal } from "./modal.js";
import { updateSavedTrips } from "./SavedTrips.js";

let activeTripState = {
    state: null,
    parkId: null,
    bazararieIds: [],
    eateryIds: [],
    completed: false,
};

// make active trip state readable across modules
export const returnActiveTripState = () => {
    const activeTripStateCopy = activeTripState;
    return activeTripStateCopy;
};

//Lines 22-29 used for gaining permission for location
navigator.geolocation.getCurrentPosition(function (position) {
    let currentLat;
    let currentLong;

    currentLat = position.coords.latitude;
    currentLong = position.coords.longitude;
});

// create variable to store the active trip selection

// update the state of the activeTrip
export const updateActiveTrip = (attribute, value) => {
    switch (attribute) {
        case "state":
        case "parkId":
            // update parkId or state value
            activeTripState[attribute] = value;
            break;
        case "bazararieIds":
        case "eateryIds":
            // update BazarrieIds or eateryIds array
            activeTripState[attribute].push(value);
    }
    // check form completion on update
    if (
        activeTripState.parkId != null &&
        activeTripState.bazararieIds.length != 0 &&
        activeTripState.eateryIds.length != 0 &&
        activeTripState.completed != true
    ) {
        // if form is complete, activate the save trip button
        activeTripState.completed = true;
        activateSaveTripButton();
    }
};

const activateSaveTripButton = () => {
    const saveButtonElement = document.querySelector(".save-trip-btn");
    // change cursor of save button on hover if active
    saveButtonElement.style.cursor = "pointer";
    saveButtonElement.style["background-color"] = "#85C1BF";

    const submitTrip = () => {
        // update server with active trip
        putTripCall().then(updateSavedTrips);

        resetTripSelection();
        clearActiveTripState();

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

runDropdown();
runModal();
// populate Saved Trips
updateSavedTrips();

// create collapse button event listeners
import "./collapse.js";

let collapsed = false;
export const changeCollapsed = () => {
    collapsed ? (collapsed = false) : (collapsed = true);
};

export const readCollapsed = () => {
    return collapsed == true;
};
