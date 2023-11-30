const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    document.querySelector(".grid").style.display = "grid";
    document.querySelector(".btn-pvp").style.display = "none";
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
  let isWin = false;
  const imgX = '<img class="img-x" src="./x.svg" />';
  const imgO = '<img class="img-o" src="./o.svg" />';
  let gameWon = false;
  let currPlayer = 0;
  let arr = [[], []];
  let arrWin = [];
  const players = [
    createPlayers("Player 1", imgX),
    createPlayers(`Player 2`, imgO),
  ];

  const handleWin = (array, player) => {
    return winConditions.some((condition) => {
      isWin = condition.every((index) => array[player].includes(index));
      if (isWin) {
        arrWin = condition;
      }
      return isWin;
    });
  };

  const handleWinningScreen = (player) => {
    document.querySelector(".win-screen").style.display = "block";
    document.querySelector(".win-modal").innerHTML = `<p>Player ${
      player + 1
    } won`;
  };

  const handleRestart = () => {
    arr = [[], []];
    arrWin = [];
    isWin = false;
    gameWon = false;
  };

  gameBoard.render();
  document.querySelector(".grid").addEventListener("click", (e) => {
    console.log(arr);
    console.log(isWin);
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
      highlightWinningFields(arrWin);
      handleWinningScreen(currPlayer);
      gameWon = true;
      handleRestart();
      console.log(arr);
    } else {
      currPlayer = currPlayer == 0 ? 1 : 0;
    }
  });

  document.querySelector(".restart-btn").addEventListener("click", () => {
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
    });
    document.querySelector(".win-screen").style.display = "none";
  });

  document.querySelector(".main-menu").addEventListener("click", () => {
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
    });
    document.querySelector(".grid").style.display = "none";
    document.querySelector(".win-screen").style.display = "none";
    document.querySelector(".btn-pvp").style.display = "block";
  });

  const highlightWinningFields = (winningCombination) => {
    for (const index of winningCombination) {
      const field = document.querySelector(`.field[data-id="${index}"]`);
      field.classList.add("winner");
    }
  };
};

document.querySelector(".btn-pvp").addEventListener("click", gameStart);
document.querySelector(".restart-btn").addEventListener("click", gameStart);
