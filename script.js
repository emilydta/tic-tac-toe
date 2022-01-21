// const topLeft = document.getElementById('top-left');
// const topMiddle = document.getElementById('top-middle');
// const topRight = document.getElementById('top-right');
// const middleLeft = document.getElementById('middle-left');
// const middleCenter = document.getElementById('middle-center');
// const middleRight = document.getElementById('middle-right');
// const bottomLeft = document.getElementById('bottom-left');
// const bottomMiddle = document.getElementById('bottom-middle');
// const bottomRight = document.getElementById('bottom-right');

function gameBoard() {
    const gameBoardArray = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
    const gridSquare = document.querySelectorAll(".grid-square")
    
    for (i = 0; i < gameBoardArray.length; i++) {
        gridSquare[i].innerText = gameBoardArray[i];
    }

    return {gameBoardArray};
}

gameBoard();

function player(name) {
    return {name};
} 

function gameFlow() {

}