import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { CustomAlgo } from './features/customAlgo/customAlgo/CustomAlgo';
import { SubmitAlgo } from './features/submitAlgo/submitAlgo/SubmitAlgo';
import './CustomAlgo.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const handleLoginCallbackResponse = (response) => {
    console.log(response);

  };

  useEffect(() => {

    /*global google*/
    google.accounts.id.initialize({
      client_id: "730704015839-bqolu76b7pilsg6pj895ntm2ntoutpju.apps.googleusercontent.com",
      callback: handleLoginCallbackResponse
    });
  }, []);

  return (
    <div>
      <h1>Learn Algos Fast Here</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomAlgo />} />
          <Route path="/submit" element={<SubmitAlgo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
