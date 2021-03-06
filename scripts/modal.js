import { getParkData } from "./main.js";
import { getEateryData } from "./main.js";
import { getBizarrerieData } from "./main.js";
import { returnActiveTripState } from "./main.js";

const formatPhoneNumber = (obj) => {
    if (obj.length == 10) {
    const origNum = obj;
    const arrayOfDigits = Array.from(String(origNum), Number);
    arrayOfDigits.splice(0, 0, "(");
    arrayOfDigits.splice(4, 0, ") ");
    arrayOfDigits.splice(8, 0, "-");
    const formattedPhoneNumber = arrayOfDigits.join("");
    return formattedPhoneNumber;
    } else return obj;
};

const checkCost = (input) => {
    if (input == 0) return "Free";
    else return "$" + input;
};

export const parkDetailsInsert = (parkData) => {
    const parkNum = parkData.contacts.phoneNumbers[0].phoneNumber;
    const dashedNum = formatPhoneNumber(parkNum);
    
    return `                        
      <div class="modal-content">
        <span class="close-modal" id="close-modal--${
            parkData.Id
        }">&times;</span>
        <h2>${parkData.fullName}</h2>

        <div class="park-img">
            <img src=${parkData.images[0].url != undefined ? parkData.images[0].url : "https://www.nps.gov/common/commonspot/templates/images/logos/nps_social_image_02.jpg"} alt="National Park Logo"/>
        </div> <!-- closes park-img-->

        <div class="address">
            <div class="modal-bold">Address:  </div>
            <div>${parkData.addresses[0].line1}, 
            ${parkData.addresses[0].city} 
            ${parkData.addresses[0].stateCode}
            </div>
        </div> <!-- closes address-->

        <div class="phone-number">
            <div class="modal-bold">Phone Number: </div>
            <div>${dashedNum}</div>
        </div> <!-- closes wheelchair-->

        <div class="fees">
            <div class="modal-bold">Entrance Fee: </div>
            <div>${checkCost(parkData.entranceFees[0].cost)}</div>
        </div> <!-- closes fees-->

        <p>${parkData.description}</p>
      </div> <!-- closes modal-content -->
      `;
};

const readBool = (input) => {
    if (input) return "Yes";
    else return "No";
};

export const eatDetailsInsert = (eatData) => {
    return `                        
      <div class="modal-content">
        <span class="close-modal" id="close-modal--${eatData.Id}">&times;</span>
        <h2>${eatData.businessName}</h2>

        <div class="location">
            <div class="modal-bold">Location: </div>
            <div class="city-state">${eatData.city}, ${
        eatData.state
    }</div> <!-- closes -->
        </div> <!-- closes location-->

        <div class="wheelchair">
            <div class="modal-bold">WheelChair Accessible: </div>
            <div>${readBool(eatData.ameneties.wheelchairAccessible)}</div>
        </div> <!-- closes wheelchair-->

        <div class="pets">
            <div class="modal-bold">Pet Friendly: </div>
            <div>${readBool(eatData.ameneties.petFriendly)}</div>
        </div> <!-- closes pets-->

        <div class="wifi">
            <div class="modal-bold">Wifi: </div>
            <div>${readBool(eatData.ameneties.wifi)}</div>
        </div> <!-- closes wifi-->

        <p>${eatData.description}</p>
      </div> <!-- closes modal-content -->
      `;
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
      `;
};

const formatDate = (obj) => {
    const dateStr = new Date(obj);
    const formattedDate = dateStr.toDateString();
    return formattedDate;
}

export const runModal = () => {
    // Get the modal
    const modal = document.getElementById("modal");

    const tripState = returnActiveTripState();

    document.addEventListener("click", (event) => {
        if (event.target.id.startsWith("detail-button")) {
            console.log("detail button clicked");
            const buttonId = event.target.id.split("--")[1];
            // modal display for the given feature
            if (buttonId === "eat" && tripState.eateryIds != []) {
                getEateryData();
            } else if (buttonId === "biz" && tripState.bazararieIds != []) {
                getBizarrerieData();
            } else if (buttonId === "park" && tripState.parkId != null) {
                getParkData();
            }
        }
        if (event.target.id.startsWith("close-modal")) {
            modal.style.display = "none";
        }
        if(event.target.id == "modal"){
            modal.style.display = "none";
        }
    });
};

let fee;
let time;

export const printEventsModal = (input) => {

    let fullUrl = "https://www.nps.gov/common/commonspot/templates/images/logos/nps_social_image_02.jpg"
    if (input.images[0] != undefined) {
        const urlPrefix = "https://www.nps.gov"
        const imgUrl = input.images[0].url;
        fullUrl = urlPrefix + imgUrl;  
    }

    if(input.feeinfo == ""){
        fee = "No info available"
    }else{
        fee = input.feeinfo;
    }

    if(input.times[0].timestart == ""){
        time = "No info available";
    }else{
        time = input.times[0].timestart + "-" + input.times[0].timeend;
    }

    return `                       
        <div class="modal-content">
            <div class="dates">

                <span class="close-modal" id="close-modal--events">&times;</span> 
                <h2>Events</h2>
                <h3>${input.parkfullname}</h3>

                <div class="event-img">
                <img src=${fullUrl} alt="National Park Logo"/>
            </div> <!-- closes event-img-->

                <div class="event-info">
                    <div class="event-date-time">
                        <div class="modal-bold">Date: </div>
                        <div class="event-date"> ${formatDate(input.datestart)}</div>
                    </div> <!-- closes event-date-time -->

                    <div class="event-date-time">
                        <div class="modal-bold">Time: </div>
                        <div class="event-time"> ${time}</div>
                    </div> <!-- closes event-date-time-->

                    <div class="fees">
                        <div class="modal-bold">Fee Info: </div>
                        <div class="event-fee">${fee}</div>
                    </div> <!-- closes fees-->

                    <section class="scroll-spacer">
                        <div class="event-description">${input.description}</div>
                    </section> <!-- closes scroll-spacer-->
                </div> <!-- closes event-info -->

            </div> <!-- closes dates-->
        </div> <!-- closes modal-content -->
    `
}

export const printEventsModalNone = () => {

    return `                        
    <div class="modal-content">
    <span class="close-modal" id="close-modal--events">&times;</span> 
      <div class="dates">
        <h2>No Events</h2>
        <div class="modal-bold-invalid">No current events for this park</div>
    </div> <!-- closes modal-content -->
    `
}

export const printDirectionsModal = () => {

    return `                        
    <div class="modal-content">
      <div class="dates">
      <span class="close-modal" id="close-modal--events">&times;</span> 
      <h2>Directions</h2>
        <ul class="directions-list">
            
        </ul>
    </div> <!-- closes modal-content -->
    `

}

export const printDirectionsModalNone = () => {

    return `                        
    <div class="modal-content">
    <span class="close-modal" id="close-modal--events">&times;</span> 
      <div class="dates">
        <h2>Unable To Provide Directions</h2>
        <div class="modal-bold-invalid">Either permission for location has been rejected or the coordinates can not be directly accessed by road</div>
    </div> <!-- closes modal-content -->
    `

}
