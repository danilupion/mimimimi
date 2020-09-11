export const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  }
};

const preferredVoices = {
  "es-ES": "Monica",
  "en-US": "Samantha",
};

export const read = (text, lang = "en-US") => {
  const synth = window.speechSynthesis;
  setTimeout(() => {
    const voices = synth.getVoices();
    let voice;
    if (preferredVoices[lang]) {
      voice = voices.filter(
        (v) => v.lang === lang && v.name === preferredVoices[lang]
      )[0];
    }
    if (!voice) {
      voice = voices.filter((v) => v.lang === lang)[0];
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.voice = voice;
    synth.speak(utterance);
  }, 100);
};
