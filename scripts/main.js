import { resetTripSelection, runDropdown } from "./dropdown.js";
import {
    getBizarreryById,
    getTrips,
    putTripCall,
    getParkById,
} from "./data/DataManager.js";
import {
    runModal,
    eatDetailsInsert,
    bizDetailsInsert,
    parkDetailsInsert,
} from "./modal.js";
import { getParkByCode } from "./parks/ParkDataManager.js";
import { getEatNameById } from "./eateries/EateryDataManager.js";
import { getBizNameById } from "./bizarreries/BizarreriesDataManager.js";
import { updateSavedTrips } from "./SavedTrips.js";
import {
    directionLiteral,
    getDirections,
} from "./directions/DirectionDataManager.js";

export const returnActiveTripState = () => {
    const activeTripStateCopy = activeTripState;
    return activeTripStateCopy;
};

//used for current location
let currentLat;
let currentLong;

//Lines 22-29 used for gaining permission for location
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
    const userParkData = getParkById(userPark).then((parkData) => {
        parkModalPopup.innerHTML = parkDetailsInsert(parkData);
        modal.style.display = "block";
    });
};

export const getEateryData = () => {
    const eatModalPopup = document.getElementById("modal");
    const userEats = activeTripState.eateryIds.at(-1);
    const userEatsData = getEatNameById(userEats).then((eatData) => {
        eatModalPopup.innerHTML = eatDetailsInsert(eatData[0]);
        modal.style.display = "block";
    });
};

export const getBizarrerieData = () => {
    const bizModalPopup = document.getElementById("modal");
    const userBiz = activeTripState.bazararieIds.at(-1);
    const userBizData = getBizNameById(userBiz).then((bizData) => {
        bizModalPopup.innerHTML = bizDetailsInsert(bizData[0]);
        modal.style.display = "block";
    });
};

// update the state of the activeTrip
export const updateActiveTrip = (attribute, value) => {
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
};

const activateSaveTripButton = () => {
    const saveButtonElement = document.querySelector(".save-trip-btn");
    // change cursor of save button on hover if active
    saveButtonElement.style.cursor = "pointer";
    saveButtonElement.style["background-color"] = "#85C1BF";

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

runDropdown();
runModal();
// populate Saved Trips
updateSavedTrips();

//
//
// Tab Inserton
//
//

// import { getBizarreries } from "./bizarreries/BizarreriesDataManager.js";
// import { getEateries } from "./eateries/EateryDataManager.js";
// import { getParks } from "./parks/ParkDataManager.js";
// import { collapseSavedTrips } from "./eventHandlers/EventHandlers.js";
import "./collapse.js";

let collapsed = false;
export const changeCollapsed = () => {
    collapsed ? (collapsed = false) : (collapsed = true);
};

export const readCollapsed = () => {
    return collapsed == true;
};

// getEateries().then((eatery) => {
//     console.log(eatery);
// });

// getBizarreries().then((bizarries) => {
//     console.log(bizarries);
// });

// getParks("TX").then((parks) => {
//     console.log(parks.data);
// });
