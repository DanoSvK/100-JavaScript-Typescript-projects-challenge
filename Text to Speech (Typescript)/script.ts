const synth = window.speechSynthesis;
const convertBtn = document.querySelector(".convert-btn") as HTMLButtonElement;
const voiceSelect = document.querySelector("select") as HTMLSelectElement;
const text = document.querySelector("textarea") as HTMLTextAreaElement;

let voices: SpeechSynthesisVoice[] = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].lang}`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}
synth.addEventListener("voiceschanged", populateVoiceList);

let voiceName = "";
let voiceLang = "";
voiceSelect.addEventListener("change", (e: Event) => {
  const voicesList = document.querySelectorAll(
    "option"
  ) as NodeListOf<HTMLOptionElement>;
  const target = e.target as HTMLSelectElement;
  const selectedIndex = target.selectedIndex;
  const selectedOption = voicesList[selectedIndex];
  voiceName = selectedOption.dataset.name || "0";
  voiceLang = selectedOption.dataset.lang || "0";
});

convertBtn.addEventListener("click", () => {
  convertBtn.disabled = true;
  convertBtn.style.backgroundColor = "#D3D3D3";
  let utterance = new SpeechSynthesisUtterance(text.value);
  utterance.voice =
    speechSynthesis.getVoices().find((voice) => voice.name === voiceName) ||
    null;
  utterance.lang = voiceLang;

  speechSynthesis.speak(utterance);

  utterance.addEventListener("end", () => {
    convertBtn.disabled = false;
    convertBtn.style.backgroundColor = "#5256ad";
  });
});
