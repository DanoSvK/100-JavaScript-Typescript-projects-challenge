const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    document.querySelector(".grid").style.display = "grid";
    document.querySelector("button").style.display = "none";
  };
  return { render };
})();

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createPlayers = (name, mark) => {
  return {
    name: name,
    mark: mark,
  };
};

const gameStart = () => {
  const imgX = '<img class="img-x" src="./x.svg" />';
  const imgO = '<img class="img-o" src="./o.svg" />';
  let gameWon = false;
  let currPlayer = 0;
  let arr = [[], []];
  const players = [
    createPlayers("Player 1", imgX),
    createPlayers(`Player 2`, imgO),
  ];

  const handleWin = (array, player) => {
    return winConditions.some((condition) => {
      return condition.every((index) => array[player].includes(index));
    });
  };

  gameBoard.render();
  document.querySelector(".grid").addEventListener("click", (e) => {
    if (gameWon) {
      return;
    }
    if (e.target.classList.contains("field")) {
      if (e.target.innerHTML == "") {
        e.target.innerHTML = players[currPlayer].mark;
        arr[currPlayer].push(+e.target.dataset.id);
      } else {
        return;
      }
    }
    if (handleWin(arr, currPlayer)) {
      console.log(`Player ${currPlayer + 1} has won!`);
      gameWon = true;
    } else {
      currPlayer = currPlayer == 0 ? 1 : 0;
    }
  });
};

document.querySelector("button").addEventListener("click", gameStart);
