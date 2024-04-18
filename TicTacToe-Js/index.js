
let cells = document.querySelectorAll('[data-cell]');
let restartBtn = document.getElementsByClassName('restart')[0];
let winFlag = document.getElementById('win-flag')


const X_SYM = "X";
const O_SYM = "O";
let xTurn = true;
let playersMoves = new Array(9).fill("");
let symbol;


const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let winText = document.getElementsByClassName('winner')[0];
const checkWin = () => {
    winningConditions.forEach(placement => {
        let [a, b, c] = placement;
        if (playersMoves[a] !== "" && playersMoves[a] === playersMoves[b] && playersMoves[a] === playersMoves[c]) {
            winText.innerText = `${symbol}'s Win!!`;
            document.getElementsByClassName('winner-restart')[0].addEventListener('click', () => window.location.reload())
            winFlag.classList.remove('none')
            winFlag.classList.add('winning-class')
        }
        if (!playersMoves.includes("")) {
            winText.innerText = `Draw!!`;
            document.getElementsByClassName('winner-restart')[0].addEventListener('click', () => window.location.reload())
            winFlag.classList.remove('none')
            winFlag.classList.add('winning-class')
        }
    })
} 


const handleClick = (e) => {
    symbol = xTurn ? X_SYM : O_SYM;
    const cell = e.target.getAttribute('data-cell');
    e.target.innerText = symbol;
    playersMoves[Number(cell)] = symbol;
    checkWin()
    xTurn = !xTurn;
}



cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true}))
restartBtn.addEventListener('click', () => window.location.reload())