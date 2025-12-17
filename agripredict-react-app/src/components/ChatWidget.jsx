"use client"

import { useState, useContext } from "react"
import { chatAPI } from "../api/genaiApi"
import { AuthContext } from "../context/AuthContext"
import { startListening } from "../utils/voice"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState([{ role: "ai", text: "Hi! Ask me anything about farming." }])
  const [isListening, setIsListening] = useState(false)
  const { token } = useContext(AuthContext)

  async function send() {
    if (!token) return alert("Please login to chat")
    if (!msg.trim()) return

    const newMessages = [...messages, { role: "user", text: msg }]
    setMessages(newMessages)
    setMsg("")

    const loadingMsg = { role: "ai", text: "..." }
    setMessages([...newMessages, loadingMsg])

    try {
      const res = await chatAPI(msg, token)
      setMessages([...newMessages, { role: "ai", text: res.answer }])
    } catch (error) {
      setMessages([...newMessages, { role: "ai", text: "Error fetching response." }])
    }
  }

  const handleVoice = () => {
    if (isListening) return
    setIsListening(true)
    startListening(
      (text) => {
        setMsg(text)
        setIsListening(false)
      },
      (error) => {
        console.error("Voice error", error)
        setIsListening(false)
      },
    )
  }

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="card"
          style={{
            width: "420px",
            height: "600px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            padding: 0,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
              color: "white",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "24px" }}>🌱</span>
              <div>
                <div style={{ fontWeight: "600", fontSize: "16px" }}>AgriBot Assistant</div>
                <div style={{ fontSize: "12px", opacity: 0.9 }}>Online • Ready to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
              onMouseOut={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#f8faf9",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  animation: "fadeIn 0.3s ease-in",
                }}
              >
                <div
                  style={{
                    background: m.role === "user" ? "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)" : "white",
                    color: m.role === "user" ? "white" : "#24292e",
                    padding: "12px 16px",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    margin: "4px 0",
                    maxWidth: "75%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    wordWrap: "break-word",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "16px 20px",
              borderTop: "1px solid #e1e4e8",
              display: "flex",
              gap: "10px",
              background: "white",
              alignItems: "center",
            }}
          >
            <button
              onClick={handleVoice}
              style={{
                background: isListening ? "#f44336" : "#ff9800",
                color: "white",
                padding: "10px 12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                minWidth: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              🎤
            </button>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your question..."
              style={{
                margin: 0,
                flex: 1,
                padding: "12px 16px",
                border: "2px solid #e1e4e8",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onKeyPress={(e) => e.key === "Enter" && send()}
              onFocus={(e) => (e.target.style.borderColor = "#2e7d32")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e4e8")}
            />
            <button
              onClick={send}
              style={{
                background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                color: "white",
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "18px",
                minWidth: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
            color: "white",
            fontSize: "32px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(46, 125, 50, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            animation: "pulse 2s infinite",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.1)"
            e.target.style.boxShadow = "0 8px 25px rgba(46, 125, 50, 0.5)"
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)"
            e.target.style.boxShadow = "0 6px 20px rgba(46, 125, 50, 0.4)"
          }}
        >
          💬
        </button>
      )}
    </div>
  )
}
