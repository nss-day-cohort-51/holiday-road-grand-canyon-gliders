import { settings } from "../Settings.js";
import { returnActiveTripState } from "../main.js";

export const getParks = (input) => {
    const key = settings.npsKey;
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${key}`;

    return fetch(url)
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse;
        });
};

export const getTrips = () => {
    //get local trip state
    return fetch("http://localhost:8088/trips").then((response) => {
        return response.json().then((parsedResponse) => {
            return parsedResponse;
        });
    });
};

export const getSingleTripByDirectionId = (input) => {
    //get local trip state
    return fetch(`http://localhost:8088/trips/?directionId=${input}`).then(
        (response) => {
            return response.json().then((parsedResponse) => {
                console.log(parsedResponse);

                return parsedResponse;
            });
        }
    );
};

export const getAllParks = (Id) => {
    const key = settings.npsKey;
    const url = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${key}`;

    return fetch(url)
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse.data;
        });
};

export const getParkById = (Id) => {
    const key = settings.npsKey;
    const url = `https://developer.nps.gov/api/v1/parks?id=${Id}&api_key=${key}`;

    return fetch(url)
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse.data[0];
        });
};

//Export for Bizarreries
export const getBizarreries = () => {
    return fetch("http://holidayroad.nss.team/bizarreries")
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse;
        });
};

//Export for Eateries
export const getEateries = () => {
    return fetch("http://holidayroad.nss.team/eateries")
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse;
        });
};

export const putTripCall = () => {
    //get local trip state
    const activeTrip = returnActiveTripState();

    const postObject = {
        userId: 1, // hardcode the user as 1 until it's created
        timestamp: Date.now(),
        parkId: activeTrip.parkId,
        // bazararieIds: activeTrip.bazararieIds,
        // eateryIds: activeTrip.eateryIds,
        directionId:
            activeTrip.parkId +
            activeTrip.bazararieIds +
            "A" +
            activeTrip.eateryIds,
    };
    console.log(postObject);

    return fetch("http://localhost:8088/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postObject),
    })
        .then((response) => response.json())
        .then((tripObj) => {
            // for (const bizId of activeTrip.bazararieIds) {
            //     fetch("http://localhost:8088/joins", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify({
            //             tripId: tripObj.id,
            //             bizId: parseInt(bizId),
            //         }),
            //     });
            // }
            fetch("http://localhost:8088/joins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    activeTrip.bazararieIds.map((bizId) => {
                        return { tripId: tripObj.id, bizId: parseInt(bizId) };
                    })
                ),
            });

            // for (const eatId of activeTrip.eateryIds) {
            //     fetch("http://localhost:8088/joins", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify({
            //             tripId: tripObj.id,
            //             eatId: parseInt(eatId),
            //         }),
            //     });
            // }
            // for (const eatId of activeTrip.eateryIds) {
            fetch("http://localhost:8088/joins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    activeTrip.eateryIds.map((eatId) => {
                        return { tripId: tripObj.id, eatId: parseInt(eatId) };
                    })
                ),
            });
            // }
        });
};

export const getBizarreryById = (id) => {
    return fetch(`http://holidayroad.nss.team/bizarreries?id=${id}`)
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse[0];
        });
};

export const getEateryById = (id) => {
    return fetch(`http://holidayroad.nss.team/eateries?id=${id}`)
        .then((response) => response.json())
        .then((parsedResponse) => {
            return parsedResponse[0];
        });
};

export const getBizarreriesByIdArray = (idArray) => {
    // id query string should be a
    let idQueryString = "?";
    idArray.forEach((id) => {
        //add an id for each id in the array
        idQueryString += `id=${id}&`;
    });
    // remove the last '&'
    idQueryString = idQueryString.slice(0, -1);

    return fetch(`http://holidayroad.nss.team/bizarreries${idQueryString}`)
        .then((response) => response.json())
        .then((parsedResponse) => {
            // console.log("idArray", idArray);

            if (idArray == []) return {};
            else return parsedResponse;
        });
};

export const getEateriesByIdArray = (idArray) => {
    // id query string should be a
    let idQueryString = "?";
    idArray.forEach((id) => {
        //add an id for each id in the array
        idQueryString += `id=${id}&`;
    });
    // remove the last '&'
    idQueryString = idQueryString.slice(0, -1);

    return fetch(`http://holidayroad.nss.team/eateries${idQueryString}`)
        .then((response) => response.json())
        .then((parsedResponse) => {
            if (idArray == []) return {};
            else return parsedResponse;
        });
};
