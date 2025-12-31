import { useState } from 'react';
import { sendChatMessage } from '../services/api.js';
import { startListening, speak } from '../utils/voice.js';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input) return;
    setMessages((prev) => [...prev, { text: input, from: 'user' }]);
    try {
      const response = await sendChatMessage(input);
      setMessages((prev) => [...prev, { text: response.reply, from: 'bot' }]);
      speak(response.reply); // TTS
    } catch (error) {
      console.error(error);
    }
    setInput('');
  };

  const handleVoiceInput = () => {
    startListening((transcript) => {
      setInput(transcript);
      handleSend();
    });
  };

  return (
    <div className="container">
      <h1>AI Chatbot</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.from}>{msg.text}</p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <button onClick={handleVoiceInput}>Voice Input</button>
    </div>
  );
}

export default Chatbot;