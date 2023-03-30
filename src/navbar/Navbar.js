import React, { useEffect } from "react";
import {
    setUserObject
} from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AlgoLearnLogo from '../assets/AlgoLearnLogo.svg';

export function Navbar() {

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

    function handleLogoClick(e) {
        e.preventDefault();
        window.location.href = '/';
    }

    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <div className="navbar-left">
                    <div className="logo-container" onClick={handleLogoClick} style={{
                        cursor: 'pointer'
                    }}>
                        <img src={AlgoLearnLogo} alt="AlgoLearn Logo" />
                    </div>
                </div>
                <div className="navbar-right">
                    <div className='navbar-item'>
                        <a href='/choose-line-game'>Choose Line Game</a>
                    </div>
                    <div className='navbar-item'>
                        <a href='/questions'>Questions</a>
                    </div>
                    <div className='navbar-item'>
                        <a href='/custom-algo'>Algo Training</a>
                    </div>
                    {/* <div className='navbar-item'>
                <a href='/create-set'>Create Set</a>
            </div> */}
                    <div className='navbar-item'>
                        <a href='/set'>Set Training</a>
                    </div>
                    <div className='navbar-item'>
                        <a href='/submit'>Submit Algo</a>
                    </div>
                </div>
                <div className="navbar-login-wrapper">
                    {given_name ?

                        <div className='navbar-item' onClick={handleSignOut}>
                            Sign out
                        </div> :

                        <div id="loginButton"
                        // style={{
                        //     width: '240px'
                        // }}
                        >
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}