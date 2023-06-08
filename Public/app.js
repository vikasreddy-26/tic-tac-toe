const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];

let go = "circle";

infoDisplay.textContent = "Circle Goes First";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();

function addGo(e) {
  const dis = document.createElement("div");
  dis.classList.add(go);
  e.target.append(dis);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "it's now " + go + "'s trun";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const wininngCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wininngCombos.forEach((arr) => {
    const circleWins = arr.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
  wininngCombos.forEach((arr) => {
    const crossWins = arr.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  const isDraw = Array.from(allSquares).every(
    (square) => square.firstChild !== null
  );
  if (isDraw) {
    infoDisplay.textContent = "It's a draw!!";
    allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  }
}
