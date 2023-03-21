import React from "react";


export function Navbar() {
    
    return (
        <div className='navbar'>
            <div className='navbar-item'>
                <a href='/'>Home</a>
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
        </div>
    )

}