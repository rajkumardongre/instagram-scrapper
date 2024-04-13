function openModal(msg, closable=false) {
    var modal = document.getElementById("myModal");
    var overlay = document.getElementById("overlay");
    const modalMessage = document.getElementById("modal-message")
    if(closable){
        document.querySelector(".close").style.display = "block"
    }else{
        document.querySelector(".close").style.display = "none"
    }
    modalMessage.innerText = msg
    modal.style.display = "block";
    overlay.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    var overlay = document.getElementById("overlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}



// openModal("Loading...")