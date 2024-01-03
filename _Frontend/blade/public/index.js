// burger menu

const burger = document.querySelector('#burger');
const menu = document.querySelector('#menu');

burger.addEventListener('click', () => {
    if(menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    }
    else {
        menu.classList.add('hidden')
    }
})

// bejelentkezés megjelenítése

function showDialog(id) {
    let dialogLogin = document.getElementById(id);
    dialogLogin.classList.remove('hidden');
    setTimeout(() => {
        dialogLogin.classList.remove('opacity-0');
    }, 20);
}

function hideDialog(id) {
    let dialogLogin = document.getElementById(id);
    dialogLogin.classList.add('opacity-0');
    setTimeout(() => {
        dialogLogin.classList.add('hidden');
    }, 500);
}
