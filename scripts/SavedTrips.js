import { getTrips } from "./data/DataManager.js";
import { savedTripCard } from "./cards/SavedTrip.js";

export const updateSavedTrips = () => {
    const savedTripsELem = document.querySelector(".saved-trips-container");
    getTrips().then((tripObjs) => {
        console.log(tripObjs);

        for (const tripObj of tripObjs) {
            savedTripsELem.innerHTML += savedTripCard(tripObj);
        }
    });
};
