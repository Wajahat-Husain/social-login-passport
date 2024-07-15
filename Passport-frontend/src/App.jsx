import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage.jsx";
import UserPage from "./components/UserPage.jsx";
import "./App.css";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
  );
}

export default App;
