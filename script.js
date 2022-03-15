const gameBoard = (() => {
  const gridSquare = document.querySelectorAll(".grid-square");
  const winMessage = document.getElementById("win-message");
  const playerOneScore = document.getElementById("p1-score");
  const playerTwoScore = document.getElementById("p2-score");

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
    displayController.cancel.twoPlayersAddMarkToBoard === 0 ? displayController.addTurnIndicatorO() : null;
    displayController.cancel.computerAddMarkToBoard === 0 ? removeTurnIndicator() : null;
    winMessage.innerText = "";
    for (let i = 0; i < 9; i++) {
      gridSquare[i].innerText = boardArray.array[i];
    }
  }
  
  const sortBoardData = () => {
    boardArray.array.forEach( (marker, index) => {
      marker === 'O' && !indexLists.oIndexList.includes(index) ? indexLists.oIndexList.push(index) : null;
       marker === 'X' && !indexLists.xIndexList.includes(index) ? indexLists.xIndexList.push(index) : null;
       
    })
  }

  const removeTurnIndicator = () => {
    displayController.playerOneIndicator.classList.remove("turn-indicator");
    displayController.playerTwoIndicator.classList.remove("turn-indicator");
  }

  const xWin = () => {
    if (Object.values(player.playerOneObj).indexOf("X") > -1) {
      winMessage.innerText = `${player.playerOneObj.name} wins!`;
      playerOneScore.innerText++;
    } else {
      winMessage.innerText = `${player.playerTwoObj.name} wins!`;
      playerTwoScore.innerText++;
    } 
    removeTurnIndicator();                                             
  }

  const oWin = () => {
    if (Object.values(player.playerOneObj).indexOf("O") > -1) {
      winMessage.innerText = `${player.playerOneObj.name} wins!`;
      playerOneScore.innerText++;

    } else {
      winMessage.innerText = `${player.playerTwoObj.name} wins!`;
      playerTwoScore.innerText++;
    }     
    removeTurnIndicator();                                             
  }

  const gameTie = () => {
    winMessage.innerText = "It's a tie!";
    removeTurnIndicator();
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

    turnCounter.counter === 9 && indexLists.oMatchingIndexes.length < 3 && indexLists.xMatchingIndexes.length < 3 ? gameTie() : null; 

    for (i = 0; i < 8; i++) {
      indexLists.oMatchingIndexes = winningPatterns[i].filter(element => indexLists.oIndexList.includes(element));
      indexLists.xMatchingIndexes = winningPatterns[i].filter(element => indexLists.xIndexList.includes(element));
      indexLists.oMatchingIndexes.length === winningPatterns[i].length ? oWin() : null;
      indexLists.xMatchingIndexes.length === winningPatterns[i].length ? xWin() : null;
    }
  }
  return {boardArray, indexLists, turnCounter, gridSquare, newGame, sortBoardData, gameWin, winMessage, playerOneScore, playerTwoScore}
})()

