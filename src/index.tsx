import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import About from "./About";

import "./tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <nav className="bg-blue-600 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <Link to="/about" className="hover:underline">
        Sobre
      </Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);
