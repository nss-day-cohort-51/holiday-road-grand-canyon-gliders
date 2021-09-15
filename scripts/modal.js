import { getParkData } from "./main.js";
import { getEateryData } from "./main.js";
import { getBizarrerieData } from "./main.js";

const formatPhoneNumber = (obj) => {
    console.log("obj argument is: ", (typeof obj));
    const origNum = obj;
    console.log("origNum is: ", origNum);
    const arrayOfDigits = Array.from(String(origNum), Number);
    console.log("arrayOfDigits is: ", arrayOfDigits)
    arrayOfDigits.splice(0, 0, "(");
    console.log("arrayOfDigits after splice1 is now: ", arrayOfDigits)
    arrayOfDigits.splice(4, 0, ") ");
    arrayOfDigits.splice(8, 0, "-");
    console.log("arrayOfDigits after splice2 is now: ", arrayOfDigits)
    const formattedPhoneNumber = arrayOfDigits.join("");
    console.log("formattedPhoneNumber after join: ", formattedPhoneNumber);
    return formattedPhoneNumber;
}

export const parkDetailsInsert = (parkData) => {
    const parkNum = parkData.contacts.phoneNumbers[0].phoneNumber;
    const dashedNum = formatPhoneNumber(parkNum);
    return `                        
      <div class="modal-content">
        <span class="close-modal" id="close-modal--${parkData.Id}">&times;</span>
        <h2>${parkData.fullName}</h2>

        <div class="address">
            <div class="modal-bold">Address:  </div>
            <div>${parkData.addresses[0].line1}, ${parkData.addresses[0].city} ${parkData.addresses[0].stateCode}</div>
        </div> <!-- closes address-->

        <div class="phone-number">
            <div class="modal-bold">Phone Number: </div>
            <div>${dashedNum}</div>
        </div> <!-- closes wheelchair-->

        <div class="fees">
            <div class="modal-bold">Entrance Fee: </div>
            <div>\$${parkData.entranceFees[0].cost}</div>
        </div> <!-- closes fees-->

        <p>${parkData.description}</p>
      </div> <!-- closes modal-content -->
      `
};

export const eatDetailsInsert = (eatData) => {
    return `                        
      <div class="modal-content">
        <span class="close-modal" id="close-modal--${eatData.Id}">&times;</span>
        <h2>${eatData.businessName}</h2>

        <div class="location">
            <div class="modal-bold">Location: </div>
            <div class="city-state">${eatData.city}, ${eatData.state}</div> <!-- closes -->
        </div> <!-- closes location-->

        <div class="wheelchair">
            <div class="modal-bold">WheelChair Accessible: </div>
            <div>${eatData.ameneties.wheelchairAccessible}</div>
        </div> <!-- closes wheelchair-->

        <div class="pets">
            <div class="modal-bold">Pet Friendly: </div>
            <div>${eatData.ameneties.petFriendly}</div>
        </div> <!-- closes pets-->

        <div class="wifi">
            <div class="modal-bold">Wifi: </div>
            <div>${eatData.ameneties.wifi}</div>
        </div> <!-- closes wifi-->

        <p>${eatData.description}</p>
      </div> <!-- closes modal-content -->
      `
};

export const bizDetailsInsert = (bizData) => {
    return `                        
      <div class="modal-content">
        <span class="close-modal" id="close-modal--${bizData.Id}">&times;</span> 
        <h2>${bizData.name}</h2>

        <div class="location">
            <div class="modal-bold">Location: </div>
            <div class="city-state">${bizData.city}, ${bizData.state}</div> <!-- closes -->
        </div> <!-- closes location-->

        <p>${bizData.description}</p>
      </div> <!-- closes modal-content -->
      `
};

export const runModal = () => {

    // Get the modal
    const modal = document.getElementById("modal");

    document.addEventListener("click", (event) => {
        if (event.target.id.startsWith("detail-button")) {
            console.log("detail button clicked");
            const buttonId = event.target.id.split("--")[1];
            // modal display for the given feature
            if (buttonId === "eat") {
                getEateryData();
            }
            else if (buttonId === "biz") {
                getBizarrerieData();
            }
            else if (buttonId === "park") {
                getParkData();
            }
        }
        if (event.target.id.startsWith("close-modal")) {
            console.log("modal X clicked");
            modal.style.display = "none";
        }
    });
};


    // When the user clicks the button, open the modal

    // parkBtn.onclick = function () {
    //     modal.style.display = "block";
    // };

    // eatBtn.onclick = function () {
    //     eatModal.style.display = "block";
    // };

    // bizBtn.onclick = function () {
    //     bizModal.style.display = "block";
    // };

    // When the user clicks on <span> (x), close the modal
    // spanPark.onclick = function () {
    //     modal.style.display = "none";
    // };

    // spanEats.onclick = function () {
    //     eatModal.style.display = "none";
    // };

    // spanBiz.onclick = function () {
    //     bizModal.style.display = "none";
    // };
    // TODO reintroduce modal closing when you click out of window
    // // When the user clicks anywhere outside of the modal, close it



    // window.onclick = function (event) {
    //     switch (event.target.id) {
    //         case modal:
    //             modal.style.display = "none";




            // case eatModal:
            //     eatModal.style.display = "none";
            // case bizModal:
            //     bizModal.style.display = "none";
    //     }
    // };

    // ************* END THE  MODAL JS *******************

    // // Get the modal
// const modal = document.getElementById("modal");

// // Get the button that opens the modal
// const parkBtn = document.getElementById("detail-button--park");

// // Get the <span> element that closes the modal
// const span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// parkBtn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// document.addEventListener("click", (event) => {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// });

// const modalDetailsInsert = (modalId) => {
//     return `                        
//       <div class="modal-content">
//         <span class="close-modal" id="close-modal--${modalId}">&times;</span>
//         <h2>${modalId} NAME GOES HERE</h2>
//         <p>All the info about the ${modalId} the user chose from the dropdown menu goes here. If you click on the X or anywhere that's not on this popup, it will close this window.</p>
//       </div> <!-- closes modal-content -->
//       `
// };
// };
