import { useState, useContext } from "react";
import { chatAPI } from "../api/genaiApi";
import { AuthContext } from "../context/AuthContext";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");
  const { token } = useContext(AuthContext);

  async function send() {
    if (!token) return alert("Login required");
    const res = await chatAPI(msg, token);
    setReply(res.answer);
  }

  return (
    <div className="page">
      <h2>AI Chat</h2>
      <input value={msg} onChange={e => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
      <pre>{reply}</pre>
    </div>
  );
}