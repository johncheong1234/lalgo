import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setTestCase,
    setCode,
    setQuestions,
    setQuestionIdSelected
} from './submitCpSlice';
import axios from 'axios';

export function SubmitCp() {
    const testCase = useSelector((state) => state.submitCp.testCase);
    const code = useSelector((state) => state.submitCp.code);
    const questions = useSelector((state) => state.submitCp.questions);
    const questionIdSelected = useSelector((state) => state.submitCp.questionIdSelected);
    const dispatch = useDispatch();

    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_questions";
        axios.post(url, {}).then(
            (response) => {
                console.log(response.data)
                dispatch(setQuestions({
                    questions: response.data
                }))
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }, []);

    function handleQuestionIdChange(e) {
        dispatch(setQuestionIdSelected({ questionIdSelected: e.target.value }));
    }

    function handleTestCaseChange(e) {
        dispatch(setTestCase({ testCase: e.target.value }));
    }

    function handleCodeChange(e) {
        dispatch(setCode({ code: e.target.value }));
    }

    function handleSubmitCp() {
        const importLines = []
        // split code into lines by line break
        const codeLines = code.split('\n').filter((line) => {
            // if line starts with import, add to importLines
            if (line.startsWith('import')) {
                importLines.push(line);
                return false;
            }
            
            // if line contains only spaces, return false
            if (line.trim().length === 0) {
                return false;
            }

            // if line is not empty, return true
            return true;
        });
        console.log(importLines, codeLines)

        const body = {
            testCase,
            codeLines,
            importLines
        }
        const url = 'http://localhost:5000/submit-cp';
        // const url = 'http://146.190.80.67:5000/submit-cp';
        axios.post(
            url,
            body
        ).then(
            (response) => {
                alert('success')
                console.log(response.data)
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

                const functionArguments = [{
                    input: testCase
                }]

                const postObj = {
                    code: code,
                    functionName: 'Nil',
                    arguments: functionArguments,
                    visualList: cleanedVisualList,
                    questionId: questionIdSelected
                }
                const newUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/create_visualize_code';
                axios.post(newUrl, postObj).then(
                    (response) => {
                        alert('success on saving to db');
                    }
                ).catch(
                    (error) => {
                        alert('error on saving to db');
                    }
                )

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
                Question Select:
                <select defaultValue={questionIdSelected} onChange={handleQuestionIdChange}>
                    <option value="">Choose here</option>
                    {
                        questions.map((question, index) => {
                            return (
                                <option key={index} value={question.questionId}>
                                    {question.questionName}
                                </option>
                            )
                        })
                    }
                </select>
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