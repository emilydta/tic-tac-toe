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

  const turnCounter = {counter: 0};

  const newGame = () => {
    boardArray.array = ["","","","","","","","",""];
    indexLists.xIndexList = [];
    indexLists.oIndexList = [];
    turnCounter.counter = 0;
    indexLists.oMatchingIndexes = [];
    indexLists.xMatchingIndexes = [];
    winMessage.innerText = "";
    for (let i = 0; i < 9; i++) {
      gridSquare[i].innerText = boardArray.array[i];
    }
  }
  
  const sortBoardData = () => {
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

    for (i = 0; i < 8; i++) {
      indexLists.oMatchingIndexes = winningPatterns[i].filter(element => indexLists.oIndexList.includes(element));
      indexLists.xMatchingIndexes = winningPatterns[i].filter(element => indexLists.xIndexList.includes(element));
      indexLists.oMatchingIndexes.length === winningPatterns[i].length ? oWin() : null;
      indexLists.xMatchingIndexes.length === winningPatterns[i].length ? xWin() : null
    }
    turnCounter.counter === 9 && indexLists.oMatchingIndexes.length < 3 && indexLists.oMatchingIndexes.length < 3 ? gameTie() : null; 
  }
  return {boardArray, indexLists, turnCounter, gridSquare, newGame, sortBoardData, gameWin, winMessage}
})()

const displayController = (() => {
  const gridSquare = document.querySelector(".grid-squares");

  //Menu Screens
  const startScreen = document.querySelector(".start-screen");
  const gameMode = startScreen.querySelector(".game-mode");
  const tokenSelection = startScreen.querySelector(".token-selection");
  const playerChoicesScreen = startScreen.querySelector(".player-choices");
  const boardDisplay = document.querySelector(".board-display");

  //Navigation Buttons
  const restartButton = document.getElementById("restart-button");
  const menuButton = document.getElementById("menu-button");

  //Game Modes
  const twoPlayer = document.getElementById("two-player");
  const computer = document.getElementById("computer");

  //Other
  const p1NameInput = document.getElementById("p1-name");
  const p2NameInput = document.getElementById("p2-name");
  const tokenChoicesA = startScreen.querySelectorAll(".token-choices-a");
  const tokenChoicesB = startScreen.querySelectorAll(".token-choices-b");
  const winMessage = document.getElementById("win-message");
  
  const displayStartScreen = () => {
    startScreen.style.display = "flex";
    gameMode.style.display = "block";
    playerChoicesScreen.style.display = "none";
    tokenSelection.style.display = "none";
    boardDisplay.style.display = "none";
  }

  const displayTokenSelection = () => {
    gameMode.style.display = "none";
    tokenSelection.style.display = "flex";
  }

  const displayPlayerChoicesScreen = () => {
    gameMode.style.display = "none";
    playerChoicesScreen.style.display = "flex";
  }

  const displayBoard = () => {
    startScreen.style.display = "none";
    boardDisplay.style.display = "block";
  }

  const updateBoard = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.gridSquare[i].innerText = gameBoard.boardArray.array[i];
    }
    gameBoard.turnCounter.counter++;
    gameBoard.sortBoardData();
    gameBoard.gameWin();
  }

  const showMainMenu = () => {
    gameBoard.newGame();
    player.playerOneObj.name = "Player One";
    player.playerTwoObj.name = "Player Two";
    player.playerOneObj.marker = "";
    player.playerTwoObj.marker = "";
    tokenChoicesA.forEach(token => {
      token.classList.remove("button-color");
    })
    tokenChoicesB.forEach(token => {
      token.classList.remove("button-color");
    })
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
      if (!winMessage.innerText && player.playerTwoObj.name == "Computer") {
        computerAddMarkToBoard();
      }
    });
  })();

  const computerAddMarkToBoard = () => {
    let indexArray = [];
    gameBoard.boardArray.array.forEach((item, index) => {
      item === "" ? indexArray.push(index) : null;
    });
    const viableSquare = Math.floor((Math.random() * indexArray.length));
    gameBoard.boardArray.array.splice(indexArray[viableSquare], 1, `${player.playerTwoObj.marker}`);
    updateBoard();
  };

  const addButtonColorA = () => {
    tokenChoicesA.forEach(token => {
      token.classList.add("button-color");
    }) 
    tokenChoicesB.forEach(token => {
      token.classList.remove("button-color");
    }) 
  }

  const addButtonColorB = () => {
    tokenChoicesB.forEach(token => {
      token.classList.add("button-color");
    }) 
    tokenChoicesA.forEach(token => {
      token.classList.remove("button-color");
    }) 
  }

  const gameStartPlayers = () => {
    displayPlayerChoicesScreen();
    startScreen.addEventListener("click", (e) => {
      if (e.target && e.target.id == "p1-x-button" || e.target && e.target.id == "p2-o-button" ) {
        player.playerOneObj.marker = "X";
        player.playerTwoObj.marker = "O";
        addButtonColorA();
      }
      if (e.target && e.target.id == "p1-o-button" || e.target && e.target.id == "p2-x-button" ) {
        player.playerOneObj.marker = "O";
        player.playerTwoObj.marker = "X";
        addButtonColorB();
      }
      if (e.target && e.target.matches(".start-button")) {
        if (player.playerOneObj.marker && player.playerTwoObj.marker && p1NameInput.value && p2NameInput.value) {
          player.playerOneObj.name = p1NameInput.value;
          player.playerTwoObj.name = p2NameInput.value;
          displayBoard();
        }
      }
    });
  }

  const gameStartComputer = () => {
    displayTokenSelection();
    startScreen.addEventListener("click", (e) => {
      if (e.target && e.target.id == "x-button") {
        player.playerOneObj.marker = "X";
        player.playerTwoObj.marker = "O";
        addButtonColorA();
      }
      if (e.target && e.target.id == "o-button") {
        player.playerOneObj.marker = "O";
        player.playerTwoObj.marker = "X";
        addButtonColorB();
      }
      if (e.target && e.target.matches(".start-button")) {
        if (player.playerOneObj.marker === "") {
          return;
        }
        player.playerTwoObj.name = "Computer";
        displayBoard();
      }
    });
  };

  startScreen.addEventListener("click", (e) => {
    e.target && e.target.matches(".back-button") ? showMainMenu() : null; 
  })

  restartButton.addEventListener("click", gameBoard.newGame);
  menuButton.addEventListener("click", showMainMenu);
  computer.addEventListener("click", gameStartComputer);
  twoPlayer.addEventListener("click", gameStartPlayers);

  return {displayStartScreen}
})();

const player = (() => {
  let playerOneObj = {
    name: "Player One",
    marker: ""
  };

  let playerTwoObj = {
    name: "Player Two",
    marker: ""
  };
  
  return {playerOneObj, playerTwoObj};
})();

displayController.displayStartScreen();