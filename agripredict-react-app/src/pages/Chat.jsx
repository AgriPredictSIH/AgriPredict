<<<<<<< HEAD
import { useState, useContext } from "react";
import { chatAPI } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";
=======
// AgriPridict/agripredict-react-app/src/pages/Chat.jsx

import { useState } from "react";
import { chatAPI } from "../api/genaiApi";
import { startListening } from "../utils/voice"; 
>>>>>>> 5e0e603813c326d6aa6dd184a30b9c994d80748d

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
<<<<<<< HEAD
  const { token } = useContext(AuthContext);

  async function send() {
    if (!token) return alert("Login required");
    const res = await chatAPI(msg, token);
    setReply(res.answer);
=======
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
>>>>>>> 5e0e603813c326d6aa6dd184a30b9c994d80748d
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
<<<<<<< HEAD
      <h2>AI Chat</h2>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
      <pre>{reply}</pre>
=======
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
>>>>>>> 5e0e603813c326d6aa6dd184a30b9c994d80748d
    </div>
  );
}