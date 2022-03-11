
const gameBoard = (() => {
  let array = ["","","","","","","","",""];
  const gridSquare = document.querySelectorAll(".grid-square");
 
  let xIndexList = [];
  let oIndexList = [];

  const boardData = () => {
    array.forEach( (marker, index) => {
       marker === 'X' && !xIndexList.includes(index) ? xIndexList.push(index) : null;
       marker === 'O' && !oIndexList.includes(index) ? oIndexList.push(index) : null;
    })
  }

  const gameWinConditions = () => {
    winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6], 
    ]
    for (i = 0; i < winningPatterns.length; i++) {
      const oMatchingIndexes = winningPatterns[i].filter(element => oIndexList.includes(element));
      oMatchingIndexes.length == winningPatterns[i].length ? console.log(oMatchingIndexes) : null;
      const xMatchingIndexes = winningPatterns[i].filter(element => xIndexList.includes(element));
      xMatchingIndexes.length == winningPatterns[i].length ? console.log(xMatchingIndexes) : null;
    }
  }
  return {array, gridSquare, xIndexList, oIndexList, boardData, gameWinConditions}
})()


const displayController = (() => {
  const startScreen = document.querySelector(".start-screen");
  const tokenSelection = document.querySelector(".token-selection");
  const xButton = document.getElementById("x-button");
  const oButton = document.getElementById("o-button");
  const gameMode = document.querySelector(".game-mode");
  const twoPlayer = document.getElementById("two-player");
  const computer = document.getElementById("computer");
  const startGame = document.getElementById("start-game");
  const boardDisplay = document.querySelector(".board-display");
  
  
  const displayStartScreen = () => {
    startScreen.style.display = "flex";
    tokenSelection.style.display = "none";
    boardDisplay.style.display = "none";
  }

  const displayTokenSelection = () => {
    gameMode.style.display = "none";
    tokenSelection.style.display = "flex";
  }

  const displayBoard = () => {
    startScreen.style.display = "none";
    boardDisplay.style.display = "block";
  }

  const gameStartComputer = () => {
    displayTokenSelection();

    xButton.addEventListener("click", () => {
      player.playerObj.marker = "X";
    })
    
    oButton.addEventListener("click", () => {
      player.playerObj.marker = "O";
    })

    startGame.addEventListener("click", () => {
      if (player.playerObj.marker === "") {
        return;
      }
      displayBoard();
    });

    const updateBoard = () => {
      for (let i = 0; i < 9; i++) {
        gameBoard.gridSquare[i].innerText = gameBoard.array[i];
      }
      gameBoard.boardData();
      gameBoard.gameWinConditions();
    }

    const playerAddMarkToBoard = (() => {
      const gridSquare = document.querySelector(".grid-squares");
      gridSquare.addEventListener("click", (e) => {
          if (e.target.innerText == "") {
            e.target.innerText = player.playerObj.marker;
            for (let i = 0; i < 9; i++) {
              gameBoard.array.splice(i, 1, `${gameBoard.gridSquare[i].innerText}`)
            }
            computerAddMarkToBoard();
            updateBoard();
          };
      });
    })();

    const computerAddMarkToBoard = () => {
      const gridSquare = document.querySelectorAll(".grid-square");
      let indexArray = []
      player.playerObj.marker === "X" ? player.computerObj.marker = "O" : null;
      player.playerObj.marker === "O" ? player.computerObj.marker = "X" : null;

      gameBoard.array.forEach((item, index) => {
        item === "" ? indexArray.push(index) : null;
      })

      const viableSquare = Math.floor((Math.random() * indexArray.length));
      
      indexArray.length === 0 ? null : gameBoard.array.splice(indexArray[viableSquare], 1, `${player.computerObj.marker}`);
    };
  };

  computer.addEventListener("click", () => {
    gameStartComputer();
  })

  return {displayStartScreen}
})();

const player = (() => {
  let playerObj = {marker: ""};
  let computerObj = {marker: ""};
  return {playerObj, computerObj};
})();

displayController.displayStartScreen();