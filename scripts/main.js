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
    if (event.target == parkModal) {
    parkModal.style.display = "none";
    } else if (event.target == eatModal) {
        eatModal.style.display = "none";
      } else if (event.target == bizModal) {
            bizModal.style.display = "none";
        }
}

// ************* END THE  MODAL JS *******************