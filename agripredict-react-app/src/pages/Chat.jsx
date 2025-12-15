// AgriPridict/agripredict-react-app/src/pages/Chat.jsx

import { useState } from "react";
import { chatAPI } from "../api/genaiApi";
import { startListening } from "../utils/voice"; 

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [isListening, setIsListening] = useState(false);

  async function send() {
    if (!msg) return;
    setReply("Thinking...");
    try {
      const res = await chatAPI(msg);
      setReply(res.answer);
    } catch (error) {
      setReply("Error fetching response.");
    }
  }

  const handleVoice = () => {
    if (isListening) return; // Prevent double clicks
    setIsListening(true);
    
    startListening(
      (text) => {
        setMsg(text); // Success: Update text
        setIsListening(false); // Reset button
      },
      () => {
        setIsListening(false); // Error/End: Reset button
      }
    );
  };

  return (
    <div className="page">
      <h2>AI Chatbot</h2>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          placeholder="Ask a farming question..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ flex: 1 }}
        />
        
        <button 
          onClick={handleVoice} 
          disabled={isListening}
          style={{ 
            backgroundColor: isListening ? "#ff4444" : "#4caf50",
            minWidth: "100px" 
          }}
        >
          {isListening ? "👂 Listening..." : "🎤 Voice"}
        </button>

        <button onClick={send}>Send</button>
      </div>

      <div className="card">
        <h3>AI Reply:</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{reply}</pre>
      </div>
    </div>
  );
}