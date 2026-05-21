import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import Teams from "./pages/Teams";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;