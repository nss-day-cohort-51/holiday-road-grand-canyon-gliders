import { createStateDrop, createDropDownPark, createDropdownParkFrame, createDropDownBiz, createDropDownEat} from "./dropdown.js"

 //get element statements
const contentElement = document.getElementById("container");
const populateDropDown = document.getElementById("drop-list")

//Dropdown event listener
let state;
let park;
let eat;
let biz;
contentElement.addEventListener("change", event => {
    switch (event.target.id){
        case "dropState":
            state = event.target.value;
            console.log(state)
            populateDropDown.innerHTML = createDropdownParkFrame();
            createDropDownPark(state);
            break;
        case "dropPark":
            park = event.target.value;
            console.log(park);
            break;
        case "dropEat":
            eat = event.target.value;
            console.log(eat);
            break;
        case "dropBiz":
            biz = event.target.value;
            console.log(biz);
            break;
    }
})


const runProgram = () => {
    createDropDownBiz();
    createDropDownEat();
    createStateDrop();
}

runProgram();