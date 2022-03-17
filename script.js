//implement smart AI

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
    displayController.arrays.filteredSpaces = [];
    displayController.arrays.winningMoves = [];
    displayController.arrays.winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6], 
    ],
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

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
  ]

  const gameWin = () => {
    turnCounter.counter === 9 && indexLists.oMatchingIndexes.length < 3 && indexLists.xMatchingIndexes.length < 3 ? gameTie() : null; 

    for (i = 0; i < 8; i++) {
      indexLists.oMatchingIndexes = winningPatterns[i].filter(element => indexLists.oIndexList.includes(element));
      indexLists.xMatchingIndexes = winningPatterns[i].filter(element => indexLists.xIndexList.includes(element));
      indexLists.oMatchingIndexes.length === winningPatterns[i].length ? oWin() : null;
      indexLists.xMatchingIndexes.length === winningPatterns[i].length ? xWin() : null;
    }
  }
  return {boardArray, indexLists, turnCounter, gridSquare, newGame, sortBoardData, gameWin, winningPatterns, winMessage, playerOneScore, playerTwoScore}
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
    computerAddMarkToBoard: 0,
    computerAddMarkToBoardMedium: 0,
    computerAddMarkToBoardHard: 0,
  };

  const arrays = {
    winningMoves: [],
    winningPatterns: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6], 
    ],
    filteredSpaces: [],
    possibleWins: [],
    closeToWinArray: [],
  };

  const chooseRandom = {
    pattern: 0,
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
        cancel.computerAddMarkToBoard === 0 ? computerAddMarkToBoard() : null;
        cancel.computerAddMarkToBoardMedium === 0 ? computerAddMarkToBoardMedium() : null;
        cancel.computerAddMarkToBoardHard === 0 ? computerAddMarkToBoardHard() : null;
      }
    });
  };

  const computerAddMarkToBoardHard = () => {
    if (cancel.computerAddMarkToBoardHard > 0) {
      return;
    }
    console.log("hard mode")
    const possibleWinOnBoard = {present: false};

    const checkIfPossibleWinOnBoard = () => {
      arrays.possibleWins = [];
      arrays.closeToWinArray = [];

      const ifComputerIsO = () => {
        if (player.playerTwoObj.marker === "X") {
          return;
        }

        if (player.playerTwoObj.marker === "O") {
          for (let i = 0; i < 8; i++) {
            arrays.possibleWins = gameBoard.winningPatterns[i].filter(element => gameBoard.indexLists.xIndexList.includes(element));
            if (arrays.possibleWins.length === 2) {
              arrays.closeToWinArray = gameBoard.winningPatterns[i];
            }  
          }

          if (arrays.closeToWinArray.length === 0) {
            return;
          }

          arrays.closeToWinArray.forEach(item => {
            if (gameBoard.boardArray.array[item] === "") {
              gameBoard.boardArray.array.splice(item, 1, `${player.playerTwoObj.marker}`); 
              possibleWinOnBoard.present = true;   
              updateBoard();
              playerAddMarkToBoard();
            } 
            else return;
          })
        }
      }

      const ifComputerIsX = () => {
        if (player.playerTwoObj.marker === "O") {
          return;
        }

        if (player.playerTwoObj.marker === "X") {
          for (let i = 0; i < 8; i++) {
            arrays.possibleWins = gameBoard.winningPatterns[i].filter(element => gameBoard.indexLists.oIndexList.includes(element));
            if (arrays.possibleWins.length === 2) {
              arrays.closeToWinArray = gameBoard.winningPatterns[i];
            }  
          }

          if (arrays.closeToWinArray.length === 0) {
            return;
          }
          arrays.closeToWinArray.forEach(item => {
            if (gameBoard.boardArray.array[item] === "") {
              gameBoard.boardArray.array.splice(item, 1, `${player.playerTwoObj.marker}`); 
              possibleWinOnBoard.present = true;     
              updateBoard();
              playerAddMarkToBoard();
            } 
            else return;
          })
        }
      }

      ifComputerIsO();
      ifComputerIsX();

    }     

    checkIfPossibleWinOnBoard();
    if (possibleWinOnBoard.present === true) {
      return;
    }

    let emptySpacesArray = [];
    
    gameBoard.boardArray.array.forEach((item, index) => {
      item === "" ? emptySpacesArray.push(index) : null;
    });

    const chooseRandomMoveset = () => {
      chooseRandom.pattern = Math.floor((Math.random() * arrays.winningPatterns.length));
      //console.log("chooseRandom.pattern")
      //console.log(chooseRandom.pattern)
      arrays.winningPatterns.forEach((item, index) => {
        arrays.winningMoves.push(arrays.winningPatterns[chooseRandom.pattern][index])
        let undefinedIndex = arrays.winningMoves.indexOf(undefined);
        undefinedIndex !== -1 ? arrays.winningMoves.splice(undefinedIndex, 1) : null;
      })
      arrays.filteredSpaces = arrays.winningMoves.filter((element) => emptySpacesArray.includes(element));
      checkIfViableMoveset();
    }

    const checkIfViableMoveset = () => {
      if (arrays.filteredSpaces.length === 0) {
        arrays.filteredSpaces = emptySpacesArray;
      }
      arrays.filteredSpaces.forEach((item) => {
        if (arrays.filteredSpaces.length < 3 && gameBoard.boardArray.array[item] !== "") {
          if (gameBoard.turnCounter.counter < 5) {
            arrays.winningMoves = [];
            arrays.filteredSpaces = [];
            chooseRandomMoveset();
          } else
          arrays.filteredSpaces = emptySpacesArray;
        }

        if (gameBoard.boardArray.array[item] === player.playerOneObj.marker) {
          arrays.winningPatterns.splice(chooseRandom.pattern, 1);
          arrays.winningMoves = [];
          arrays.filteredSpaces = [];
          chooseRandomMoveset();
        }
        
        if (gameBoard.turnCounter.counter > 5 && arrays.filteredSpaces.length < 3) {
          arrays.filteredSpaces = emptySpacesArray;
        }
      })
    }

    if (player.playerTwoObj.marker === "X" && gameBoard.turnCounter.counter === 0 || player.playerTwoObj.marker === "O" && gameBoard.turnCounter.counter === 1) {
      chooseRandomMoveset();
    }

    let viableSpace = 0;

    const checkIfViableSpace = () => {
      checkIfViableMoveset();
      // console.log("gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]]")
      // console.log(gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]])
      // console.log("Boolean(gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]] !== -)")
      // console.log(Boolean(gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]] !== ""))
      if (gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]] !== "") {
        createViableSpace();
      }
    }

    const createViableSpace = () => {
      viableSpace = Math.floor((Math.random() * 3));
      checkIfViableSpace();
    }
    
    createViableSpace();
    // console.log("arrays.filteredSpaces")
    // console.log(arrays.filteredSpaces)
    gameBoard.boardArray.array.splice(arrays.filteredSpaces[viableSpace], 1, `${player.playerTwoObj.marker}`);
      // console.log("arrays.winningPatterns")
      // console.log(arrays.winningPatterns)
    updateBoard();
    playerAddMarkToBoard();
  }

  const computerAddMarkToBoardMedium = () => {
    if (cancel.computerAddMarkToBoardMedium > 0) {
      return;
    }

    console.log("medium mode")

    let emptySpacesArray = [];
    
    gameBoard.boardArray.array.forEach((item, index) => {
      item === "" ? emptySpacesArray.push(index) : null;
    });

    const chooseRandomMoveset = () => {
      chooseRandom.pattern = Math.floor((Math.random() * arrays.winningPatterns.length));
      // console.log("chooseRandom.pattern")
      // console.log(chooseRandom.pattern)
      arrays.winningPatterns.forEach((item, index) => {
        arrays.winningMoves.push(arrays.winningPatterns[chooseRandom.pattern][index])
        let undefinedIndex = arrays.winningMoves.indexOf(undefined);
        undefinedIndex !== -1 ? arrays.winningMoves.splice(undefinedIndex, 1) : null;
      })
      arrays.filteredSpaces = arrays.winningMoves.filter((element) => emptySpacesArray.includes(element));
      checkIfViableMoveset();
    }

    const checkIfViableMoveset = () => {
      if (arrays.filteredSpaces.length === 0) {
        arrays.filteredSpaces = emptySpacesArray;
      }
      arrays.filteredSpaces.forEach((item) => {
        if (arrays.filteredSpaces.length < 3 && gameBoard.boardArray.array[item] !== "") {
          if (gameBoard.turnCounter.counter < 5) {
            arrays.winningMoves = [];
            arrays.filteredSpaces = [];
            chooseRandomMoveset();
          } else
          arrays.filteredSpaces = emptySpacesArray;
        }

        if (gameBoard.boardArray.array[item] === player.playerOneObj.marker) {
          arrays.winningPatterns.splice(chooseRandom.pattern, 1);
          arrays.winningMoves = [];
          arrays.filteredSpaces = [];
          chooseRandomMoveset();
        }
        
        if (gameBoard.turnCounter.counter > 5 && arrays.filteredSpaces.length < 3) {
          arrays.filteredSpaces = emptySpacesArray;
        }
      })
    }

    if (player.playerTwoObj.marker === "X" && gameBoard.turnCounter.counter === 0 || player.playerTwoObj.marker === "O" && gameBoard.turnCounter.counter === 1) {
      chooseRandomMoveset();
    }

    let viableSpace = 0;

    const checkIfViableSpace = () => {
      checkIfViableMoveset();
      // console.log("gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]]")
      // console.log(gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]])
      // console.log("Boolean(gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]] !== -)")
      // console.log(Boolean(gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]] !== ""))
      if (gameBoard.boardArray.array[arrays.filteredSpaces[viableSpace]] !== "") {
        createViableSpace();
      }
    }

    const createViableSpace = () => {
      viableSpace = Math.floor((Math.random() * 3));
      checkIfViableSpace();
    }
    
    createViableSpace();
    // console.log("arrays.filteredSpaces")
    // console.log(arrays.filteredSpaces)
    gameBoard.boardArray.array.splice(arrays.filteredSpaces[viableSpace], 1, `${player.playerTwoObj.marker}`);
      // console.log("arrays.winningPatterns")
      // console.log(arrays.winningPatterns)
    updateBoard();
    playerAddMarkToBoard();
  };

  const computerAddMarkToBoard = () => {
    let emptySpacesArray = [];
    gameBoard.boardArray.array.forEach((item, index) => {
      if (cancel.computerAddMarkToBoard > 0) {
        return;
      }
      item === "" ? emptySpacesArray.push(index) : null;
    });

    console.log("easy mode")

    const viableSpace = Math.floor((Math.random() * emptySpacesArray.length));
    gameBoard.boardArray.array.splice(emptySpacesArray[viableSpace], 1, `${player.playerTwoObj.marker}`);
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
      if (e.target.id == "p1-x-button" || e.target.id == "p2-o-button" ) {
        player.playerOneObj.marker = "X";
        player.playerTwoObj.marker = "O";
        addButtonColorToGroupA();
      }
      if (e.target.id == "p1-o-button" || e.target.id == "p2-x-button" ) {
        player.playerOneObj.marker = "O";
        player.playerTwoObj.marker = "X";
        addButtonColorToGroupB();
      }
      if (e.target.id === "start-game-players") {
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
          cancel.computerAddMarkToBoardMedium++
          cancel.computerAddMarkToBoardHard++
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
      if (e.target.id == "x-button") {
        player.playerOneObj.marker = "X";
        player.playerTwoObj.marker = "O";
        addButtonColorToGroupA();
      }
      if (e.target.id == "o-button") {
        player.playerOneObj.marker = "O";
        player.playerTwoObj.marker = "X";
        addButtonColorToGroupB();
      }
      if (e.target.id == "easy-mode") {
        cancel.computerAddMarkToBoard = 0;
        cancel.computerAddMarkToBoardMedium = 1;
        cancel.computerAddMarkToBoardHard = 1;
      }
      if (e.target.id == "medium-mode") {
        cancel.computerAddMarkToBoard = 1;
        cancel.computerAddMarkToBoardMedium = 0;
        cancel.computerAddMarkToBoardHard = 1;
      }
      if (e.target.id == "hard-mode") {
        cancel.computerAddMarkToBoard = 1;
        cancel.computerAddMarkToBoardMedium = 1;
        cancel.computerAddMarkToBoardHard = 0;
      }

      if (e.target.id === "start-game-computer") {
        if (player.playerOneObj.marker === "" || cancel.computerAddMarkToBoard > 0 && cancel.computerAddMarkToBoardMedium > 0 && cancel.computerAddMarkToBoardHard > 0) {
          return;
        }
        player.playerOneObj.name = "Player One";
        player.playerTwoObj.name = "Computer";
        playerOneIndicator.innerText = `${player.playerOneObj.name}`;
        playerTwoIndicator.innerText = `${player.playerTwoObj.name}`;
        cancel.twoPlayersAddMarkToBoard++;
        cancel.playerAddMarkToBoard = 0;
        gameBoard.newGame();
        displayBoard();

        player.playerOneObj.marker === "X" ? playerAddMarkToBoard() : null;
        player.playerTwoObj.marker === "X" && cancel.computerAddMarkToBoard === 0 ? computerAddMarkToBoard() : null;
        player.playerTwoObj.marker === "X" && cancel.computerAddMarkToBoardMedium === 0 ? computerAddMarkToBoardMedium() : null;
        player.playerTwoObj.marker === "X" && cancel.computerAddMarkToBoardHard === 0 ? computerAddMarkToBoardHard() : null;
      }
    });
  };

  restartButton.addEventListener("click", () => {
    gameBoard.newGame()
    player.playerTwoObj.name === "Computer" && player.playerTwoObj.marker === "X" ? computerAddMarkToBoardMedium() : null;
  });

  backButton.addEventListener("click", showMainMenu);
  menuButton.addEventListener("click", showMainMenu);
  computer.addEventListener("click", gameStartComputer);
  twoPlayer.addEventListener("click", gameStartPlayers);
  return {displayStartScreen, cancel, playerOneIndicator, playerTwoIndicator, addTurnIndicatorX, addTurnIndicatorO, arrays}
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

