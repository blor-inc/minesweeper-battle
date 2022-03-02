import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';
import Placeholder from './components/Placeholder/Placeholder';
import Board from './components/Board/Board';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* page not found */}
        <Route path="*" element={<Home />} />

        <Route path="/" element={<Home />} />
        <Route path="/Placeholder" element={<Placeholder/>} />
        <Route path="/coop/:id" element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
