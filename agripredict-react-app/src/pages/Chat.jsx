import { useState, useContext } from "react";
import { chatAPI } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";
import { startListening } from "../utils/voice"; // Import the voice utility

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const [isListening, setIsListening] = useState(false); // State for button status
  const { token } = useContext(AuthContext);

  async function send() {
    if (!token) return alert("Login required");
    if (!msg.trim()) return; // Prevent empty messages
    
    setReply("Thinking...");
    try {
      const res = await chatAPI(msg, token);
      setReply(res.answer);
    } catch (error) {
      setReply("Error fetching response.");
    }
  }

  // Function to handle voice input
  const handleVoice = () => {
    if (isListening) return;
    
    setIsListening(true);
  
    startListening(
      (text) => {
        setMsg(text);        // Update input box with spoken text
        setIsListening(false); // Reset button state
      },
      (error) => {
        console.error("Voice input failed:", error);
        setIsListening(false); // Reset button on error
      }
    );
  };

  return (
    <div className="page">
      <h2>AI Chat</h2>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input 
          value={msg} 
          onChange={(e) => setMsg(e.target.value)} 
          placeholder="Type or speak..."
          style={{ flex: 1, padding: "8px" }}
        />
        
        {/* Voice Button */}
        <button 
          onClick={handleVoice} 
          disabled={isListening}
          style={{ 
            backgroundColor: isListening ? "#ff4444" : "#4caf50", 
            color: "white",
            minWidth: "100px"
          }}
        >
          {isListening ? "Listening..." : "🎤 Voice"}
        </button>

        <button onClick={send} style={{ padding: "8px 16px" }}>Send</button>
      </div>

      <div className="card">
        <h3>AI Reply:</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>{reply}</pre>
      </div>
    </div>
  );
}