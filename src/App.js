import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { CustomAlgo } from './features/customAlgo/customAlgo/CustomAlgo';
import { SubmitAlgo } from './features/submitAlgo/submitAlgo/SubmitAlgo';
import './CustomAlgo.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  setUserObject
} from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import axios from 'axios';
import { Analytics } from '@vercel/analytics/react';

function App() {

  const dispatch = useDispatch();
  const given_name = useSelector((state) => state.user.userObject.given_name);

  const handleLoginCallbackResponse = (response) => {
    console.log(response);
    console.log(response.credential)
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    dispatch(setUserObject({ userObject: userObject }));
    // save userObject to local storage
    window.localStorage.setItem('userObject', JSON.stringify(userObject));
    const postUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/upsert_user';
    axios.post(postUrl, {
      email: userObject.email,
      name: userObject.name
    })
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
  }, [given_name]);

  useEffect(() => {

    // get userObject from local storage
    var userObject = JSON.parse(window.localStorage.getItem('userObject'));
    if (userObject) {
      dispatch(setUserObject({ userObject: userObject }));
    }

  }, [])

  function handleSignOut(e) {
    e.preventDefault();
    dispatch(setUserObject({ userObject: {} }));
    window.localStorage.removeItem('userObject');
  }

  return (
    <div>
      <Analytics />
      <h1>Learn Algos Fast Here</h1>
      {given_name ? <h2>Welcome {given_name}</h2> : <div id="loginButton" style={{
        width: '240px'
      }}></div>}
      {given_name ? <div className='sign-out' onClick={handleSignOut}>Sign out</div> : null}
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
