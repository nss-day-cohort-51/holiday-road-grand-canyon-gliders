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

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

const modalDetailsInsert = (modalId) => {
    return `                        
      <div class="modal-content">
        <span class="close-modal" id="close-modal--${modalId}">&times;</span>
        <h2>${modalId} NAME GOES HERE</h2>
        <p>All the info about the ${modalId} the user chose from the dropdown menu goes here. If you click on the X or anywhere that's not on this popup, it will close this window.</p>
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
            modal.innerHTML = modalDetailsInsert(buttonId);
            modal.style.display = "block";
        }
        if (event.target.id.startsWith("close-modal")) {
            console.log("modal X clicked");
            modal.style.display = "none";
        }
    });
}