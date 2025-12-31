export const startListening = (onTranscript) => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN'; // Or local languages
  recognition.onresult = (event) => {
    onTranscript(event.results[0][0].transcript);
  };
  recognition.start();
};

export const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  window.speechSynthesis.speak(utterance);
};