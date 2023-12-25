// prettier-ignore
const selectCountries = document.querySelectorAll("select") as NodeListOf<HTMLSelectElement>;
const btn = document.querySelector(".btn") as HTMLButtonElement;
// prettier-ignore
const translatingTextEl = document.querySelector(".from") as HTMLTextAreaElement;
// prettier-ignore
const transladetTextEl= document.querySelector(".to") as HTMLTextAreaElement;
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

const renderCountries = (): void => {
  for (const [key, value] of Object.entries(countries)) {
    selectCountries.forEach(
      (el) => (el.innerHTML += `<option value="${key}">${value}</option>`)
    );
  }
};
renderCountries();

const getData = function (): void {
  try {
    // prettier-ignore
    const fromCountryCode: string = (document.querySelector(".from-country") as HTMLSelectElement).value
    //  prettier-ignore
    const toCountryCode: string = (document.querySelector(".to-country") as HTMLSelectElement).value
    const fromText: string = translatingTextEl.value;

    fetch(
      `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromCountryCode}|${toCountryCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        transladetTextEl.value = data.responseData.translatedText;
      })
      .catch((err): void => {
        console.error(err);
      });
  } catch {}
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

btn.addEventListener("click", getData);
