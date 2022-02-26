import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';


// function Xdd() {
//   return (
//     <div>
//       Sheeesh
//     </div>
//   )
// }
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* page not found */}
        <Route path="*" element={<Home />} />

        <Route path="/" element={<Home />} />
        {/* <Route path="/xd" element={<Xdd />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
