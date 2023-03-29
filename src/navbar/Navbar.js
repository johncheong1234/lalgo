import React from "react";
import {
    setUserObject
} from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Navbar() {

    const dispatch = useDispatch();
    const given_name = useSelector((state) => state.user.userObject.given_name);

    return (
        <div className='navbar'>
            <div className='navbar-item'>
                <a href='/'>Custom Algo</a>
            </div>
            <div className='navbar-item'>
                <a href='/create-set'>Create Set</a>
            </div>
            <div className='navbar-item'>
                <a href='/set'>Set Training</a>
            </div>
            <div className='navbar-item'>
                <a href='/submit'>Submit Algo</a>
            </div>
            <div className='navbar-item'>
                <a href='/questions'>Questions</a>
            </div>
            <div className='navbar-item'>
                <a href='/choose-line-game'>Choose Line Game</a>
            </div>
        </div>
    )

}