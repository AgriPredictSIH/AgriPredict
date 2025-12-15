import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Crop from "./pages/Crop";
import Disease from "./pages/Disease";
import Home from "./pages/Home"
import CropHistory from "./pages/CropHistory";
export default function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crop-history" element={<CropHistory />} />

          <Route path="/crop" element={<Crop />} />
          <Route path="/disease" element={<Disease />} />
        </Routes>
      </BrowserRouter>
    
  );
}
