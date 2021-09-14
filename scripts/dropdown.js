import { stateCodes } from "./tools/StateCodes.js";
import { settings } from "./Settings.js";
import { updateActiveTrip } from "./main.js";
import { getCity, getParkNameByCode } from "./parks/ParkDataManager.js";
import { getWeather } from "./weather/WeatherDataManager.js";

const key = settings.npsKey;

//StateCode DropDown
export const createStateDrop = () => {
    //initialize dropdown with value of element 'dropState'
    let dropdown = document.getElementById("dropState");
    dropdown.length = 0;
    //initialize defaultOption by creating an option element and setting that option text equal to 'Choose A State'
    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("selected", "");
    defaultOption.setAttribute("disabled", "");
    defaultOption.setAttribute("value", "0");
    defaultOption.text = "Choose A State";
    //add the initial option element to the dropdown menu and set index to that option
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    for (let i = 0; i < stateCodes.length; i++) {
        let option = document.createElement("option");
        option.text = stateCodes[i];
        dropdown.add(option);
    }
};

//Park DropDown
export const createDropDownPark = (input) => {
    //initialize dropdown with value of element 'dropPark'
    let dropdown = document.getElementById("dropPark");
    dropdown.length = 0;
    //initialize defaultOption by creating an option element and setting that option text equal to 'Choose A Park'
    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("selected", "");
    defaultOption.setAttribute("disabled", "");
    defaultOption.setAttribute("value", "0");

    defaultOption.text = "Choose A Park";
    console.log(dropdown);

    //add the initial option element to the dropdown menu and set index to that option
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    //initialize variable url to the fetch call
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${key}`;

    fetch(url).then(function (response) {
        // Examine the text in the response
        response.json().then(function (dataVar) {
            let option;

            for (let i = 0; i < dataVar.data.length; i++) {
                option = document.createElement("option");
                option.text = dataVar.data[i].fullName;
                option.value = dataVar.data[i].parkCode;
                dropdown.add(option);
            }
        });
    });
};

//Park DropDown Frame
export const createDropdownParkFrame = () => {
    return `
    <select name="dropPark" id="dropPark">
       <option selected disabled>Choose A Park</option>         
    </select>
    `;
};

//Eateries DropDown
export const createDropDownEat = () => {
    //initialize dropdown with value of element 'dropEat'
    let dropdown = document.getElementById("dropEat");
    dropdown.length = 0;
    //initialize defaultOption by creating an option element and setting that option text equal to 'Choose A Eaterie'
    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("selected", "");
    defaultOption.setAttribute("disabled", "");
    defaultOption.setAttribute("value", "0");

    defaultOption.text = "Choose An Eatery";
    //add the initial option element to the dropdown menu and set index to that option
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    //initialize variable url to the fetch call
    const url = "http://holidayroad.nss.team/eateries";

    fetch(url).then(function (response) {
        // Examine the text in the response
        response.json().then(function (data) {
            let option;

            for (let i = 0; i < data.length; i++) {
                option = document.createElement("option");
                option.text = data[i].businessName;
                dropdown.add(option);
            }
        });
    });
};

//Bizarreries DropDown
export const createDropDownBiz = () => {
    //initialize dropdown with value of element 'dropEat'
    let dropdown = document.getElementById("dropBiz");
    dropdown.length = 0;
    //initialize defaultOption by creating an option element and setting that option text equal to 'Choose A Bizarrerie'
    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("selected", "");
    defaultOption.setAttribute("disabled", "");
    defaultOption.setAttribute("value", "0");

    defaultOption.text = "Choose A Bizarrerie";
    //add the initial option element to the dropdown menu and set index to that option
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    //initialize variable url to the fetch call
    const url = "http://holidayroad.nss.team/bizarreries";

    fetch(url).then(function (response) {
        // Examine the text in the response
        response.json().then(function (data) {
            let option;

            for (let i = 0; i < data.length; i++) {
                option = document.createElement("option");
                option.text = data[i].name;
                dropdown.add(option);
            }
        });
    });
};

export const createEventListenerDropDown = () => {
    //get element statements
    const contentElement = document.getElementById("container");
    const populateDropDown = document.getElementById("parkDropDown");
    const parkNamePreview = document.getElementById("parkPreview");
    const eatNamePreview = document.getElementById("eatPreview");
    const bizNamePreview = document.getElementById("bizPreview");

    populateDropDown.innerHTML = createDropdownParkFrame();

    //Dropdown event listener
    let state;
    let parkId;
    let eat;
    let biz;
    contentElement.addEventListener("change", (event) => {
        switch (event.target.id) {
            case "dropState":
                state = event.target.value;
                console.log(state);
                createDropDownPark(state);
                break;
            case "dropPark":
                parkId = event.target.value;
                
                //Fix used to gather parkCode as value while also having the Full name of the park for local api and display
                const parkName = getParkNameByCode(parkId).then(parkFullName => {
                    console.log(parkFullName);
                    updateActiveTrip("parkId", parkFullName);
                    parkNamePreview.innerHTML = parkFullName;
                });

                //Used to get Weather from API using City Name
                const getCityVar = getCity(parkId).then(cityName => {
                    const getWeatherVar = getWeather(cityName).then(fiveDayWeather => {
                        console.log(fiveDayWeather);
                    })
                })
                break;
            case "dropEat":
                eat = event.target.value;
                console.log(eat);
                updateActiveTrip("eateryIds", eat);
                eatNamePreview.innerHTML = eat;
                break;
            case "dropBiz":
                biz = event.target.value;
                console.log(biz);
                updateActiveTrip("bazararieIds", biz);
                bizNamePreview.innerHTML = biz;
                break;
        }
    });
};

export const runDropdown = () => {
    createEventListenerDropDown();
    createDropDownBiz();
    createDropDownEat();
    createStateDrop();
};

// reset dropdown values to defaults and remove parkDropDown
export const resetTripSelection = () => {
    console.log("resetting");

    const parkDropDown = document.getElementById("parkDropDown");
    const stateDropDown = document.getElementById("dropState");
    const eatDropDown = document.getElementById("dropEat");
    const bizDropDown = document.getElementById("dropBiz");

    const parkNamePreview = document.getElementById("parkPreview");
    const eatNamePreview = document.getElementById("eatPreview");
    const bizNamePreview = document.getElementById("bizPreview");

    // reset parkDropdown
    const populateDropDown = document.getElementById("parkDropDown");
    populateDropDown.innerHTML = createDropdownParkFrame();
    parkNamePreview.innerHTML = "National Park Name";
    eatNamePreview.innerHTML = "Eatery Name";
    bizNamePreview.innerHTML = "Bizzarerie Name";

    // set remaining dropdowns to default values
    stateDropDown.value = 0;
    eatDropDown.value = 0;
    bizDropDown.value = 0;
};
