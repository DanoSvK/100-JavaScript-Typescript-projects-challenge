const buttons = document.querySelectorAll(".option-button");
const text = document.querySelector(".text");
const scriptButtons = document.querySelectorAll(".script");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");

let show = false;
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

const highlighter = (className, needsRemoval) => {
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

document.querySelector("#fontName").addEventListener("change", (e) => {
  let font = e.target.value;
  textField.document.execCommand("fontName", false, font);
});

document.querySelector("#fontSize").addEventListener("change", (e) => {
  let size = e.target.value;
  textField.document.execCommand("fontSize", false, size);
});

document.querySelector("#fontColor").addEventListener("change", (e) => {
  let color = e.target.value;
  textField.document.execCommand("foreColor", false, color);
});
