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
let createdTabs = 0;



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
    createdTabs = createdTabs + 1;

    if (createdTabs > 10) {
        document.getElementById('limit-modal').classList.add('exced-pads-limit')
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('limit-modal').classList.remove('exced-pads-limit')
        })
        return
    }
    

    let pads = document.getElementsByClassName('pads')[0]
    let div = document.createElement('div');
    div.classList.add('pad-tab')
    div.setAttribute('id', `tab-${createdTabs}`)
    

    let h1 = document.createElement('h1');
    h1.style.textAlign = 'center';
    h1.style.color = 'white';
    h1.innerText = createdTabs;

    let delBtn = document.createElement('button');
    delBtn.setAttribute('id', 'del-pad')
    delBtn.style.border = 'none';
    delBtn.style.background = 'transparent'
    delBtn.style.display = 'flex';
    delBtn.style.flexDirection = 'row-reverse';
    delBtn.style.padding = '6px';
    delBtn.style.width = 'fit-content';
    delBtn.innerHTML = '<svg width="20px" height="20px" viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-4.8" y="-4.8" width="33.60" height="33.60" rx="16.8" fill="#c01c28" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
    div.appendChild(h1)
    div.appendChild(delBtn)
    pads.appendChild(div);

    document.querySelectorAll('#del-pad').forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.parentElement)
        })
    })
})



