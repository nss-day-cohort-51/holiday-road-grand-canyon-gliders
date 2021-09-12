import { getBizarreries } from "./bizarreries/BizarreriesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js";
import { getParks } from "./parks/ParkDataManager.js";
import { collapseSavedTrips } from "./eventHandlers/EventHandlers.js";
import "./collapse.js";

let collapsed = false;
export const changeCollapsed = () => {
    collapsed ? (collapsed = false) : (collapsed = true);
};

export const readCollapsed = () => {
    return collapsed == true;
};

getEateries().then((eatery) => {
    console.log(eatery);
});

getBizarreries().then((bizarries) => {
    console.log(bizarries);
});

getParks("TX").then((parks) => {
    console.log(parks.data);
});
