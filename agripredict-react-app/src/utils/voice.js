// AgriPridict/agripredict-react-app/src/utils/voice.js

export const startListening = (onTranscript, onError) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice input is not supported in this browser. Please use Google Chrome or Edge.");
    if (onError) onError();
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN'; // Sets language to Indian English
  recognition.interimResults = false; // Only final results
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    console.log("Voice recognition started...");
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    onTranscript(text);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    // This ensures the button always resets, even if no speech was detected
    if (onError) onError(); 
  };

  try {
    recognition.start();
  } catch (e) {
    console.error("Recognition start failed", e);
    if (onError) onError();
  }
};

export const speak = (text) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  window.speechSynthesis.speak(utterance);
};