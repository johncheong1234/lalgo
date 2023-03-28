import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { CustomAlgo } from './features/customAlgo/customAlgo/CustomAlgo';
import { SubmitAlgo } from './features/submitAlgo/submitAlgo/SubmitAlgo';
import { VisualizeCode } from './features/visualizeCode/VisualizeCode';
import { Set } from './features/set/Set';
import { CreateSet } from './features/createSet/CreateSet';
import { CreateQuestion } from './features/createQuestion/CreateQuestion';
import { Questions } from './features/questions/Questions';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  setUserObject
} from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import axios from 'axios';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './navbar/Navbar';

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
      <div className='row'>
        <div style={{
          width: '50%',
        }}>
          <h1>Learn Algos Fast Here</h1>
        </div>
        <div style={{
          width: '50%',
        }}>
          <Navbar />
        </div>
      </div>
      {given_name ? <h2>Welcome {given_name}</h2> :
        <div style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <div id="loginButton"
            style={{
              width: '240px'
            }}>
          </div>
          <div>
            <p style={{
              marginTop: '8px'
            }}>
              Sign in to enable records of your attempts to be saved.
            </p>
          </div>
        </div>}
      {given_name ? <div className='sign-out' onClick={handleSignOut}>Sign out</div> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomAlgo />} />
          <Route path="/submit" element={<SubmitAlgo />} />
          <Route path="/set" element={<Set />} />
          <Route path='/create-set' element={<CreateSet />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/visualize-code' element={<VisualizeCode />} />
          <Route path='/create-question' element={<CreateQuestion />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
