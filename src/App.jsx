import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsCharacterId from "./pages/ComicsCharacterId";
import Favoris from "./pages/Favoris";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={<Characters search={search} setSearch={setSearch} />}
        />
        <Route
          path="/comics"
          element={<Comics search={search} setSearch={setSearch} />}
        />
        <Route path="/comics/:characterId" element={<ComicsCharacterId />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}

export default App;
