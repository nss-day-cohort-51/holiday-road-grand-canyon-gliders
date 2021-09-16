// TEST
import { collapseSavedTrips } from "./eventHandlers/EventHandlers.js";
import { readCollapsed } from "./main.js";

const collapseButtonElem = document.getElementById(
    "saved-trips__collapse-button"
);

collapseButtonElem.addEventListener("click", (event) => {

    collapseSavedTrips();
    // if collapsed
    const collapseButtonShowTextElem = document.getElementById(
        "collapse-button--transition-show"
    );
    const collapseButtonHideTextElem = document.getElementById(
        "collapse-button--transition-hide"
    );
    if (readCollapsed()) {
        // if collapsed
        collapseButtonShowTextElem.style["animation-name"] = "FadeOut";
        collapseButtonShowTextElem.style["opacity"] = 0;
        collapseButtonHideTextElem.style["animation-name"] = "FadeIn";
        collapseButtonHideTextElem.style["opacity"] = 1;
    } else {
        // if not collapsed
        collapseButtonShowTextElem.style["animation-name"] = "FadeIn";
        collapseButtonShowTextElem.style["opacity"] = 1;
        collapseButtonHideTextElem.style["animation-name"] = "FadeOut";
        collapseButtonHideTextElem.style["opacity"] = 0;
    }
});

