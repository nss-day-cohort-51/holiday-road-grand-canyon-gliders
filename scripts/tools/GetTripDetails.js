export const getTripDetails = (tripObj) => {
    let tripDetails = { parkName: null, bazName: null, eatName: null };
    const parksUrl = `https://developer.nps.gov/api/v1/parks?id=${tripObj.parkId}&api_key=${key}`;
    const bizUrl = `http://holidayroad.nss.team/bizarreries?id=${tripObj.bazararieIds[0]}`;
    const eatUrl = `http://holidayroad.nss.team/eateries?id=${tripObj.eateryIds[0]}`;
    return fetch(parksUrl)
        .then((response) => response.json())
        .then((parsedResponse) => {
            tripDetails.parkName = parsedResponse.data[0].fullName;
            return parsedResponse;
        })
        .then(() => {
            fetch(bizUrl)
                .then((response) => response.json())
                .then((parsedResponse) => {
                    tripDetails.bizName = parsedResponse[0].name;
                    return parsedResponse;
                })
                .then(() => {
                    fetch(eatUrl)
                        .then((response) => response.json())
                        .then((parsedResponse) => {
                            tripDetails.eatName = parsedResponse[0].name;
                            return parsedResponse;
                        });
                });
        });
};
