import { Routes, Route } from "react-router-dom";
import ModernHomePage from "./pages/Home.Modern";
import ModernAdminPanel from "./pages/Admin.Modern";
import SimpleNavbar from "./components/SimpleNavbar";
import Modern404Page from "./pages/404";
import "./styles/modern.css";

function App() {
  return (
    <div className="App">
      <SimpleNavbar />
      <Routes>
        <Route path="/" element={<ModernHomePage />} />
        <Route path="/admin" element={<ModernAdminPanel />} />
        <Route path="*" element={<Modern404Page />} />
      </Routes>
    </div>
  );
}

export default App;
