// Get the modal
var parkModal = document.getElementById("parkModal");

// Get the button that opens the modal
var parkBtn = document.getElementById("park-detail-btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
parkBtn.onclick = function() {
  parkModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  parkModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    parkModal.style.display = "none";
  }
}