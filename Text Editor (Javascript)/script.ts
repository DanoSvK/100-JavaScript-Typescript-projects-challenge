const buttons = document.querySelectorAll(".option-button")!;
const iFrameElement = document.querySelector(".text") as HTMLIFrameElement;
const scriptButtons = document.querySelectorAll(".script")!;
const alignButtons = document.querySelectorAll(".align")!;
const spacingButtons = document.querySelectorAll(".spacing")!;
const formatButtons = document.querySelectorAll(".format")!;
const fontButton = document.getElementById("fontName")!;
const fontSizeButton = document.getElementById("fontSize")!;
const fontColorButton = document.getElementById("fontColor")!;
const undoButton = document.getElementById("undo")!;
const redoButton = document.getElementById("redo")!;
const fontWrapper = document.querySelector(".font")!;
const paragraphWrapper = document.querySelector(".paragraph")!;

document.querySelector(".font-wrapper")?.addEventListener("click", () => {
  paragraphWrapper.classList.remove("mobile-active");
  fontWrapper.classList.add("mobile-active");
});

document.querySelector(".paragraph-wrapper")!.addEventListener("click", () => {
  fontWrapper.classList.remove("mobile-active");
  paragraphWrapper.classList.add("mobile-active");
});

iFrameElement.addEventListener("load", function () {
  // This function will be executed when the iframe content has finished loading
  let iframeWindow = iFrameElement.contentWindow;

  // Attach your event listener to the window object of the iframe
  if (iframeWindow) {
    iframeWindow.addEventListener("click", function (event) {
      fontWrapper.classList.remove("mobile-active");
      paragraphWrapper.classList.remove("mobile-active");
    });
  }
});

let show = false;
textField.document.body.style.wordWrap = "break-word";
textField.document.designMode = "on";
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let cmd = button.getAttribute("data-cmd");
    if (cmd === "insertImage" || cmd === "createLink") {
      let url = prompt("Enter url here");
      textField.document.execCommand(cmd, false, url);
    } else {
      textField.document.execCommand(cmd, false, null);
    }
    if (cmd === "showCode") {
      let body = textField.document.querySelector("body");
      if (show) {
        body.innerHTML = body.textContent;
        show = false;
      } else {
        body.textContent = body.innerHTML;
        show = true;
      }
    }
  });
});

const highlighter = (className: Element[], needsRemoval: boolean) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

highlighter(alignButtons, true);
highlighter(spacingButtons, true);
highlighter(formatButtons, false);
highlighter(scriptButtons, true);

fontButton.addEventListener("change", (e) => {
  let font = e.target.value;
  textField.document.execCommand(fontButton.id, false, font);
});

fontSizeButton.addEventListener("change", (e) => {
  let size = e.target.value;
  textField.document.execCommand(fontSizeButton.id, false, size);
});

fontColorButton.addEventListener("change", (e) => {
  let color = e.target.value;
  textField.document.execCommand(fontColorButton.id, false, color);
});

undoButton.addEventListener("click", () => {
  textField.document.execCommand(undoButton.id, false, null);
});

redoButton.addEventListener("click", () => {
  textField.document.execCommand(redoButton.id, false, null);
});
