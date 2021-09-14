import { stateCodes } from "./tools/StateCodes.js";
import { settings } from "./Settings.js";
import { updateActiveTrip } from "./main.js";
import { putTripCall } from "./data/DataManager.js";
import { onParkChanged } from "./parks/ParkDataManager.js";
import { getEatNameById, onEatChanged } from "./eateries/EateryDataManager.js";
import {
    getBizNameById,
    onBizChanged,
} from "./bizarreries/BizarreriesDataManager.js";

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
                option.value = data[i].id;
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
                option.value = data[i].id;
                dropdown.add(option);
            }
        });
    });
};

export const createEventListenerDropDown = () => {
    //get element statements
    const contentElement = document.getElementById("container");
    const populateDropDown = document.getElementById("parkDropDown");

    populateDropDown.innerHTML = createDropdownParkFrame();

    //Dropdown event listener
    let state;
    let parkId;
    let eatId;
    let bizId;
    contentElement.addEventListener("change", (event) => {
        switch (event.target.id) {
            case "dropState":
                state = event.target.value;
                console.log(state);
                updateActiveTrip("state", state);
                createDropDownPark(state);
                break;
            case "dropPark":
                parkId = event.target.value;

                onParkChanged(parkId);

                break;

            case "dropEat":
                eatId = event.target.value;

                onEatChanged(eatId);

                break;

            case "dropBiz":
                bizId = event.target.value;

                onBizChanged(bizId);

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
    parkDropDown.innerHTML = createDropdownParkFrame();
    const populateDropDown = document.getElementById("parkDropDown");
    populateDropDown.innerHTML = createDropdownParkFrame();
    parkNamePreview.innerHTML = "National Park Name";
    eatNamePreview.innerHTML = "Eatery Name";
    bizNamePreview.innerHTML = "Bizzarerie Name";

    // set remaining dropdowns to default values
    stateDropDown.value = 0;
    eatDropDown.value = 0;
    bizDropDown.value = 0;

    //remove pointer over SaveTrip button and return to default color to deactivate
    const saveButtonElement = document.querySelector(".save-trip-btn");
    saveButtonElement.style.cursor = "unset";
    saveButtonElement.style["background-color"] = "rgb(235, 235, 235)";
};
