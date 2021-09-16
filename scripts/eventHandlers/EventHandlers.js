import { changeCollapsed, readCollapsed } from "../main.js";

export const collapseSavedTrips = () => {
    console.log(readCollapsed());

    if (readCollapsed()) {
        const savedTripsElem = document.querySelector(".saved-trips");
        savedTripsElem.style["width"] = "0";
        changeCollapsed();
        savedTripsElem.style["flex"] = "";

        // savedTripsElem.style["width"] = "";
        // console.log(savedTripsElem.style["width"]);
    } else {
        const savedTripsElem = document.querySelector(".saved-trips");
        // savedTripsElem.style["width"] = "";
        savedTripsElem.style["max-width"] = "225";
        changeCollapsed();
        savedTripsElem.style["flex"] = "1  1  2% ";
        // savedTripsElem.style["flex"] = "unset   ";

        // savedTripsElem.style["width"] = "";
        // console.log("clicked");
        // console.log(savedTripsElem.style["width"]);
    }
};
