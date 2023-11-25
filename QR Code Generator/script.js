const text = document.getElementById("text");
const colorWhiteInput = document.getElementById("color-white");
const colorBlackInput = document.getElementById("color-black");

let size = 400;
let colorLight = "#ffffff";
let colorDark = "#000000";
let qrcode;
const generateQR = () => {
  document.getElementById("qrcode").innerHTML = "";
  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: text.value,
    width: size,
    height: size,
    colorDark,
    colorLight,
    correctLevel: QRCode.CorrectLevel.H,
  });
};

generateQR();

document.getElementById("sizes").addEventListener("input", () => {
  size = document.getElementById("sizes").value;
  generateQR();
});

colorWhiteInput.addEventListener("input", () => {
  colorLight = colorWhiteInput.value;
  generateQR();
});

colorBlackInput.addEventListener("input", () => {
  colorDark = colorBlackInput.value;
  generateQR();
});

text.addEventListener("input", () => {
  generateQR();
});

function fetchProducts() {
  try {
    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error
    setTimeout(() => {
      const img = document.querySelector("#qrcode img").currentSrc;

      if (!img) {
        throw new Error(`ou nou`);
      }
      document.querySelector(".download").href = img;
    }, 1000);
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}
fetchProducts();
