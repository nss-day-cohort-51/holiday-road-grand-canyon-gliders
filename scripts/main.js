import { resetTripSelection, runDropdown } from "./dropdown.js";
import { runModal } from "./modal.js";
import { putTripCall } from "./data/DataManager.js";
import { updateSavedTrips } from "./SavedTrips.js";

runDropdown();
runModal();
// populate Saved Trips
updateSavedTrips();

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
    console.log("updating:", activeTripState);

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
        activeTripState.eateryIds.length != 0 &&
        activeTripState.completed != true
    ) {
        activeTripState.completed = true;
        activateSaveTripButton();
    }
    console.log("updated", activeTripState);
};

const activateSaveTripButton = () => {
    const saveButtonElement = document.querySelector(".save-trip-btn");
    // change cursor of save button on hover if active
    saveButtonElement.style.cursor = "pointer";
    saveButtonElement.style["background-color"] = "green";

    console.log("adding Event Listener");
    const submitTrip = () => {
        // update server with active trip
        putTripCall().then(updateSavedTrips);
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
