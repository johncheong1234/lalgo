import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSetSelected,
    setSetData,
    setsetDataObjects,
    setTrainingStarted,
    setCurrentQuestionData,
    setTypedAlgoOutput,
    setAlgoLineState,
    setAlgoLine,
    setCompletedAlgoKeys,
    setCompletionIndex
} from './setSlice';
import axios from 'axios';
import { AlgoCard } from './algoCard/AlgoCard';
import '../../../src/Set.css';

export function Set() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.userObject.email);
    const setDataObjects = useSelector(state => state.set.setDataObjects);
    const setSelected = useSelector(state => state.set.setSelected);
    const trainingStarted = useSelector(state => state.set.trainingStarted);
    const setData = useSelector(state => state.set.setData);
    const currentQuestionData = useSelector(state => state.set.currentQuestionData);
    const algoLine = useSelector(state => state.set.algoLine);
    const algoLineState = useSelector(state => state.set.algoLineState);
    const typedAlgoOutput = useSelector(state => state.set.typedAlgoOutput);
    const completedAlgoKeys = useSelector(state => state.set.completedAlgoKeys);
    const completionIndex = useSelector(state => state.set.completionIndex);

    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_sets";

        axios.post(url, {
            'user.email': email
        }
        ).then((response) => {
            console.log(response.data);
            const setDataObjects = []
            response.data.forEach((set) => {
                setDataObjects.push({
                    setName: set.setName,
                    setId: set.setId,
                    setQuestions: set.setQuestions
                })
            })
            dispatch(setsetDataObjects({
                setDataObjects
            }))
        });

    }, [])

    useEffect(() => {

        if (setSelected !== 'default') {
            const selectedSet = setDataObjects.find((set) => {
                return set.setId === setSelected;
            })

            const setData = {
                setName: selectedSet.setName,
                setQuestions: selectedSet.setQuestions
            }

            dispatch(setSetData({
                setData
            }))
        }

    }, [setSelected])

    function handleSelectSet(e) {
        dispatch(setSetSelected({
            setSelected: e.target.value
        }));
    }

    function handleStartTraining(e) {
        dispatch(setTrainingStarted({
            trainingStarted: true
        }))

        editCurrentQuestionData(setData.setQuestions[0].algoKey);
    }

    function editCurrentQuestionData(algoKey) {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_question";

        axios.post(url, {
            'algo.algoKey': algoKey
        }).then((response) => {
            console.log(response.data);
            const algoName = response.data[0].algo.algoName;
            const algoCode = response.data[0].algo.algoCode;
            const algoKey = response.data[0].algo.algoKey;
            dispatch(setCurrentQuestionData({
                currentQuestionData: {
                    algoName,
                    algoCode,
                    algoKey
                }
            }))
        })
    }

    function handleCodeInputChange(e) {
        let codeInputChangeAllowed = false;
        if (e.nativeEvent.inputType === 'deleteContentBackward') {
            codeInputChangeAllowed = true;
        } else if (algoLineState !== 'incorrect' && e.nativeEvent.inputType !== 'deleteContentBackward') {
            codeInputChangeAllowed = true;
        }
        if (codeInputChangeAllowed) {
            const algoCode = currentQuestionData.algoCode;
            const comparisonCodeUnclean = algoCode[typedAlgoOutput.length];
            const comparisonCode = comparisonCodeUnclean.replace(/\s/g, '');
            const codeInputVal = e.target.value.replace(/\s/g, '');
            dispatch(setAlgoLine({
                algoLine: e.target.value
            }))
            if (comparisonCode.substring(0, codeInputVal.length) === codeInputVal && codeInputVal !== comparisonCode) {
                dispatch(setAlgoLineState({ algoLineState: 'semi' }))
            } else if (comparisonCode === codeInputVal) {
                dispatch(setAlgoLineState({ algoLineState: 'correct' }))
            } else {
                dispatch(setAlgoLineState({ algoLineState: 'incorrect' }))
            }
        }
    }

    function handleCodeInputKeyDown(e) {
        if (e.key === 'Enter') {
            if (algoLineState === 'correct') {
                dispatch(setTypedAlgoOutput({
                    typedAlgoOutput: [
                        ...typedAlgoOutput,
                        algoLine
                    ]
                }))
                if (typedAlgoOutput.length === currentQuestionData.algoCode.length - 1) {
                    dispatch(setTypedAlgoOutput({
                        typedAlgoOutput: []
                    }))

                    dispatch(setCompletedAlgoKeys({
                        completedAlgoKeys: [...completedAlgoKeys, currentQuestionData.algoKey]
                    }))

                    if (completionIndex === setData.setQuestions.length - 1) {
                        dispatch(setTrainingStarted({
                            trainingStarted: false
                        }))
                        dispatch(setSetSelected({
                            setSelected: 'default'
                        }))
                        dispatch(setSetData({
                            setData: {}
                        }))
                        dispatch(setCurrentQuestionData({
                            currentQuestionData: {}
                        }))
                        dispatch(setAlgoLine({
                            algoLine: ''
                        }))
                        dispatch(setAlgoLineState({
                            algoLineState: 'semi'
                        }))
                        dispatch(setTypedAlgoOutput({
                            typedAlgoOutput: []
                        }))
                        dispatch(setCompletedAlgoKeys({
                            completedAlgoKeys: []
                        }))
                        dispatch(setCompletionIndex({
                            completionIndex: 0
                        }))
                        alert('Training Completed!')
                        return;
                    }

                    dispatch(setCompletionIndex({
                        completionIndex: completionIndex + 1
                    }))

                    const newAlgoKey = setData.setQuestions[completionIndex + 1].algoKey;

                    editCurrentQuestionData(newAlgoKey);
                }
                dispatch(setAlgoLine({
                    algoLine: ''
                }))
                dispatch(setAlgoLineState({
                    algoLineState: 'semi'
                }))

            }
        }
    }

    return (
        (email !== undefined) ?
            <div className='row'>
                <div style={{
                    width: '70%',
                }}>
                    <h2>Set Training</h2>
                    {(!trainingStarted) && <>
                        <select onChange={handleSelectSet} value={setSelected}>
                            <option disabled value='default'>Select your set</option>
                            {
                                setDataObjects.map((setNameObject, index) => {
                                    return (
                                        <option value={setNameObject.setId} key={index}>{setNameObject.setName}</option>
                                    )
                                }
                                )
                            }
                        </select>

                        {setSelected !== 'default' && <div className='button-div' onClick={handleStartTraining}>
                            Start Training
                        </div>}
                    </>}
                    {trainingStarted && <div>
                        <div>
                            {
                                typedAlgoOutput.map((line, index) => {
                                    return (
                                        <div key={index}>
                                            {line}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <input type='text' placeholder='Enter your answer here' style={{
                            width: '100%',
                        }}

                            value={algoLine}

                            onChange={handleCodeInputChange}

                            onKeyDown={handleCodeInputKeyDown}

                            className={`code-input-${algoLineState}`}
                        ></input>
                        <div className='answer-display'>
                            {currentQuestionData.algoCode ?
                                currentQuestionData.algoCode.map((line, index) => {
                                    return (
                                        <div key={index}>
                                            {line}
                                        </div>
                                    )
                                }) : <div></div>
                            }

                        </div>
                    </div>}
                </div>
                {
                    trainingStarted &&
                    <div style={{
                        width: '30%',
                    }}>
                        <h3>Progress</h3>
                        {
                            setData.setQuestions.map((algo, index) => {
                                return (
                                    <AlgoCard key={index} algo={algo} completionIndex={completionIndex} index={index} />
                                )
                            })
                        }
                    </div>
                }
            </div> : <div>
                <h1>Please login to access this page</h1>
            </div>
    )
}