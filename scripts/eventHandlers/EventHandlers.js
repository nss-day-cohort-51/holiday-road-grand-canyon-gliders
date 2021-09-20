import { changeCollapsed, readCollapsed } from "../main.js";

export const collapseSavedTrips = () => {
    if (readCollapsed()) {
        const savedTripsElem = document.querySelector(".saved-trips");

        savedTripsElem.style["width"] = "0";
        savedTripsElem.style["flex"] = "";

        changeCollapsed();
    } else {
        const savedTripsElem = document.querySelector(".saved-trips");

        savedTripsElem.style["width"] = "0";
        savedTripsElem.style["max-width"] = "253x";
        savedTripsElem.style["flex-basis"] = "250px ";

        changeCollapsed();
    }
};
