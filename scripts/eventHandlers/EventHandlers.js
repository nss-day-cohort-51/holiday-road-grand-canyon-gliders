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
        savedTripsElem.style["width"] = "0";
        savedTripsElem.style["max-width"] = "253x";
        changeCollapsed();
        savedTripsElem.style["flex-basis"] = "250px ";
        // savedTripsElem.style["flex"] = "1   ";

        // savedTripsElem.style["width"] = "";
        // console.log("clicked");
        // console.log(savedTripsElem.style["width"]);
    }
};
