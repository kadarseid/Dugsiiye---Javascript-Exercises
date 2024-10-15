const translateForm = document.getElementById("translateForm");
const selectTag = document.querySelectorAll("select");
const fromLanguage = document.getElementById("from");
const toLanguage = document.getElementById("to");
const textToTranslate = document.getElementById("text-from");
const translatedText = document.getElementById("text-to");

document.addEventListener("DOMContentLoaded", displayLanguages);

async function displayLanguages() {
  const url = "https://microsoft-translator-text-api3.p.rapidapi.com/languages";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fc8e7eb141mshc25be83817b0ac9p1b205bjsn4ac4c5cc5e54",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const entries = Object.entries(data.translation);

    for (const [key, value] of entries) {
      selectTag.forEach((tag) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value.name;
        tag.insertAdjacentElement("beforeend", option);
      });
    }
  } catch (error) {
    console.error("language fetching error", error);
  }
}

async function translateText() {
  const tranFrom = fromLanguage.value;
  const tranTo = toLanguage.value;
  const textToTran = textToTranslate.value;

  const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${tranTo}&from=${tranFrom}&textType=plain`;

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "fc8e7eb141mshc25be83817b0ac9p1b205bjsn4ac4c5cc5e54",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        text: `${textToTran}`,
      },
    ]),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    console.log(result[0].translations);
    console.log(result[0].translations[0]);
    const tranText = result[0].translations[0].text;
    translatedText.textContent = tranText;
  } catch (error) {
    console.error("Translating error", error);
  }
}

translateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  translateText();
});
