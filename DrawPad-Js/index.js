const canva = document.getElementById('draw-pad');
const ctx = canva.getContext("2d");



canva.height = window.innerHeight - canva.offsetTop;
canva.width = window.innerWidth - canva.offsetLeft;



let trackCursor = false;
let textColor;
let textSize = 4;
let pencilAction = false;
let setDarkMode = false;
let availablePads = new Array();



const lightMode = document.getElementById('select-light-mode');
const darkMode = document.getElementById('select-dark-mode');
const color = document.getElementById('color');
const clear = document.getElementById('clear-pad');
const size = document.getElementById('size');
const newPad = document.getElementById('new-pad');
size.value = textSize;
let erase = document.getElementById('erase');
let pencil = document.getElementById('pencil');



document.addEventListener('DOMContentLoaded', () => {
    pencilAction = true;
    pencil.classList.add('active-action');
})

darkMode.addEventListener('click', () => {
    textColor = "#F0F2F4";
    document.body.style.backgroundColor = "#21242C";
    document.getElementsByClassName('start-modal-container')[0].classList.add('none')
    document.getElementsByClassName('credits')[0].classList.add('light-credits')
    color.value = textColor;
    setDarkMode = true;
})
lightMode.addEventListener('click', () => {
    textColor = "#2B303B";
    document.body.style.backgroundColor = "#C4C9D4";
    document.getElementsByClassName('start-modal-container')[0].classList.add('none')
    color.value = textColor;
})



clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canva.width, canva.height)
})
color.addEventListener('change', (e) => {
    textColor = e.target.value;
})



erase.addEventListener('click', () => {
    if (pencilAction) {
        erase.classList.add('active-action');
        pencil.classList.remove('active-action');
        pencilAction = false;
        setDarkMode ? textColor = "#000000" : textColor = "#f0f0f0";
    }
})
pencil.addEventListener('click', () => {
    if (!pencilAction) {
        pencil.classList.add('active-action');
        erase.classList.remove('active-action');
        pencilAction = true; 
        textColor = color.value;
    }   
})



size.addEventListener('change', (e) => {
    if (e.target.value < 1) {
        alert(`Invalid Text Size ${e.target.value}`)
        textSize = 4;
    } else {
        textSize = e.target.value;
    }
    
})

// DESKTOP DRAW
canva.addEventListener('click', (e) => {
    ctx.lineWidth = textSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = textColor;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
})
canva.addEventListener('mousemove', (e) => {
    if (!trackCursor) return;
    ctx.lineWidth = textSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = textColor;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
})
canva.addEventListener('mousedown', () => trackCursor = true);
canva.addEventListener('mouseup', () => {
    ctx.stroke();
    ctx.beginPath();
    trackCursor = false;
});



newPad.addEventListener('click', () => {
    let pads = document.getElementsByClassName('pads')[0]

    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.innerText = "new Pad"
    div.appendChild(h1);
    pads.appendChild(div);
})



