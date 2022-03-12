const gameBoard = (() => {
  const gridSquare = document.querySelectorAll(".grid-square");
  const winMessage = document.getElementById("win-message");

  const boardArray = {array: ["","","","","","","","",""]};
 
  const indexLists = {
    xIndexList: [],
    oIndexList: [],
    oMatchingIndexes: [],
    xMatchingIndexes: [],
  }

  const tieConditions = {counter: 0};

  const newGame = () => {
    boardArray.array = ["","","","","","","","",""];
    indexLists.xIndexList = [];
    indexLists.oIndexList = [];
    tieConditions.counter = 0;
    indexLists.oMatchingIndexes = [];
    indexLists.xMatchingIndexes = [];
    winMessage.innerText = "";
    for (let i = 0; i < 9; i++) {
      gridSquare[i].innerText = boardArray.array[i];
    }
  }
  
  const boardData = () => {
    boardArray.array.forEach( (marker, index) => {
       marker === 'X' && !indexLists.xIndexList.includes(index) ? indexLists.xIndexList.push(index) : null;
       marker === 'O' && !indexLists.oIndexList.includes(index) ? indexLists.oIndexList.push(index) : null;
    })
  }

  const xWin = () => {
    if (Object.values(player.playerOneObj).indexOf("X") > -1) {
      winMessage.innerText = `${player.playerOneObj.name} wins!`
      
    } else {winMessage.innerText = `${player.playerTwoObj.name} wins!`}                                              
  }

  const oWin = () => {
    if (Object.values(player.playerOneObj).indexOf("O") > -1) {
      winMessage.innerText = `${player.playerOneObj.name} wins!`

    } else {winMessage.innerText = `${player.playerTwoObj.name} wins!`}                                                  
  }

  const gameTie = () => {
    winMessage.innerText = "It's a tie!";
  }

  const gameWin = () => {
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
    
    boardArray.array.forEach((item, index) => {
      indexLists.tieIndexList = [];
      item === "" ? indexLists.tieIndexList.push(index) : null;
    })

    for (i = 0; i < 8; i++) {
      indexLists.oMatchingIndexes = winningPatterns[i].filter(element => indexLists.oIndexList.includes(element));
      indexLists.xMatchingIndexes = winningPatterns[i].filter(element => indexLists.xIndexList.includes(element));
      indexLists.oMatchingIndexes.length === winningPatterns[i].length ? oWin() : null;
      indexLists.xMatchingIndexes.length === winningPatterns[i].length ? xWin() : null
    }
    tieConditions.counter === 9 && indexLists.oMatchingIndexes.length < 3 && indexLists.oMatchingIndexes.length < 3 ? gameTie() : null; 
  }
  return {boardArray, indexLists, tieConditions, gridSquare, newGame, boardData, gameWin, winMessage}
})()

const displayController = (() => {
  const gridSquare = document.querySelector(".grid-squares");
  const startScreen = document.querySelector(".start-screen");
  const tokenSelection = document.querySelector(".token-selection");
  const restartButton = document.getElementById("restart-button");
  const menuButton = document.getElementById("menu-button");
  const backButton = document.getElementById("back-button");
  const xButton = document.getElementById("x-button");
  const oButton = document.getElementById("o-button");
  const gameMode = document.querySelector(".game-mode");
  const twoPlayer = document.getElementById("two-player");
  const computer = document.getElementById("computer");
  const startGame = document.getElementById("start-game");
  const boardDisplay = document.querySelector(".board-display");
  const winMessage = document.getElementById("win-message");
  
  const displayStartScreen = () => {
    startScreen.style.display = "flex";
    gameMode.style.display = "block";
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

  const updateBoard = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.gridSquare[i].innerText = gameBoard.boardArray.array[i];
    }
    gameBoard.tieConditions.counter++;
    gameBoard.boardData();
    gameBoard.gameWin();
  }

  const showMainMenu = () => {
    gameBoard.newGame();
    player.playerOneObj.name = "Player";
    player.playerTwoObj.name = "Computer";
    player.playerOneObj.marker = "";
    player.playerTwoObj.marker = "";
    displayStartScreen();
  }

  const playerAddMarkToBoard = (() => {
    gridSquare.addEventListener("click", (e) => {
      if (winMessage.innerText || e.target.innerText) {
        return;
      }
      if (e.target.innerText === "") {
        e.target.innerText = player.playerOneObj.marker;
        for (let i = 0; i < 9; i++) {
          gameBoard.boardArray.array.splice(i, 1, `${gameBoard.gridSquare[i].innerText}`)
        }
        updateBoard();
      };
      if (!winMessage.innerText) {
        computerAddMarkToBoard();
      }
    });
  })();

  const computerAddMarkToBoard = () => {
    let indexArray = [];
    player.playerOneObj.marker === "X" ? player.playerTwoObj.marker = "O" : null;
    player.playerOneObj.marker === "O" ? player.playerTwoObj.marker = "X" : null;

    gameBoard.boardArray.array.forEach((item, index) => {
      item === "" ? indexArray.push(index) : null;
    })

    const viableSquare = Math.floor((Math.random() * indexArray.length));
    
    gameBoard.boardArray.array.splice(indexArray[viableSquare], 1, `${player.playerTwoObj.marker}`);
    updateBoard();
  };
  
  const gameStartComputer = () => {
    displayTokenSelection();

    xButton.addEventListener("click", () => {
      player.playerOneObj.marker = "X";
    })
    
    oButton.addEventListener("click", () => {
      player.playerOneObj.marker = "O";
    })

    startGame.addEventListener("click", () => {
      if (player.playerOneObj.marker === "") {
        return;
      }
      displayBoard();
    });
  };

  restartButton.addEventListener("click", gameBoard.newGame);
  menuButton.addEventListener("click", showMainMenu);
  backButton.addEventListener("click", showMainMenu);
  computer.addEventListener("click", gameStartComputer);

  return {displayStartScreen}
})();

const player = (() => {
  let playerOneObj = {
    name: "Player",
    marker: ""
  };

  let playerTwoObj = {
    name: "Computer",
    marker: ""
  };
  
  return {playerOneObj, playerTwoObj};
})();

displayController.displayStartScreen();