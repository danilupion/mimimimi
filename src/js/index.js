import { copyToClipboard, read } from "./utils";

const gifs = [
  "https://gifcept.com/7mcIHhU8N.gif",
  "https://gifcept.com/bn2Wubk82.gif",
  "https://gifcept.com/s1kkAIB2E.gif",
  "https://gifcept.com/PTnVCKW6P.gif",
  "https://gifcept.com/mWoU7mFLU.gif",
  "https://gifcept.com/9lEQB5TVh.gif",
  "https://gifcept.com/cxSjcDs.gif",
  "https://gifcept.com/UlfnaN2.gif",
  "https://gifcept.com/2qYUDPO.gif",
  "https://gifcept.com/8GI71fI.gif",
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const uiContainer = document.getElementById("ui-container");
  const canvas = document.getElementById("transformed-text");
  const readButton = document.getElementById("read-button");
  const readButtonBig = document.getElementById("read-button-big");
  const copyLinkButton = document.getElementById("copy-link-button");
  const copyTextButton = document.getElementById("copy-text-button");
  const languageSelect = document.getElementById("language-selector");
  const defaultText = "Pliisi intir thi tixt yii wint ti trinsfirm";

  const url = new URL(window.location.href);

  const queryLanguage = url.searchParams.get("l");
  const queryText = url.searchParams.get("t");

  const getTixt = (text) =>
    text
      .replace(/[aeou]/g, "i")
      .replace(/[AEOU]/g, "I")
      .replace(/[áéóú]/g, "í")
      .replace(/[ÁÉÓÚ]/g, "Í");

  const getSelectedLanguage = () => languageSelect.value;
  const getUserInput = () => userInput.value;

  if (queryLanguage) {
    languageSelect.value = queryLanguage;
  }
  if (queryText) {
    userInput.value = queryText;
    uiContainer.style.display = "none";
    try {
      read(getTixt(getUserInput()), getSelectedLanguage());
    } catch (e) {}
  } else {
    readButtonBig.style.display = "none";
  }

  document.body.style.background = `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${
    gifs[random(0, gifs.length - 1)]
  })`;
  userInput.focus();

  const handler = (text) => {
    if (text === "") {
      canvas.innerHTML = defaultText;
      readButton.setAttribute("disabled", true);
      copyLinkButton.setAttribute("disabled", true);
    } else {
      readButton.removeAttribute("disabled");
      copyLinkButton.removeAttribute("disabled");

      canvas.innerHTML = getTixt(text);
    }
  };

  handler(getUserInput());

  userInput.addEventListener("keyup", (e) => {
    handler(getUserInput());
  });
  userInput.addEventListener("paste", (e) => {
    if (e.clipboardData) {
      handler(e.clipboardData.getData("text/plain"));
    } else {
      setTimeout(() => {
        handler(getUserInput());
      }, 100);
    }
  });
  readButton.addEventListener("click", () => {
    read(getTixt(getUserInput()), getSelectedLanguage());
  });
  readButtonBig.addEventListener("click", () => {
    read(getTixt(getUserInput()), getSelectedLanguage());
  });
  copyLinkButton.addEventListener("click", () => {
    const url = new URL(window.location.origin);
    url.searchParams.set("t", getUserInput());
    url.searchParams.set("l", getSelectedLanguage());

    copyToClipboard(url.toString());
  });
  copyTextButton.addEventListener("click", () => {
    copyToClipboard(getTixt(getUserInput()));
  });
});
