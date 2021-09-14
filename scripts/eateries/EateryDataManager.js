import { updateActiveTrip } from "../main.js";
//Export for Eateries
export const getEateries = () => {
    return fetch("http://holidayroad.nss.team/eateries")
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}

export const getEatNameById = (eatId) => {
    return fetch(`http://holidayroad.nss.team/eateries/?id=${eatId}`)
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}

export const onEatChanged = (eat) => {
    const eatNamePreview = document.getElementById("eatPreview");

    const getEatVar = getEatNameById(eat).then(eatName => {
        console.log(eatName[0].businessName);
        eatNamePreview.innerHTML = eatName[0].businessName;
    })
    updateActiveTrip("eateryIds", eat);
}

