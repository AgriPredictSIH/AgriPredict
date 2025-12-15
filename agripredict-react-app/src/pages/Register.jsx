import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({});

  async function submit() {
    const res = await registerUser(form);
    alert(res.message || res.error);
  }

  return (
    <div className="page">
      <h2>Register</h2>
      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
