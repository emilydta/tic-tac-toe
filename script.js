const gameBoard = (() => {
  let array = [
    "p","X","p",
    "p","p","p",
    "p","p","p"
  ]

  const gridSquare = document.querySelectorAll(".grid-square");

  return {array, gridSquare}
  
})()

const displayController = (() => {
  const addArrayToDisplay = (() => {
    for (let i = 0; i < gameBoard.array.length; i++) {
      gameBoard.gridSquare[i].innerText = gameBoard.array[i];
      if (gameBoard.array[i] == "p") {
        gameBoard.gridSquare[i].innerText = "";
      }
    }
  })()

  const gridSquare = document.querySelector(".grid-squares");
  gridSquare.addEventListener("click", (e) => {
      if (e.target.innerText == "") {
        e.target.innerText = "X"
      };
      for (let i = 0; i < 9; i++) {
        gameBoard.array = [];
        gameBoard.array.push(`${gameBoard.gridSquare[i].innerText}`)
        console.log(gameBoard.array);
      }
  });

})();
