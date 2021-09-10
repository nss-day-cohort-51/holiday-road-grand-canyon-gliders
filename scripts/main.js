import { getBizarreries } from "./bizarreries/BizarreriesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js";
import { getParks } from "./parks/ParkDataManager.js";

getEateries().then(eatery => {
    console.log(eatery);
})

getBizarreries().then(bizarries => {
    console.log(bizarries);
})

getParks("TX").then(parks => {
    console.log(parks.data);
});