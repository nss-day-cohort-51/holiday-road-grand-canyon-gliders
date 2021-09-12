import { stateCodes } from "./tools/StateCodes.js";
import { settings } from "./Settings.js";

const key = settings.npsKey;

//StateCode DropDown
export const createStateDrop = () => {
    let dropdown = document.getElementById('dropState');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose A State';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;


    for(let i = 0; i < stateCodes.length; i++){
        let option = document.createElement('option');
        option.text = stateCodes[i];
        dropdown.add(option);
    }
}

//Park DropDown
export const createDropDownPark = (input) => {

    let dropdown = document.getElementById('dropPark');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose A Park';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = `https://developer.nps.gov/api/v1/parks?stateCode=${input}&api_key=${key}`;

    fetch(url)
        .then(
            function (response) {
                // Examine the text in the response  
                response.json().then(function (dataVar) {
                    let option;

                     for (let i = 0; i < dataVar.data.length; i++) {
                         option = document.createElement('option');
                         option.text = dataVar.data[i].fullName;
                         dropdown.add(option);
                     }
                });
            }
        )
}

export const createDropdownParkFrame = () => {
    return `
    <select name="dropPark" id="dropPark">
                
    </select>
    `
}

//Eateries DropDown
export const createDropDownEat = () => {

    let dropdown = document.getElementById('dropEat');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose A Eaterie';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://holidayroad.nss.team/eateries';

    fetch(url)
        .then(
            function (response) {
                // Examine the text in the response  
                response.json().then(function (data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].businessName;
                        dropdown.add(option);
                    }
                });
            }
        )
}

//Bizarreries DropDown
export const createDropDownBiz = () => {

    let dropdown = document.getElementById('dropBiz');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose A Bizarrerie';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'http://holidayroad.nss.team/bizarreries';

    fetch(url)
        .then(
            function (response) {
                // Examine the text in the response  
                response.json().then(function (data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].name;
                        dropdown.add(option);
                    }
                });
            }
        )
}