import React from 'react';
// import logo from './logo.svg';
import { CustomAlgo } from './features/customAlgo/customAlgo/CustomAlgo';
import { SubmitAlgo } from './features/submitAlgo/submitAlgo/SubmitAlgo';
import './CustomAlgo.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomAlgo />} />
        <Route path="/submit" element={<SubmitAlgo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
