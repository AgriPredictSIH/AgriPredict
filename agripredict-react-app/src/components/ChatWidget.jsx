"use client"

import { useState, useContext, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown" // <--- IMPORT THIS
import { chatAPI } from "../api/genaiApi"
import { AuthContext } from "../context/AuthContext"
import { startListening } from "../utils/voice"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AgriAssistant. How can I help you today?" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useContext(AuthContext)
  const messagesEndRef = useRef(null)

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // --- Voice Logic ---
  const handleVoiceInput = () => {
    if (isListening) return

    setIsListening(true)
    startListening(
      (text) => {
        setMsg((prev) => (prev ? prev + " " + text : text))
        setIsListening(false)
      },
      () => {
        setIsListening(false)
      }
    )
  }

  // --- Send Logic ---
  async function send() {
    if (!token) return alert("Please login to use the assistant.")
    if (!msg.trim()) return

    const userText = msg.trim()
    setMsg("")
    
    setMessages((prev) => [...prev, { role: "user", text: userText }])
    setIsLoading(true)

    try {
      const res = await chatAPI(userText, token)
      setMessages((prev) => [...prev, { role: "ai", text: res.answer }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "I'm having trouble connecting. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // --- Professional Styles ---
  const styles = {
    wrapper: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      zIndex: 9999,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    toggleBtn: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
      color: "white",
      border: "none",
      boxShadow: "0 4px 20px rgba(46, 125, 50, 0.4)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      transition: "transform 0.2s ease",
    },
    chatWindow: {
      width: "380px",
      height: "600px",
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      marginBottom: "20px",
      border: "1px solid #f0f0f0",
      animation: "slideUp 0.3s ease-out",
    },
    header: {
      padding: "20px",
      background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontWeight: "600",
      fontSize: "18px",
      marginBottom: "2px",
    },
    headerStatus: {
      fontSize: "12px",
      opacity: 0.9,
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    onlineDot: {
      width: "8px",
      height: "8px",
      background: "#4caf50",
      borderRadius: "50%",
      boxShadow: "0 0 0 2px rgba(255,255,255,0.2)",
    },
    closeBtn: {
      background: "rgba(255,255,255,0.2)",
      border: "none",
      color: "white",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    messagesArea: {
      flex: 1,
      padding: "20px",
      background: "#f5f7fa",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    bubble: (isUser) => ({
      maxWidth: "80%",
      padding: "12px 16px",
      borderRadius: "16px",
      fontSize: "14px",
      lineHeight: "1.5",
      color: isUser ? "#fff" : "#1a1a1a",
      background: isUser ? "linear-gradient(135deg, #43a047 0%, #2e7d32 100%)" : "#fff",
      alignSelf: isUser ? "flex-end" : "flex-start",
      boxShadow: isUser ? "0 4px 12px rgba(46, 125, 50, 0.2)" : "0 2px 8px rgba(0,0,0,0.05)",
      borderBottomRightRadius: isUser ? "4px" : "16px",
      borderBottomLeftRadius: isUser ? "16px" : "4px",
    }),
    // New style to make markdown content look cleaner inside bubbles
    markdownContent: {
      margin: 0,
      padding: 0,
      '& p': { margin: 0 }, 
      '& ul': { margin: '0 0 0 20px', padding: 0 }
    },
    footer: {
      padding: "16px",
      background: "#fff",
      borderTop: "1px solid #eee",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      background: "#f8f9fa",
      border: "1px solid #e1e4e8",
      borderRadius: "24px",
      padding: "4px 8px 4px 16px",
      gap: "8px",
      transition: "border-color 0.2s",
    },
    input: {
      flex: 1,
      border: "none",
      background: "transparent",
      padding: "10px 0",
      fontSize: "14px",
      outline: "none",
      color: "#333",
    },
    micBtn: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      border: "none",
      background: isListening ? "#ffebee" : "transparent",
      color: isListening ? "#d32f2f" : "#555",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
    sendBtn: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "none",
      background: msg.trim() ? "#2e7d32" : "#e0e0e0",
      color: "white",
      cursor: msg.trim() ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
    typing: {
      fontSize: "12px",
      color: "#666",
      marginLeft: "16px",
      marginBottom: "8px",
      fontStyle: "italic",
    }
  }

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseRed { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
        /* Helper to reset default markdown margins */
        .markdown-body p { margin: 0 0 8px 0; }
        .markdown-body p:last-child { margin: 0; }
        .markdown-body ul, .markdown-body ol { margin: 4px 0 4px 20px; padding: 0; }
      `}</style>

      {isOpen ? (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
               <img src="/rsz_agripredict_logo.png" alt="" style={{height: "28px"}} />
               <div>
                  <div style={styles.headerTitle}>AgriBot</div>
                  <div style={styles.headerStatus}>
                    <span style={styles.onlineDot}></span> Online
                  </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
          </div>

          <div style={styles.messagesArea}>
            {messages.map((m, i) => (
              <div key={i} style={styles.bubble(m.role === "user")}>
                {/* --- CHANGED HERE: Wrap text in ReactMarkdown --- */}
                <div className="markdown-body">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && <div style={styles.typing}>AgriBot is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.footer}>
            <div style={styles.inputContainer}>
              <input
                style={styles.input}
                placeholder="Type or use voice..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button 
                onClick={handleVoiceInput}
                style={{
                  ...styles.micBtn,
                  animation: isListening ? "pulseRed 1.5s infinite" : "none"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>

              {/* Send Button */}
              <button onClick={send} style={styles.sendBtn} disabled={!msg.trim()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} style={styles.toggleBtn}>
          💬
        </button>
      )}
    </div>
  )
}