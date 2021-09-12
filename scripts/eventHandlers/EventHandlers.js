import { changeCollapsed, readCollapsed } from "../main.js";

export const collapseSavedTrips = () => {
    console.log(readCollapsed());

    if (readCollapsed()) {
        const savedTripsElem = document.querySelector(".saved-trips");
        savedTripsElem.style["width"] = "0";
        changeCollapsed();
        savedTripsElem.style["flex"] = "0";
        // savedTripsElem.style["width"] = "";
        // console.log(savedTripsElem.style["width"]);
    } else {
        const savedTripsElem = document.querySelector(".saved-trips");
        savedTripsElem.style["width"] = "";
        changeCollapsed();
        savedTripsElem.style["flex"] = "1";
        // savedTripsElem.style["width"] = "";
        // console.log("clicked");
        // console.log(savedTripsElem.style["width"]);
    }
};
