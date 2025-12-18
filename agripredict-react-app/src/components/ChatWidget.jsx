"use client"

import { useState, useContext } from "react"
import { chatAPI } from "../api/genaiApi"
import { AuthContext } from "../context/AuthContext"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! Ask me anything about farming." },
  ])
  const { token } = useContext(AuthContext)

  async function send() {
    if (!token) return alert("Please login to chat")
    if (!msg.trim()) return

    const userMessage = { role: "user", text: msg }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setMsg("")

    try {
      const res = await chatAPI(msg, token)
      setMessages([...updatedMessages, { role: "ai", text: res.answer }])
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "ai", text: "Error fetching response." },
      ])
    }
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
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
              color: "white",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "24px" }}>🌱</span>
              <div>
                <div style={{ fontWeight: "600", fontSize: "16px" }}>
                  AgriBot Assistant
                </div>
                <div style={{ fontSize: "12px", opacity: 0.9 }}>
                  Online • Ready to help
                </div>
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
                fontSize: "18px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
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
                  justifyContent:
                    m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)"
                        : "white",
                    color: m.role === "user" ? "white" : "#24292e",
                    padding: "12px 16px",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    maxWidth: "75%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "14px 16px",
              borderTop: "1px solid #e1e4e8",
              display: "flex",
              gap: "8px",
              background: "white",
              alignItems: "center",
            }}
          >
            {/* Text Input – takes maximum width */}
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your question..."
              style={{
                flex: 1,                 // 🔥 THIS makes it wide
                padding: "12px 14px",
                border: "2px solid #e1e4e8",
                borderRadius: "10px",
                fontSize: "14px",
                outline: "none",
                height:"30px"
              }}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />

            {/* Send Button – small & compact */}
            <button
              onClick={send}
              style={{
                width: "46px",            // 🔥 small width
                height: "40px",
                background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                color: "white",
                border: "none",
                borderRadius: "50%",      // round icon button
                cursor: "pointer",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,  
                          // 🔥 prevents shrinking
              }}
            >
              ➤
            </button>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "70px",
            height: "70px",
            paddingTop:"2px",
          
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
            color: "white",
            fontSize: "32px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(46, 125, 50, 0.4)",
          }}
        >
          💬
        </button>
      )}
    </div>
  )
}
