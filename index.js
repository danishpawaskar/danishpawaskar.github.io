const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningMessage = document.querySelector('.wining-message');
const winningMessageText = document.querySelector('[data-wining-message-text]');
const button = document.querySelector('.restart');
let circleTurn;
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


button.addEventListener('click',(e)=>{
    window.location.reload();
})


startGame();
function startGame(){
    circleTurn=false;
    setBoardHover();
cellElements.forEach(cell =>{
 cell.addEventListener('click',handleClick,{once:true});
})
}


function handleClick(e) {
console.log('clicked');
const cell = e.target;

//check whose turn it is 
const currentTurn = circleTurn ? CIRCLE_CLASS : X_CLASS;

placeMark(cell,currentTurn);

if(checkWin(currentTurn)){
    winningMessageText.innerText = `${circleTurn ? "O's" : "X's" } Wins!!`;
    winningMessage.classList.add('show');
}
if(isDraw()){
    winningMessageText.innerText = 'Draw!!';
    winningMessage.classList.add('show');
}
//place mark
//check for win
//check for draw
//switch turn
switchTurn();
setBoardHover();



}

function setBoardHover(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentTurn){
   return WINNING_COMBINATIONS.some(combination =>{
       return combination.every(index =>{
           return cellElements[index].classList.contains(currentTurn)
       })
   })

}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}


function placeMark(cell,currentTurn){
    cell.classList.add(currentTurn);
}

function switchTurn(){
    circleTurn =!circleTurn;
}