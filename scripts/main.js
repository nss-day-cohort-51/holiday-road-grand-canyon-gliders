import { createStateDrop, createDropDownPark, createDropdownParkFrame, createDropDownBiz, createDropDownEat} from "./dropdown.js"

 //get element statements
const contentElement = document.getElementById("container");
const populateDropDown = document.getElementById("parkDropDown")

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



// ************* ALL THE  MODAL JS *******************

// Get the modal
var parkModal = document.getElementById("parkModal");
var eatModal = document.getElementById("eatModal");
var bizModal = document.getElementById("bizModal");

// Get the button that opens the modal
var parkBtn = document.getElementById("park-detail-btn");
var eatBtn = document.getElementById("eat-detail-btn");
var bizBtn = document.getElementById("biz-detail-btn");

// Get the <span> element that closes the modal
var spanPark = document.getElementsByClassName("close-park")[0];
var spanEats = document.getElementsByClassName("close-eats")[0];
var spanBiz = document.getElementsByClassName("close-biz")[0];

// When the user clicks the button, open the modal 
parkBtn.onclick = function() {
  parkModal.style.display = "block";
}

eatBtn.onclick = function() {
  eatModal.style.display = "block";
}

bizBtn.onclick = function() {
  bizModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanPark.onclick = function() {
  parkModal.style.display = "none";
}

spanEats.onclick = function() {
  eatModal.style.display = "none";
}

spanBiz.onclick = function() {
  bizModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  switch(event.target) {
    case parkModal:
      parkModal.style.display = "none";
    case eatModal:
      eatModal.style.display = "none";
    case bizModal:
      bizModal.style.display = "none";
  }
}

// ************* END THE  MODAL JS *******************
