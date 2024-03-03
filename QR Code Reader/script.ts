const statusText = document.querySelector(".status-text") as HTMLParagraphElement; // prettier-ignore
const div = document.querySelector(".flex") as HTMLDivElement;
const spinner = document.querySelector(".spinner") as HTMLImageElement;
const img = document.querySelector(".qr-code-img") as HTMLImageElement;
const fileInput = document.querySelector("#myFile") as HTMLInputElement;
const form = document.querySelector("form") as HTMLFormElement;
const uploadImg = document.querySelector(".upload-img") as HTMLElement;
const resDataText = document.querySelector(
  ".response-data"
) as HTMLParagraphElement;
const details = document.querySelector(".details") as HTMLDivElement;
const mainWindow = document.querySelector(".upload-window") as HTMLDivElement;
const closeBtn = document.querySelector(".close-btn") as HTMLButtonElement;
const copyBtn = document.querySelector(".copy-btn") as HTMLButtonElement;

fileInput.addEventListener("change", async () => {
  try {
    // Fetching data
    statusText.textContent = "Scanning qr code...";
    spinner.style.display = "inline";
    uploadImg.style.display = "none";

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // Handle file upload
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);

      // Handle QR Code API
      const params = {
        method: "POST",
        body: formData,
      };

      const res = await fetch(
        "http://api.qrserver.com/v1/read-qr-code/",
        params
      );

      const data = await res.json();

      // Error handling
      if (data[0].symbol[0].error) throw new Error(data[0].symbol[0].error);

      // Dynamic content/style
      // QR Code img
      img.style.display = "inline";
      img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        data[0].symbol[0].data
      )}`;

      resDataText.textContent = data[0].symbol[0].data;

      // Fetched data
      statusText.textContent = "";
      spinner.style.display = "none";

      // Details window shows up
      mainWindow.classList.add("active");
      details.classList.add("active");
    }
  } catch (err) {
    statusText.textContent = err;
    spinner.style.display = "none";
  }
});

form.addEventListener("click", () => {
  fileInput.click();
});

closeBtn.addEventListener("click", () => {
  mainWindow.classList.remove("active");
  details.classList.remove("active");
  uploadImg.style.display = "block";
  img.style.display = "none";
  statusText.textContent = "Upload QR Code To Read";
  fileInput.value = "";
});

copyBtn.addEventListener("click", async (): Promise<void> => {
  copyBtn.disabled = true;
  if (resDataText.textContent) {
    await navigator.clipboard.writeText(resDataText.textContent);
  }
  copyBtn.textContent = "Copied!";
  copyBtn.style.backgroundColor = "#198754";
  copyBtn.style.color = "#ffffff";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
    copyBtn.style.backgroundColor = "#ffffff";
    copyBtn.style.color = "#000000";
    copyBtn.disabled = false;
  }, 2000);
});
