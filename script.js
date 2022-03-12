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

  //Menu Screens
  const startScreen = document.querySelector(".start-screen");
  const gameMode = document.querySelector(".game-mode");
  const tokenSelection = document.querySelector(".token-selection");
  const playerChoicesScreen = document.querySelector(".player-choices");
  const boardDisplay = document.querySelector(".board-display");

  //Navigation Buttons
  const restartButton = document.getElementById("restart-button");
  const menuButton = document.getElementById("menu-button");
  const cmodeBackButton = document.getElementById("cmode-back-button");
  const pmodeBackButton = document.getElementById("pmode-back-button");

  //Choice Buttons
  const twoPlayer = document.getElementById("two-player");
  const computer = document.getElementById("computer");
  const startGame = document.getElementById("start-game");
  const xButton = document.getElementById("x-button");
  const oButton = document.getElementById("o-button");
  const p1XButton = document.getElementById("p1-x-button");
  const p1OButton = document.getElementById("p1-o-button");
  const p2XButton = document.getElementById("p2-x-button");
  const p2OButton = document.getElementById("p2-o-button");

  //Other
  const p1NameInput = document.getElementById("p1-name");
  const p2NameInput = document.getElementById("p2-name");
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
    gameBoard.tieConditions.counter++;
    gameBoard.boardData();
    gameBoard.gameWin();
  }

  const showMainMenu = () => {
    gameBoard.newGame();
    player.playerOneObj.name = "Player One";
    player.playerTwoObj.name = "Player Two";
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
      if (!winMessage.innerText && player.playerTwoObj.name == "Computer") {
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
  const gameStartPlayers = () => {
    displayPlayerChoicesScreen();

    p1XButton.addEventListener("click", () => {
      player.playerOneObj.marker = "X";
      player.playerTwoObj.marker = "O";
      p1XButton.classList.add("button-color");
      p2OButton.classList.add("button-color");
      p1OButton.classList.remove("button-color");
      p2XButton.classList.remove("button-color");
    })

    p2XButton.addEventListener("click", () => {
      player.playerTwoObj.marker = "X";
      player.playerOneObj.marker = "O";
      p2XButton.classList.add("button-color");
      p1OButton.classList.add("button-color");
      p2OButton.classList.remove("button-color");
      p1XButton.classList.remove("button-color");
    })

    p1OButton.addEventListener("click", () => {
      player.playerOneObj.marker = "O";
      player.playerTwoObj.marker = "X";
      p1OButton.classList.add("button-color");
      p2XButton.classList.add("button-color");
      p1XButton.classList.remove("button-color");
      p2OButton.classList.remove("button-color");
    })

    p2OButton.addEventListener("click", () => {
      player.playerTwoObj.marker = "O";
      player.playerOneObj.marker = "X";
      p2OButton.classList.add("button-color");
      p1XButton.classList.add("button-color");
      p2XButton.classList.remove("button-color");
      p1OButton.classList.remove("button-color");
    })

    startGame.addEventListener("click", () => {
      if (player.playerOneObj.marker && player.playerTwoObj.marker && p1NameInput.value && p2NameInput.value) {
        player.playerOneObj.name = p1NameInput.value;
        player.playerTwoObj.name = p2NameInput.value;
        displayBoard();
      }
    });
  }
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
      player.playerTwoObj.name = "Computer";
      displayBoard();
    });
  };

  restartButton.addEventListener("click", gameBoard.newGame);
  menuButton.addEventListener("click", showMainMenu);
  cmodeBackButton.addEventListener("click", showMainMenu);
  pmodeBackButton.addEventListener("click", showMainMenu);
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