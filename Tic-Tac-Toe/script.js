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
  let playerPoints = [[], []];
  let arrWin = [];
  let rounds = 5;
  let i = 1;
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
    if (rounds === i) {
      document.querySelector(".win-game").style.display = "block";
      document.querySelector(".win-game-modal").innerHTML = `<p>Player ${
        player + 1
      } won the game!`;
      return;
    }
    i++;
    document.querySelector(".win-screen").style.display = "block";
    document.querySelector(".win-modal").innerHTML = `<p>Player ${
      player + 1
    } won round ${i - 1}`;
  };

  const handleRestart = () => {
    arr = [[], []];
    currPlayer = 0;
    arrWin = [];
    isWin = false;
    gameWon = false;
  };

  gameBoard.render();
  document.querySelector(".grid").addEventListener("click", (e) => {
    console.log(arr);
    if (gameWon) {
      return;
    }
    if (e.target.classList.contains("field")) {
      if (e.target.innerHTML == "") {
        e.target.innerHTML = players[currPlayer].mark;
        arr[currPlayer].push(+e.target.dataset.id);
        if (handleWin(arr, currPlayer)) {
          highlightWinningFields(arrWin);
          handleWinningScreen(currPlayer);
          playerPoints[currPlayer]++;
          document.querySelector(`.p${currPlayer + 1}`).innerHTML =
            playerPoints[currPlayer];
          console.log(playerPoints[currPlayer]);
          gameWon = true;
        } else {
          currPlayer = currPlayer == 0 ? 1 : 0;
        }
      } else {
        return;
      }
    }
  });

  document.querySelector(".next-round-btn").addEventListener("click", () => {
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
    });
    document.querySelector(".win-screen").style.display = "none";
    handleRestart();
  });

  document.querySelector(".restart-btn").addEventListener("click", () => {
    i = 1;
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
    });
    document.querySelector(".win-game").style.display = "none";
    handleRestart();
    playerPoints = [[], []];
    document.querySelector(".p1").innerHTML = 0;
    document.querySelector(".p2").innerHTML = 0;
  });

  document.querySelectorAll(".main-menu").forEach((btn) =>
    btn.addEventListener("click", () => {
      i = 1;
      document.querySelectorAll(".field").forEach((el) => {
        el.innerHTML = "";
        el.classList.remove("winner");
      });
      document.querySelector(".grid").style.display = "none";
      document.querySelector(".win-screen").style.display = "none";
      document.querySelector(".win-game").style.display = "none";
      document.querySelector(".btn-pvp").style.display = "block";
      handleRestart();
      playerPoints = [[], []];
      document.querySelector(".p1").innerHTML = 0;
      document.querySelector(".p2").innerHTML = 0;
    })
  );

  const highlightWinningFields = (winningCombination) => {
    for (const index of winningCombination) {
      const field = document.querySelector(`.field[data-id="${index}"]`);
      field.classList.add("winner");
    }
  };
};

document.querySelector(".btn-pvp").addEventListener("click", gameStart);
// document.querySelector(".restart-btn").addEventListener("click", gameStart);
