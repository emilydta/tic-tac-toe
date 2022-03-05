const gameBoard = (() => {
  let array = [
    "","X","",
    "","","",
    "","",""
  ]

  const gridSquare = document.querySelectorAll(".grid-square");

  return {array, gridSquare}
  
})()

const displayController = (() => {
  const addMarkToBoard = (() => {
    const gridSquare = document.querySelector(".grid-squares");
    gridSquare.addEventListener("click", (e) => {
        if (e.target.innerText == "") {
          e.target.innerText = player.playerObj.marker;
          for (let i = 0; i < 9; i++) {
            gameBoard.array.splice(i, 1, `${gameBoard.gridSquare[i].innerText}`)
          }
        };
    });
  })();

})();

const player = (() => {
    let playerObj = {marker: ""};
    document.getElementById("x-button").addEventListener("click", () => {
      playerObj.marker = "X";
    })
    document.getElementById("o-button").addEventListener("click", () => {
      playerObj.marker = "O";
    })
  return {playerObj};
})();
