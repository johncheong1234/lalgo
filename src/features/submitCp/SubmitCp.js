import React from 'react';

export function SubmitCp() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#1E333B',
            backgroundImage: 'url(https://assets.website-files.com/5837424ae11409586f837994/61195e21f792d7065d2f56ad_noise.png)',
            backgroundRepeat: 'repeat',
            color: 'white'
        }}
            className='submit-cp-wrapper'
        >
            <div style={{
                display: 'flex',
            }}
            className='submit-cp-header-container'
            >
                <span style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    fontFamily: 'Trench'
                }}>Submit CP Algorithm</span>
                <span style={{
                    fontFamily: 'Trench',
                    fontSize: '24px',
                    color: 'black',
                    backgroundColor: 'white',
                    lineHeight: '24px',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid black',
                }}>
                    Submit Test Case and Algorithm
                </span>
            </div>
        </div>
    )
}