const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    gameBoard.forEach(
      (index, element) =>
        (document.querySelector(
          ".grid"
        ).innerHTML += `<div class="field" data-id="${element}"></div>`)
    );
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
  let currPlayer = 0;
  let arr = [[], []];
  const players = [
    createPlayers(prompt("Enter palyer 1 name"), "x"),
    createPlayers(prompt("Enter palyer 1 name"), "o"),
  ];
  gameBoard.render();
  document.querySelector(".grid").addEventListener("click", (e) => {
    if (e.target.classList.contains("field")) {
      if (e.target.innerHTML == "") {
        e.target.innerHTML = players[currPlayer].mark;
        arr[currPlayer].push(e.target.dataset.id);
        console.log(arr);
      } else {
        return;
      }
    }
    if (handleWin(arr)) {
      console.log(`Player ${currPlayer + 1} has won!`);
    } else {
      currPlayer = currPlayer == 0 ? 1 : 0;
    }
  });
  const handleWin = (array) => {
    return winConditions.some((condition) => {
      return condition.every((index) => array[currPlayer].includes(index));
    });
  };
};

document.querySelector("button").addEventListener("click", gameStart);
console.log(document.querySelector("button"));
