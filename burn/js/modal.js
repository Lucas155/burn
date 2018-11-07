var modalOpen = false;
function toggleModal() {
    var modal = document.getElementsByClassName('bloco-caos')[0];
    if (modalOpen) {
        modal.classList.remove('open');
    } else {
        modal.classList.add('open');
    }
    modalOpen = !modalOpen;
}


var modalOpen = false;
function toggleUpdate() {
    var modal = document.getElementsByClassName('bloco-update')[0];
    if (modalOpen) {
        modal.classList.remove('open');
    } else {
        modal.classList.add('open');
    }
    modalOpen = !modalOpen;
}