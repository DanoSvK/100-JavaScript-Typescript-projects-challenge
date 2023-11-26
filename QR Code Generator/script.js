const text = document.getElementById("text");
const colorWhiteInput = document.getElementById("color-white");
const colorBlackInput = document.getElementById("color-black");

let size = 400;
let colorLight = "#ffffff";
let colorDark = "#000000";
let qrcode;
text.value = "https://github.com/DanoSvK";

// Generate QR code API
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

// Generating QR codes based on changing inputs/data
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

// Fetching base64 of the QR code
function generateImage() {
  try {
    setTimeout(() => {
      const img = document.querySelector("#qrcode img").currentSrc;

      if (!img) {
        throw new Error(`Could not generate QR code`);
      }
      document.querySelector(".download").href = img;
    }, 1000);
  } catch (error) {
    console.error(`${error}`);
  }
}
generateImage();

// Share functionality
document.querySelector(".share").addEventListener("click", async () => {
  const data = document.querySelector(".download").href;

  try {
    const base64Data = data.split(",")[1]; // Remove the "data:image/png;base64," part
    // convert the base64 data to an array buffer
    const arrayBuffer = Uint8Array.from(atob(base64Data), (c) =>
      c.charCodeAt(0)
    );

    // This creates a Blob from the Uint8Array, specifying the MIME type as "image/png"
    const blob = new Blob([arrayBuffer], { type: "image/png" });
    // This creates a File object from the Blob,
    const file = new File([blob], "QR Code.png", { type: blob.type });

    const shareData = {
      title: "QR Code",
      text: "I am sharing the attached QR code with you.",
      files: [file],
    };

    await navigator.share(shareData);
    console.log("Shared successfully");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});
