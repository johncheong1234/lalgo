import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setTestCase,
    setCode
} from './submitCpSlice';
import axios from 'axios';

export function SubmitCp() {
    const testCase = useSelector((state) => state.submitCp.testCase);
    const code = useSelector((state) => state.submitCp.code);
    const dispatch = useDispatch();

    function handleTestCaseChange(e) {
        dispatch(setTestCase({ testCase: e.target.value }));
    }

    function handleCodeChange(e) {
        dispatch(setCode({ code: e.target.value }));
    }

    function handleSubmitCp() {
        const body = {
            testCase,
            code
        }
        const url = 'http://localhost:5000/submit-cp';
        axios.post(
            url,
            body
        ).then(
            (response) => {
                alert('success')
                const cleanedVisualList = [];
                for (let i = 0; i < response.data.visualList.length; i++) {
                    if (response.data.visualList[i].event !== 'opcode') {

                        const visualObject = response.data.visualList[i]

                        // implement try catch
                        try {
                            const parsedLocalObjects = JSON.parse(visualObject.localObjects);
                            visualObject.localObjects = parsedLocalObjects;
                        } catch (error) {
                            console.log(error, visualObject.localObjects)
                        }
                        cleanedVisualList.push(visualObject);
                    }
                }
                console.log(cleanedVisualList)
            }
        ).catch(
            (error) => {
                alert('error')
            }
        )
    }

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
                    cursor: 'pointer'
                }}
                    onClick={handleSubmitCp}
                >
                    Submit
                </span>
            </div>
            <div className='submit-cp-body-container'>
                <span style={{
                    fontSize: '24px',
                    fontFamily: 'Trench'
                }}>
                    Test Case
                </span>
                <textarea style={{
                    backgroundColor: '#1E333B',
                    height: '100px',
                    border: '1px solid white',
                    borderRadius: '5px',
                    fontFamily: 'Trench',
                    fontSize: '18px',
                    color: 'white',
                    padding: '10px',
                }}
                    value={testCase}
                    onChange={handleTestCaseChange}
                />
                <span style={{
                    fontSize: '24px',
                    fontFamily: 'Trench'
                }}>
                    Algorithm
                </span>
                <textarea style={{
                    backgroundColor: '#1E333B',
                    height: '250px',
                    border: '1px solid white',
                    borderRadius: '5px',
                    fontFamily: 'Trench',
                    fontSize: '18px',
                    color: 'white',
                    padding: '10px',
                }}
                    value={code}
                    onChange={handleCodeChange}
                />
            </div>
        </div>
    )
}