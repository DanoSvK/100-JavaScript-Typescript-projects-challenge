const input = document.querySelector("#grid-selector") as HTMLInputElement;
const inputText = document.querySelector("label") as HTMLLabelElement;
const generateBtn = document.querySelector(
  ".generate-btn"
) as HTMLButtonElement;

let n: number = +input.value;
inputText.innerHTML = `${n}x${n}`;
generateBtn.textContent = `Regenerate objects on ${n}x${n} grid`;
// Render objects on input change
(document.querySelector("input") as HTMLInputElement).addEventListener(
  "change",
  (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      // Null check passed, now you can safely access e.target.value
      n = +e.target.value;
      inputText.innerHTML = `${n}x${n}`;
      generateBtn.textContent = `Regenerate objects on ${n}x${n} grid`;
      console.log(n);
      createGeometryObjects();
    }
  }
);

const createGeometryObjects = (): void => {
  const appElement = document.querySelector(".app") as HTMLDivElement;
  appElement.innerHTML = "";
  // prettier-ignore
  const geometryObjects = ["circle", "quad-circle-1", "quad-circle-2", "quad-circle-3", "quad-circle-4", "triangle-1", "triangle-2", "triangle-3", "triangle-4"]
  appElement.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  for (let i = 0; i < n * n; i++) {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    const RGBColor = `rgb(${R},${G},${B})`;
    const randomNumber = Math.floor(Math.random() * geometryObjects.length);
    const element = document.createElement("div");
    element.classList.add(geometryObjects[randomNumber]);
    element.style.backgroundColor = RGBColor;
    appElement.innerHTML += element.outerHTML;
  }
};
createGeometryObjects();

generateBtn.addEventListener("click", createGeometryObjects);
