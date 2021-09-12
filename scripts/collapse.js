// TEST
import { collapseSavedTrips } from "./eventHandlers/EventHandlers.js";

document.addEventListener("click", (event) => {
    if (event.target.id === "saved-trips__collapse-button") {
        collapseSavedTrips();
    }
});

console.log("imported");
