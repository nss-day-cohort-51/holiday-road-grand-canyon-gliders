import { returnActiveTripState } from "./main.js";
import {
    parkDetailsInsert,
    bizDetailsInsert,
    eatDetailsInsert,
} from "./cards/modals.js";
import { getEatNameById } from "./eateries/EateryDataManager.js";
import { getBizNameById } from "./bizarreries/BizarreriesDataManager.js";
import { getParkById } from "./parks/ParkDataManager.js";

export const runModal = () => {
    // Get the modal
    const modal = document.getElementById("modal");

    const tripState = returnActiveTripState();

    document.addEventListener("click", (event) => {
        if (event.target.id.startsWith("detail-button")) {
            console.log("detail button clicked");
            const buttonId = event.target.id.split("--")[1];
            // modal display for the given feature
            if (buttonId === "eat" && tripState.eateryIds != []) {
                getEateryData();
            } else if (buttonId === "biz" && tripState.bazararieIds != []) {
                getBizarrerieData();
            } else if (buttonId === "park" && tripState.parkId != null) {
                getParkData();
            }
        }
        if (event.target.id.startsWith("close-modal")) {
            modal.style.display = "none";
        }
        if (event.target.id == "modal") {
            modal.style.display = "none";
        }
    });
};

// get park data and populate park modal popup
export const getParkData = () => {
    const parkModalPopup = document.getElementById("modal");
    const userPark = returnActiveTripState().parkId;

    // populate modal
    getParkById(userPark).then((parkData) => {
        parkModalPopup.innerHTML = parkDetailsInsert(parkData);
        modal.style.display = "block";
    });
};

// get eatery data and populate eatery modal popup
export const getEateryData = () => {
    const eatModalPopup = document.getElementById("modal");
    const userEats = returnActiveTripState().eateryIds.at(-1);

    // populate modal
    getEatNameById(userEats).then((eatData) => {
        eatModalPopup.innerHTML = eatDetailsInsert(eatData[0]);
        modal.style.display = "block";
    });
};

// get bizarrerie data and populate bizarrerie modal popup
export const getBizarrerieData = () => {
    const bizModalPopup = document.getElementById("modal");
    const userBiz = returnActiveTripState().bazararieIds.at(-1);

    // populate modal
    getBizNameById(userBiz).then((bizData) => {
        bizModalPopup.innerHTML = bizDetailsInsert(bizData[0]);
        modal.style.display = "block";
    });
};
