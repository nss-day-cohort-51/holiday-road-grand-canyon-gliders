import { resetTripSelection, runDropdown } from "./dropdown.js";
import { runModal } from "./modal.js";

runDropdown();
runModal();

// saveActive trip while still being filled out
let activeTripState = {
    parkId: null,
    bazararieIds: [],
    eateryIds: [],
    completed: false,
};

// update the state of the activeTrip
export const updateActiveTrip = (attribute, value) => {
    switch (attribute) {
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
    saveButtonElement.style.backround = "green";

    // clear activeTripState
    activeTripState = {
        parkId: null,
        bazararieIds: [],
        eateryIds: [],
        completed: false,
    };

    saveButtonElement.addEventListener("click", () => {
        // reset trip selection on SaveTrip
        resetTripSelection();
    });
    // setDropdown value's to default
};
