// prettier-ignore
const selectCountries = document.querySelectorAll("select") as NodeListOf<HTMLSelectElement>;
// prettier-ignore
const translatingTextEl = document.querySelector(".from") as HTMLTextAreaElement;
// prettier-ignore
const transladetTextEl = document.querySelector(".to") as HTMLTextAreaElement;
// prettier-ignore
const copyToButton = document.querySelector('.btn-copy-to') as HTMLDivElement
// prettier-ignore
const copyFromButton = document.querySelector(".btn-copy-from") as HTMLDivElement;
// prettier-ignore
const fromCountryCode = document.querySelector(".from-country") as HTMLSelectElement;
// prettier-ignore
const toCountryCode = document.querySelector(".to-country") as HTMLSelectElement;
// const translateBtn = document.querySelector(".btn") as HTMLButtonElement;
const errorMsg = document.querySelector(".error-message") as HTMLDivElement;
const soundTo = document.querySelector(".sound-to")!;
const soundFrom = document.querySelector(".sound-from")!;
const exchangeBtn = document.querySelector(".exchange")!;

// Populate select elements with country names and country codes for api
const renderCountries = (): void => {
  const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu",
  };
  for (const [key, value] of Object.entries(countries)) {
    selectCountries.forEach(
      (el) => (el.innerHTML += `<option value="${key}">${value}</option>`)
    );
  }
};
renderCountries();

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  errorMsg.classList.add("active");
  setTimeout(() => {
    errorMsg.classList.remove("active");
  }, 3000);
};

// Clipboard
copyToButton.addEventListener("click", (): void => {
  copyToClipboard(translatingTextEl.value);
});

copyFromButton.addEventListener("click", (): void => {
  copyToClipboard(transladetTextEl.value);
});

// Exchange selected languages and translated/original text
exchangeBtn.addEventListener("click", (): void => {
  // Select text from select -> option element (name of the language)
  let selectedOption = fromCountryCode.options[fromCountryCode.selectedIndex];
  let selectedOption2 = toCountryCode.options[toCountryCode.selectedIndex];

  // Exhange language names in select element
  let tempLang: string = selectedOption.text;
  selectedOption.text = selectedOption2.text;
  selectedOption2.text = tempLang;

  // Echange country code values in select elements
  let tempCode: string = fromCountryCode.value;
  fromCountryCode.value = toCountryCode.value;
  toCountryCode.value = tempCode;

  // Exchange original/translated text
  let tempText: string = translatingTextEl.value;
  translatingTextEl.value = transladetTextEl.value;
  transladetTextEl.value = tempText;
});

// Fetch translation API
const getData = (): void => {
  const fromText: string = translatingTextEl.value.trim();
  fetch(
    `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromCountryCode.value}|${toCountryCode.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.responseDetails === "PLEASE SELECT TWO DISTINCT LANGUAGES") {
        throw new Error(
          `${data.responseDetails.slice(0, 1)}${data.responseDetails
            .toLowerCase()
            .slice(1)}`
        );
      } else if (
        data.responseStatus === "403" ||
        translatingTextEl.value.trim() === ""
      ) {
        throw new Error("Please, enter a text!");
      } else {
        transladetTextEl.value = data.responseData.translatedText;
      }
    })
    .catch((err): void => {
      transladetTextEl.value = err;
    });
};

// const getData = async (): Promise<void> => {
//   // prettier-ignore
//   const fromCountryCode: string = (document.querySelector(".from-country") as HTMLSelectElement).value
//   // prettier-ignore
//   const toCountryCode: string = (document.querySelector(".to-country") as HTMLSelectElement).value

//   const fromText: string = translatingTextEl.value;

//   console.log(fromText);
//   const res = await fetch(
//     `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromCountryCode}|${toCountryCode}`
//   );
//   const data = await res.json();
//   console.log(data);
// };

// translateBtn.addEventListener("click", getData);

translatingTextEl.addEventListener("input", getData);

soundTo.addEventListener("click", (): void => {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(transladetTextEl.value);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice
  utterance.lang = toCountryCode.value;

  // Speak the text
  speechSynthesis.speak(utterance);
});

soundFrom.addEventListener("click", (): void => {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(translatingTextEl.value);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice
  utterance.lang = fromCountryCode.value;

  // Speak the text
  speechSynthesis.speak(utterance);
});
