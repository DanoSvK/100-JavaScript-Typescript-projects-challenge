const inputs = document.querySelectorAll("input");

inputs.forEach((input) =>
  input.addEventListener("change", (e) => {
    if (input.value != "") {
      e.target.nextElementSibling.classList.add("filled");
    }
    if (input.value == "") {
      e.target.nextElementSibling.classList.remove("filled");
    }
  })
);
// inputs.forEach((input) =>
//   input.addEventListener("active", (e) => {
//     e.target.nextElementSibling.style.top = "-25px";
//     e.target.nextElementSibling.style.left = "-15px";
//   })
// );
// inputs.forEach((input) => {
//   if (input.value != "") {
//     input.nextElementSibling.style.top = "-25px";
//     input.nextElementSibling.style.left = "-15px";
//   } else {
//     input.nextElementSibling.style.top = "0px";
//     input.nextElementSibling.style.left = "0px";
//   }
// });

// document.addEventListener("input", function (e) {
//   if (e.target.tagName === "INPUT") {
//     const inputId = e.target.id;
//     const associatedLabel = document.querySelector(`label[for="${inputId}"]`);

//     if (associatedLabel) {
//       const spanElement = associatedLabel.nextElementSibling;
//       if (spanElement) {
//         // Do something with the spanElement, for example, modify its content or style
//         spanElement.textContent = "New Text"; // Change this line based on your requirements
//       }
//     }
//   }
// });

// inputs.forEach((input) =>
//   input.addEventListener("input", () => {
//     const inputId = input.id;
//     const associatedLabel = document.querySelector(`label[for="${inputId}"]`);
//     console.log(input.nextSibling);
//     if (associatedLabel) {
//       const spanElement = associatedLabel.nextElementSibling;
//       console.log(spanElement);
//       if (spanElement) {
//         spanElement.style.top = "-25px";
//         spanElement.style.left = "-15px";
//       }
//     }
//   })
// );
