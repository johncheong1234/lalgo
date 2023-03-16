import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { CustomAlgo } from './features/customAlgo/customAlgo/CustomAlgo';
import { SubmitAlgo } from './features/submitAlgo/submitAlgo/SubmitAlgo';
import './CustomAlgo.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

function App() {

  const handleLoginCallbackResponse = (response) => {
    console.log(response);
    console.log(response.credential)
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
  };

  useEffect(() => {

    /*global google*/
    google.accounts.id.initialize({
      client_id: "730704015839-bqolu76b7pilsg6pj895ntm2ntoutpju.apps.googleusercontent.com",
      callback: handleLoginCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("loginButton"),
      {
        theme: "filled_blue",
        size: "large",
        text: "long",
        type: "standard",
      }
    )
  }, []);

  return (
    <div>
      <h1>Learn Algos Fast Here</h1>
      <div id="loginButton"></div>
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
