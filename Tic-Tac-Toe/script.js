// Rendering game board
const gameBoard = (() => {
  const render = () => {
    document.querySelector(".grid").style.display = "grid";
    document.querySelector(".btn-pvp").style.display = "none";
    document.querySelector(".points").style.display = "block";
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

// Main object
class GameStart {
  grid = document.querySelector(".grid");
  nextRound = document.querySelector(".next-round-btn");
  restart = document.querySelector(".restart-btn");
  mainMenu = document.querySelectorAll(".main-menu");
  startBtn = document.querySelector(".btn-pvp");
  winRoundScreen = document.querySelector(".win-screen");
  winGameScreen = document.querySelector(".win-game");
  points = document.querySelector(".points");
  isWin = false;
  imgX = '<img class="img-x" src="./x.svg" />';
  imgO = '<img class="img-o" src="./o.svg" />';
  gameWon = false;
  currPlayer = 0;
  arr = [[], []];
  playerPoints = [[], []];
  arrWin = [];
  rounds = 5;
  i = 1;
  players = [
    createPlayers("Player 1", this.imgX),
    createPlayers(`Player 2`, this.imgO),
  ];

  constructor() {
    this.startBtn.addEventListener("click", gameBoard.render);
    this.grid.addEventListener("click", this.handlePlay.bind(this));
    this.nextRound.addEventListener("click", this.handleNextRound.bind(this));
    this.restart.addEventListener("click", this.handleRestart.bind(this));
    this.mainMenu.forEach((btn) =>
      btn.addEventListener("click", this.handleMainMenu.bind(this))
    );
  }

  handleWin(array, player) {
    return winConditions.some((condition) => {
      this.isWin = condition.every((index) => array[player].includes(index));
      if (this.isWin) {
        this.arrWin = condition;
      }
      return this.isWin;
    });
  }

  handleWinningScreen(player) {
    // Win round screen
    if (this.rounds === this.i) {
      this.winGameScreen.style.display = "block";
      document.querySelector(".win-game-modal").innerHTML = `<p>Player ${
        player + 1
      } won the game!`;
      return;
    }
    // Win game screen
    this.i++;
    this.winRoundScreen.style.display = "block";
    document.querySelector(".win-modal").innerHTML = `<p>Player ${
      player + 1
    } won round ${this.i - 1}`;
  }

  handleDataReset = () => {
    this.arr = [[], []];
    this.currPlayer = 0;
    this.arrWin = [];
    this.isWin = false;
    this.gameWon = false;
  };

  highlightWinningFields(winningCombination) {
    for (const index of winningCombination) {
      const field = document.querySelector(`.field[data-id="${index}"]`);
      field.classList.add("winner");
    }
  }

  handlePlay(e) {
    console.log(this.arr.length);
    if (this.gameWon) {
      return;
    }
    if (e.target.classList.contains("field") && e.target.innerHTML == "") {
      e.target.innerHTML = this.players[this.currPlayer].mark;
      this.arr[this.currPlayer].push(+e.target.dataset.id);
      if (this.handleWin(this.arr, this.currPlayer)) {
        this.highlightWinningFields(this.arrWin);
        this.handleWinningScreen(this.currPlayer);
        this.playerPoints[this.currPlayer]++;
        document.querySelector(`.p${this.currPlayer + 1}`).innerHTML =
          this.playerPoints[this.currPlayer];
        this.gameWon = true;
      } else {
        this.currPlayer = this.currPlayer == 0 ? 1 : 0;
      }
    } else {
      return;
    }
  }

  handleNextRound() {
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
    });
    document.querySelector(".win-screen").style.display = "none";
    this.handleDataReset();
  }

  resetPlayerPoint() {
    this.playerPoints = [[], []];
    document.querySelector(".p1").innerHTML = 0;
    document.querySelector(".p2").innerHTML = 0;
  }

  handleRestart() {
    this.i = 1;
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
    });
    document.querySelector(".win-game").style.display = "none";
    this.handleDataReset();
    this.resetPlayerPoint();
  }

  handleMainMenu() {
    this.i = 1;
    document.querySelectorAll(".field").forEach((el) => {
      el.innerHTML = "";
      el.classList.remove("winner");
      this.grid.style.display = "none";
      this.winRoundScreen.style.display = "none";
      this.winGameScreen.style.display = "none";
      this.startBtn.style.display = "block";
      this.points.style.display = "none";
      this.handleDataReset();
      this.resetPlayerPoint();
    });
  }
}

document.querySelector(".btn-pvp").addEventListener("click", new GameStart());
