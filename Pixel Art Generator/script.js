const input = document.querySelector(".range-input");
const grid = document.querySelector(".grid");
const color = document.querySelector(".color-input");
const clearBtn = document.querySelector(".clear");
const eraseBtn = document.querySelector(".erase");
const paintBtn = document.querySelector(".paint");
const borderBtn = document.querySelector(".border");
const buttons = document.querySelector(".controls");
const size = document.querySelector("p");

// Anchor for dynamic grid size nubmer
let gridSize;

// Generate and append grid items based on grid size variable
const createGrid = function () {
  gridSize = input.value;
  size.textContent = gridSize;
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (i = 0; i < gridSize * gridSize; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("item");
    grid.appendChild(gridElement);
  }
  console.log(document.querySelectorAll(".item").length);
};
createGrid();

// Change color if Paint button is active
const changeColor = function () {
  document.querySelectorAll(".item").forEach((item) =>
    item.addEventListener("mouseover", function () {
      if (paintBtn.classList.contains("active")) {
        item.style.backgroundColor = `${color.value}`;
      }
    })
  );
};
changeColor();

// Toggle active state between Paint and Erase buttons
buttons.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    document
      .querySelectorAll(".btn")
      .forEach((btn) => btn.classList.remove("active"));
    if (!e.target.classList.contains("btn")) return;
    e.target.classList.toggle("active");
  }
});

// Change size of the grid based on current input range
input.addEventListener("change", function () {
  document.querySelectorAll(".item").forEach((item) => item.remove());
  createGrid();
  changeColor();
  eraseFn();
  size.textContent = gridSize;
});

// Clear button
clearBtn.addEventListener("click", function (e) {
  document
    .querySelectorAll(".item")
    .forEach((item) => (item.style.backgroundColor = "transparent"));
});

// Erase functionality
const eraseFn = function () {
  document.querySelectorAll(".item").forEach((item) =>
    item.addEventListener("mouseover", function () {
      if (eraseBtn.classList.contains("active")) {
        item.style.backgroundColor = "transparent";
      }
    })
  );
};
eraseFn();

// Toggle borders
borderBtn.addEventListener("mousedown", function (e) {
  borderBtn.classList.toggle("active");
  if (!borderBtn.classList.contains("active")) {
    grid.style.border = "none";
    document
      .querySelectorAll(".item")
      .forEach((item) => (item.style.border = "none"));
  } else {
    grid.style.border = "1px solid #000000";
    document
      .querySelectorAll(".item")
      .forEach((item) => (item.style.border = "1px solid #000000"));
  }
});
