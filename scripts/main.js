import { resetTripSelection, runDropdown } from "./dropdown.js";
import { runModal, eatDetailsInsert, bizDetailsInsert, parkDetailsInsert } from "./modal.js";
import { putTripCall } from "./data/DataManager.js";
import { getParkByCode } from "./parks/ParkDataManager.js";
import { getEatNameById } from "./eateries/EateryDataManager.js";
import { getBizNameById } from "./bizarreries/BizarreriesDataManager.js";
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

export const getParkData = () => {
    const parkModalPopup = document.getElementById("modal");   
    const userPark = activeTripState.parkId;
    console.log("userPark is: ", userPark);
    const userParkData = getParkByCode(userPark).then(parkData => {
        console.log("park name is: ", parkData.fullName);
        parkModalPopup.innerHTML = parkDetailsInsert(parkData);
        modal.style.display = "block"; 
    });
}

export const getEateryData = () => {
    const eatModalPopup = document.getElementById("modal");   
    const userEats = activeTripState.eateryIds[0];
    console.log("userEats is: ", userEats);
    const userEatsData = getEatNameById(userEats).then(eatData => {
        console.log("eatery business name is: ", eatData[0].businessName);
        eatModalPopup.innerHTML = eatDetailsInsert(eatData[0]);
        modal.style.display = "block"; 
    });
}

export const getBizarrerieData = () => {
    const bizModalPopup = document.getElementById("modal");   
    const userBiz = activeTripState.bazararieIds[0];
    console.log("userBiz is: ", userBiz);
    const userBizData = getBizNameById(userBiz).then(bizData => {
        console.log("biz business name is: ", bizData[0].businessName);
        bizModalPopup.innerHTML = bizDetailsInsert(bizData[0]);
        modal.style.display = "block"; 
    });
}

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
    saveButtonElement.style["background-color"] = "#85C1BF";

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
