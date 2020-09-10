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
  "https://gifcept.com/8GI71fI.gif"
];

const random = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.background = "url(1.jpg) no-repeat";
  const input = document.getElementById("input");
  const canvas = document.getElementById("canvas");
  const defualtText = "Pliisi intir thi tixt yii wint ti trinsfirm";
  canvas.innerHTML = defualtText;
  document.body.style.background = `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${gifs[random(0, gifs.length - 1)]})`;

  input.addEventListener("keyup", () => {
    const text = input.value.trim();
    if (text === "") {
      canvas.innerHTML = defualtText;
    } else {
      canvas.innerHTML = text
        .replace(/[aeou]/g, "i")
        .replace(/AEOU/g, "I")
        .replace(/áéóú/g, "í")
        .replace(/ÁÉÓÚ/g, "Í");
    }
  });
});
