import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSetSelected,
    setSetData,
    setSetNames,
    setTrainingStarted,
    setCurrentQuestionData,
    setTypedAlgoOutput,
    setAlgoLineState,
    setAlgoLine
} from './setSlice';
import axios from 'axios';

export function Set() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.userObject.email);
    const setNames = useSelector(state => state.set.setNames);
    const setSelected = useSelector(state => state.set.setSelected);
    const trainingStarted = useSelector(state => state.set.trainingStarted);
    const setData = useSelector(state => state.set.setData);
    const currentQuestionData = useSelector(state => state.set.currentQuestionData);
    const algoLine = useSelector(state => state.set.algoLine);
    const algoLineState = useSelector(state => state.set.algoLineState);
    const typedAlgoOutput = useSelector(state => state.set.typedAlgoOutput);

    useEffect(() => {
        // const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_all_algos";

        // const presetAlgos = axios.get(url, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // });

        // let objectToDispatch = {};


        // presetAlgos.then((response) => {
        //     for (let i = 0; i < response.data.length; i++) {
        //         objectToDispatch[response.data[i].algo.algoKey] = { algoCode: response.data[i].algo.algoCode, algoName: response.data[i].algo.algoName }
        //     }

        //     dispatch(setPresetAlgos({ presetAlgos: objectToDispatch }));
        // });

        dispatch(setSetNames({
            setNames: ['set1', 'set2']
        }));

    }, [])

    useEffect(() => {

        if (setSelected !== 'default') {
            const setData = {
                setName: setSelected,
                setQuestions: [
                    {
                        algoKey: 'test2',
                        repeats: 2,
                    },
                    { algoKey: 'mergeSort', repeats: 2 },
                ]
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

        console.log(setData.setQuestions[0].algoKey)
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_question";

        axios.post(url, {
            'algo.algoKey': setData.setQuestions[0].algoKey
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
            <div>
                <h2>Set Training</h2>
                {(!trainingStarted) && <>
                    <select onChange={handleSelectSet} value={setSelected}>
                        <option disabled value='default'>Select your set</option>
                        {
                            setNames.map((algoName, index) => {
                                return (
                                    <option value={algoName} key={index}>{algoName}</option>
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

            </div> : <div>
                <h1>Please login to access this page</h1>
            </div>
    )
}