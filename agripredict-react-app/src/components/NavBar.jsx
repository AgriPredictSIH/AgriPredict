import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/crop">Crop</Link>
      <Link to="/crop-history">Crop History</Link>

      <Link to="/disease">Disease</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}