const displayController = (() => {
  const gridSquare = document.querySelector(".grid-squares");

  //Menu Screens
  const startScreen = document.querySelector(".start-screen");
  const gameMode = startScreen.querySelector(".game-mode-selection");
  const tokenSelection = startScreen.querySelector(".token-selection");
  const playerChoicesScreen = startScreen.querySelector(".player-choices");
  const boardDisplay = document.querySelector(".board-display");

  //Navigation Buttons
  const restartButton = document.getElementById("restart-button");
  const backButton = startScreen.querySelector(".back-button");
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
  const playerOneIndicator = document.querySelector(".player-one-indicator");
  const playerTwoIndicator = document.querySelector(".player-two-indicator");
  
  const displayStartScreen = () => {
    startScreen.style.display = "flex";
    gameMode.style.display = "block";
    backButton.style.display = "none";
    playerChoicesScreen.style.display = "none";
    tokenSelection.style.display = "none";
    boardDisplay.style.display = "none";
  }

  const displayTokenSelection = () => {
    gameMode.style.display = "none";
    tokenSelection.style.display = "flex";
    backButton.style.display = "flex";
  }

  const displayPlayerChoicesScreen = () => {
    gameMode.style.display = "none";
    playerChoicesScreen.style.display = "flex";
    backButton.style.display = "flex";
  }

  const displayBoard = () => {
    startScreen.style.display = "none";
    boardDisplay.style.display = "flex";
  }

  const updateBoard = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.gridSquare[i].innerText = gameBoard.boardArray.array[i];
    }
    gameBoard.sortBoardData();
    gameBoard.turnCounter.counter++; 
    gameBoard.gameWin();
  }

  const showMainMenu = () => {
    gameBoard.newGame();
    player.playerOneObj.name = "Player One";
    player.playerTwoObj.name = "Player Two";
    player.playerOneObj.marker = "";
    player.playerTwoObj.marker = "";
    gameBoard.playerOneScore.innerText = 0;
    gameBoard.playerTwoScore.innerText = 0;
    tokenChoicesA.forEach(token => {
      token.classList.remove("button-color");
    })
    tokenChoicesB.forEach(token => {
      token.classList.remove("button-color");
    })
    displayStartScreen();
  }

  const cancel = {
    twoPlayersAddMarkToBoard: 0,
    playerAddMarkToBoard: 0,
    computerAddMarkToBoard: 0
  };

  const twoPlayersAddMarkToBoard = () => {
    gridSquare.addEventListener("click", (e) => {
      if (cancel.twoPlayersAddMarkToBoard > 0) {
        return;
      }
      if (winMessage.innerText || e.target.innerText) {
        return;
      }
      if (e.target.innerText === "") {
        if (gameBoard.turnCounter.counter === 0 || gameBoard.turnCounter.counter % 2 === 0) {
          e.target.innerText = "X";
          addTurnIndicatorX();
        }
        if (gameBoard.turnCounter.counter % 2 !== 0) {
          e.target.innerText = "O";
          addTurnIndicatorO();
        }
        for (let i = 0; i < 9; i++) {
          gameBoard.boardArray.array.splice(i, 1, `${gameBoard.gridSquare[i].innerText}`)
        }
        updateBoard();
      };
    })
  }

  const playerAddMarkToBoard = () => {
    gridSquare.addEventListener("click", (e) => {
      if (cancel.playerAddMarkToBoard > 0) {
        return;
      }
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
  };

  const computerAddMarkToBoard = () => {
    let indexArray = [];
    gameBoard.boardArray.array.forEach((item, index) => {
      if (cancel.computerAddMarkToBoard > 0) {
        return;
      }
      item === "" ? indexArray.push(index) : null;
    });
    const viableSquare = Math.floor((Math.random() * indexArray.length));
    gameBoard.boardArray.array.splice(indexArray[viableSquare], 1, `${player.playerTwoObj.marker}`);
    updateBoard();
    playerAddMarkToBoard();
  };

  const addButtonColorToGroupA = () => {
    tokenChoicesA.forEach(token => {
      token.classList.add("button-color");
    }) 
    tokenChoicesB.forEach(token => {
      token.classList.remove("button-color");
    }) 
  }

  const addButtonColorToGroupB = () => {
    tokenChoicesB.forEach(token => {
      token.classList.add("button-color");
    }) 
    tokenChoicesA.forEach(token => {
      token.classList.remove("button-color");
    }) 
  }

  const addTurnIndicatorO = () => {
    if (Object.values(player.playerOneObj).indexOf("X") > -1) {
      playerOneIndicator.classList.add("turn-indicator");
      playerTwoIndicator.classList.remove("turn-indicator");
    } else if (Object.values(player.playerTwoObj).indexOf("X") > -1) {
      playerTwoIndicator.classList.add("turn-indicator");
      playerOneIndicator.classList.remove("turn-indicator");
    }
  }

  const addTurnIndicatorX = () => {
    if (Object.values(player.playerOneObj).indexOf("O") > -1) {
      playerOneIndicator.classList.add("turn-indicator");
      playerTwoIndicator.classList.remove("turn-indicator");
    } else if (Object.values(player.playerTwoObj).indexOf("O") > -1) {
      playerTwoIndicator.classList.add("turn-indicator");
      playerOneIndicator.classList.remove("turn-indicator");
    }
  }

  const gameStartPlayers = () => {
    displayPlayerChoicesScreen();
    startScreen.addEventListener("click", (e) => {
      if (e.target && e.target.id == "p1-x-button" || e.target && e.target.id == "p2-o-button" ) {
        player.playerOneObj.marker = "X";
        player.playerTwoObj.marker = "O";
        addButtonColorToGroupA();
      }
      if (e.target && e.target.id == "p1-o-button" || e.target && e.target.id == "p2-x-button" ) {
        player.playerOneObj.marker = "O";
        player.playerTwoObj.marker = "X";
        addButtonColorToGroupB();
      }
      if (e.target && e.target.id === "start-game-players") {
        if (p1NameInput.value === "Computer" || p2NameInput.value === "Computer") {
          return;
        }
        if (player.playerOneObj.marker && player.playerTwoObj.marker && p1NameInput.value && p2NameInput.value) {
          player.playerOneObj.name = p1NameInput.value;
          player.playerTwoObj.name = p2NameInput.value;
          playerOneIndicator.innerText = `${player.playerOneObj.name}`;
          playerTwoIndicator.innerText = `${player.playerTwoObj.name}`;
          cancel.twoPlayersAddMarkToBoard = 0;
          cancel.playerAddMarkToBoard++
          cancel.computerAddMarkToBoard++
          gameBoard.newGame();
          displayBoard();
          twoPlayersAddMarkToBoard();
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
        addButtonColorToGroupA();
      }
      if (e.target && e.target.id == "o-button") {
        player.playerOneObj.marker = "O";
        player.playerTwoObj.marker = "X";
        addButtonColorToGroupB();
      }
      if (e.target && e.target.id === "start-game-computer") {
        if (player.playerOneObj.marker === "") {
          return;
        }
        player.playerOneObj.name = "Player One";
        player.playerTwoObj.name = "Computer";
        playerOneIndicator.innerText = `${player.playerOneObj.name}`;
        playerTwoIndicator.innerText = `${player.playerTwoObj.name}`;
        cancel.twoPlayersAddMarkToBoard++;
        cancel.playerAddMarkToBoard = 0;
        cancel.computerAddMarkToBoard = 0;
        gameBoard.newGame();
        displayBoard();
        player.playerTwoObj.marker === "X" ? computerAddMarkToBoard() : null;
        player.playerOneObj.marker === "X" ? playerAddMarkToBoard() : null;
      }
    });
  };

  restartButton.addEventListener("click", () => {
    gameBoard.newGame()
    player.playerTwoObj.name === "Computer" && player.playerTwoObj.marker === "X" ? computerAddMarkToBoard() : null;
  });

  backButton.addEventListener("click", showMainMenu);
  menuButton.addEventListener("click", showMainMenu);
  computer.addEventListener("click", gameStartComputer);
  twoPlayer.addEventListener("click", gameStartPlayers);
  return {displayStartScreen, cancel, playerOneIndicator, playerTwoIndicator, addTurnIndicatorX, addTurnIndicatorO}
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