import { updateActiveTrip } from "../main.js";
//Export for Bizarreries
export const getBizarreries = () => {
    return fetch("http://holidayroad.nss.team/bizarreries")
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}

export const getBizNameById = (bizId) => {
    return fetch(`http://holidayroad.nss.team/bizarreries/?id=${bizId}`)
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}

export const onBizChanged = (biz) => {
    const bizNamePreview = document.getElementById("bizPreview");

    const getBizVar = getBizNameById(biz).then(bizName => {
            console.log(bizName[0].name);
            bizNamePreview.innerHTML = bizName[0].name;
        })
        updateActiveTrip("bazararieIds", biz);
}