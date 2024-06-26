import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setCustomAlgoInput,
    setAlgoLineState,
    setCodeInput,
    addCodeInputToTypedAlgoOutput,
    setTypedAlgoOutput,
    setCodeSubmitted,
    setRepeatsInitial,
    setRepeatOn,
    setRepeatsLeft,
    setAlgoSelected,
    setReadCode,
    setPresetAlgos,
    setShowAnswer,
    setVoiceEnabled,
    setConceptErrorCount,
    setCarelessErrorCount,
    setMistakeModalDisplay,
    setStartTime,
    setTimeElapsed,
    addShowAnswerTime,
    emptyTimedShowAnswers,
    setShowTimer,
    setTimeInAnswerShown,
    setTimeInAnswerNotShown,
    setPastRecordsRender,
} from '../customAlgoSlice';
import axios from 'axios';
import { PastRecordsParent } from './pastRecordsParent/PastRecordsParent';
import {
    setPastRecords
} from './pastRecordsParent/pastRecordsSlice';
import '../../../CustomAlgo.css';

export function CustomAlgo() {

    const customAlgoObject = useSelector((state) => state.customAlgo);
    const customAlgoInput = customAlgoObject.customAlgoInput;
    const typedAlgoOutput = customAlgoObject.typedAlgoOutput;
    const algoLineState = customAlgoObject.algoLineState;
    const codeInput = customAlgoObject.codeInput;
    const presetAlgos = customAlgoObject.presetAlgos;
    const codeSubmitted = customAlgoObject.codeSubmitted;
    const repeatObject = customAlgoObject.repeatObject;
    const algoSelected = customAlgoObject.algoSelected;
    const readCode = customAlgoObject.readCode;
    const showAnswer = customAlgoObject.showAnswer;
    const voiceEnabled = customAlgoObject.voiceEnabled;
    const mistakeModalDisplay = customAlgoObject.mistakeModalDisplay;
    const conceptErrorCount = customAlgoObject.conceptErrorCount;
    const carelessErrorCount = customAlgoObject.carelessErrorCount;
    const startTime = customAlgoObject.startTime;
    const timeElapsed = customAlgoObject.timeElapsed;
    const email = useSelector((state) => state.user.userObject.email);
    const timedShowAnswers = customAlgoObject.timedShowAnswers;
    const showTimer = customAlgoObject.showTimer;
    const timeInAnswerShown = customAlgoObject.timeInAnswerShown;
    const timeInAnswerNotShown = customAlgoObject.timeInAnswerNotShown;
    const pastRecords = useSelector((state) => state.pastRecords.pastRecords);
    const dispatch = useDispatch();

    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_all_algos";

        const presetAlgos = axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        let objectToDispatch = {};


        presetAlgos.then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                objectToDispatch[response.data[i].algo.algoKey] = { algoCode: response.data[i].algo.algoCode, algoName: response.data[i].algo.algoName, description: response.data[i].algo.description, algoKey: response.data[i].algo.algoKey }
            }

            dispatch(setPresetAlgos({ presetAlgos: objectToDispatch }));
        });

    }, [])

    useEffect(() => {

        if (startTime) {
            const interval = setInterval(() => {
                //calculate time elapsed
                const currentTime = new Date();
                const newTimeElapsed = Math.floor((currentTime - startTime) / 10);
                //update time elapsed
                dispatch(setTimeElapsed({ timeElapsed: newTimeElapsed }));
            }, 10);
            return () => clearInterval(interval);
        }

    }, [startTime])

    useEffect(() => {

        if (timedShowAnswers.length > 0) {
            const interval = setInterval(() => {
                let timeInAnswerShown = 0;
                let timeInAnswerNotShown = 0;
                const currentTime = new Date();
                for (let i = 0; i < timedShowAnswers.length; i++) {
                    if (i !== timedShowAnswers.length - 1) {
                        if (timedShowAnswers[i].showAnswer === true) {
                            timeInAnswerShown += timedShowAnswers[i + 1].time - timedShowAnswers[i].time;
                        } else {
                            timeInAnswerNotShown += timedShowAnswers[i + 1].time - timedShowAnswers[i].time;
                        }
                    } else {
                        if (timedShowAnswers[i].showAnswer === true) {
                            timeInAnswerShown += currentTime - timedShowAnswers[i].time;
                        } else {
                            timeInAnswerNotShown += currentTime - timedShowAnswers[i].time;
                        }
                    }
                }
                // console.log(timeInAnswerShown, timeInAnswerNotShown)
                dispatch(setTimeInAnswerShown({ timeInAnswerShown }));
                dispatch(setTimeInAnswerNotShown({ timeInAnswerNotShown }));
            }, 10);
            return () => clearInterval(interval);
        }

    }, [timedShowAnswers])

    useEffect(() => {

        const AllLinesOfCode = codeSubmitted.split("\n");
        for (let i = 0; i < AllLinesOfCode.length; i++) {
            // remove all spaces including leading and trailing spaces and tabs
            AllLinesOfCode[i] = AllLinesOfCode[i].replace(/\s/g, '');
        }

        // remove empty string from array
        for (let i = 0; i < AllLinesOfCode.length; i += 1) {
            if (AllLinesOfCode[i] === "") {
                AllLinesOfCode.splice(i, 1);
            }
        }

        const customAlgoInput = AllLinesOfCode;
        dispatch(setCustomAlgoInput({ customAlgoInput }))

        if (customAlgoInput.length > 0) {
            dispatch(setStartTime({ startTime: 0 }));
        }

        dispatch(emptyTimedShowAnswers());
    }, [codeSubmitted]);

    useEffect(() => {

        if (voiceEnabled) {
            const codeToBeRead = customAlgoInput[typedAlgoOutput.length];
            if (codeToBeRead && readCode && 'speechSynthesis' in window) {
                const msg = new SpeechSynthesisUtterance();
                msg.text = codeToBeRead;
                msg.rate = 0.6;
                msg.pitch = 1.2;
                window.speechSynthesis.speak(msg);
            }
        }

        dispatch(setReadCode({ readCode: false }));

    }, [readCode])

    function handleAnswerInputChange(e) {
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));
        dispatch(setAlgoSelected({ algoSelected: 'default' }));
        const codeSubmitted = e.target.value
        dispatch(setCodeSubmitted({ codeSubmitted }))
    }

    function handleCodeInputChange(e) {
        // check if delete key is pressed
        let codeInputChangeAllowed = false;
        if (customAlgoInput.length > 0 && e.nativeEvent.inputType === 'deleteContentBackward' && !mistakeModalDisplay) {
            codeInputChangeAllowed = true;
        } else if (customAlgoInput.length > 0 && algoLineState !== 'incorrect' && e.nativeEvent.inputType !== 'deleteContentBackward') {
            codeInputChangeAllowed = true;
        }
        if (codeInputChangeAllowed) {
            const comparisonCodeUnclean = customAlgoInput[typedAlgoOutput.length];
            let comparisonCode = comparisonCodeUnclean.replace(/\s/g, '');
            let val = e.target.value;
            dispatch(setCodeInput({ codeInput: val }))
            let codeInputVal = val.replace(/\s/g, '');
            // let comparisonCode = comparisonCodeUnclean.replace(/\s/g, '');
            if (val.length === 1 && comparisonCode.substring(0, codeInputVal.length) === codeInputVal) {
                dispatch(setReadCode({ readCode: true }));
                if (!startTime && typedAlgoOutput.length === 0) {
                    const newStartTime = new Date().getTime();
                    dispatch(setStartTime({ startTime: newStartTime }));
                    dispatch(addShowAnswerTime({
                        showAnswerTime: {
                            time: newStartTime,
                            showAnswer: showAnswer
                        }
                    }))
                }
            }
            if (comparisonCode.substring(0, codeInputVal.length) === codeInputVal && codeInputVal !== comparisonCode) {
                dispatch(setAlgoLineState({ algoLineState: 'semi' }))
            } else if (comparisonCode === codeInputVal) {
                dispatch(setAlgoLineState({ algoLineState: 'correct' }))
            } else {
                dispatch(setAlgoLineState({ algoLineState: 'incorrect' }))
                // dispatch(setMistakeModalDisplay({ mistakeModalDisplay: true }))
            }
        }
    }

    function handleCodeInputKeyDown(e) {
        if (e.key === 'Enter' && algoLineState === 'correct') {
            dispatch(addCodeInputToTypedAlgoOutput())
            if (typedAlgoOutput.length === customAlgoInput.length - 1) {

                const algoRecord = {
                    algoSelected: algoSelected,
                    conceptErrorCount: conceptErrorCount,
                    carelessErrorCount: carelessErrorCount,
                    startTime: startTime,
                    endTime: new Date().getTime(),
                    timeElapsed: timeElapsed,
                    customAlgoInput: customAlgoInput,
                    repeatObject: repeatObject,
                    timedShowAnswers: timedShowAnswers
                }

                if (email) {
                    algoRecord.email = email;
                } else {
                    algoRecord.email = 'guest';
                }

                const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/add_algo_record";
                axios.post(url, algoRecord).then((response) => {
                    console.log(response);

                    dispatch(setPastRecords({ pastRecords: [response.data, ...pastRecords] }))
                }).catch((error) => {
                    console.log(error);
                })

                dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
                dispatch(setStartTime({ startTime: 0 }));
                dispatch(setTimeElapsed({ timeElapsed: 0 }));
                dispatch(emptyTimedShowAnswers());
                if (repeatObject.repeatOn && repeatObject.repeatsLeft > 1) {
                    dispatch(setRepeatsLeft({ repeatsLeft: repeatObject.repeatsLeft - 1 }))
                    dispatch(setCarelessErrorCount({ carelessErrorCount: 0 }))
                    dispatch(setConceptErrorCount({ conceptErrorCount: 0 }))
                } else if (repeatObject.repeatOn && repeatObject.repeatsLeft === 1) {
                    dispatch(setRepeatOn({ repeatOn: false }))
                    dispatch(setRepeatsLeft({ repeatsLeft: 0 }))
                    // dispatch(setCodeSubmitted({ codeSubmitted: '' }));
                    // dispatch(setAlgoSelected({ algoSelected: 'default' }))
                    alert(`You have completed the repeat ${repeatObject.repeatsInitial} times! Well done! :D`)
                    dispatch(setRepeatsInitial({ repeatsInitial: 1 }))
                } else if (!repeatObject.repeatOn) {
                    // dispatch(setAlgoSelected({ algoSelected: 'default' }))
                    // dispatch(setCodeSubmitted({ codeSubmitted: '' }));
                    dispatch(setCarelessErrorCount({ carelessErrorCount: 0 }))
                    dispatch(setConceptErrorCount({ conceptErrorCount: 0 }))
                    alert('You have completed the algorithm! Well done! :D')
                }
            }
        }
    }

    function handleRandomiseAlgo() {
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));

        // get random key of presetAlgos
        const randomAlgoKey = Object.keys(presetAlgos)[Math.floor(Math.random() * Object.keys(presetAlgos).length)];
        const randomAlgo = presetAlgos[randomAlgoKey].algoCode;

        // create copy of randomAlgo
        const randomAlgoCopy = [...randomAlgo];
        // remove all spaces including leading and trailing spaces and tabs
        let codeSubmittedString = ''
        for (let i = 0; i < randomAlgoCopy.length; i++) {
            // add each line of code to codeSubmittedString with a new line character
            codeSubmittedString += randomAlgoCopy[i] + '\n';
            randomAlgoCopy[i] = randomAlgoCopy[i].replace(/\s/g, '');
        }
        // remove empty string from array
        for (let i = 0; i < randomAlgoCopy.length; i += 1) {
            if (randomAlgoCopy[i] === "") {
                randomAlgoCopy.splice(i, 1);
            }
        }

        dispatch(setCodeSubmitted({ codeSubmitted: codeSubmittedString }));
        dispatch(setAlgoSelected({ algoSelected: randomAlgoKey }));
    }

    function handleSelectAlgo(e) {
        if (repeatObject.repeatOn) {
            dispatch(setRepeatOn({ repeatOn: false }))
            dispatch(setRepeatsLeft({ repeatsLeft: 0 }))
            dispatch(setRepeatsInitial({ repeatsInitial: 1 }));
        }
        dispatch(setAlgoSelected({ algoSelected: e.target.value }));
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));
        dispatch(setCarelessErrorCount({ carelessErrorCount: 0 }))
        dispatch(setConceptErrorCount({ conceptErrorCount: 0 }))
        const selectedAlgo = e.target.value;
        const selectedAlgoCopy = [...presetAlgos[selectedAlgo].algoCode];
        let codeSubmittedString = ''
        for (let i = 0; i < selectedAlgoCopy.length; i++) {
            // add each line of code to codeSubmittedString with a new line character
            codeSubmittedString += selectedAlgoCopy[i] + '\n';
            selectedAlgoCopy[i] = selectedAlgoCopy[i].replace(/\s/g, '');
        }
        // remove empty string from array
        for (let i = 0; i < selectedAlgoCopy.length; i += 1) {
            if (selectedAlgoCopy[i] === "") {
                selectedAlgoCopy.splice(i, 1);
            }
        }

        dispatch(setCodeSubmitted({ codeSubmitted: codeSubmittedString }));
        dispatch(setPastRecordsRender({ setPastRecordsRender: true }));
    }

    function handleRepeatsInitialChange(e) {
        if (repeatObject.repeatOn) {
            alert('Please turn off repeat first!')
            return
        }
        dispatch(setRepeatsInitial({ repeatsInitial: e.target.value }))
    }

    function handleRepeatClick(e) {
        if (!codeSubmitted) {
            alert('Please enter some code first!')
        } else if (!repeatObject.repeatOn) {
            dispatch(setRepeatOn({ repeatOn: true }));
            dispatch(setRepeatsLeft({ repeatsLeft: repeatObject.repeatsInitial }));
        } else if (repeatObject.repeatOn) {
            dispatch(setRepeatOn({ repeatOn: false }));
            dispatch(setRepeatsLeft({ repeatsLeft: 0 }));
            dispatch(setRepeatsInitial({ repeatsInitial: 1 }));
        }
    }

    function handleShowAnswer() {
        dispatch(addShowAnswerTime({
            showAnswerTime: {
                time: new Date().getTime(),
                showAnswer: !showAnswer
            }
        }))
        dispatch(setShowAnswer({ showAnswer: !showAnswer }));
    }

    function handleVoiceEnable() {
        dispatch(setVoiceEnabled({ voiceEnabled: !voiceEnabled }));
    }

    function handleMistakeModalBackgroundClick() {
        dispatch(setMistakeModalDisplay({ mistakeModalDisplay: false }));
    }

    function handleConceptMistakeClick() {
        dispatch(setMistakeModalDisplay({ mistakeModalDisplay: false }));
        dispatch(setConceptErrorCount({ conceptErrorCount: conceptErrorCount + 1 }));
    }

    function handleTypoMistakeClick() {
        dispatch(setMistakeModalDisplay({ mistakeModalDisplay: false }));
        dispatch(setCarelessErrorCount({ carelessErrorCount: carelessErrorCount + 1 }));
    }

    function handleGlobalKeyDown(e) {
        // if escape key is pressed, close mistake modal
        if (e.key === 'Escape') {
            dispatch(setMistakeModalDisplay({ mistakeModalDisplay: false }));
            dispatch(setCarelessErrorCount({ carelessErrorCount: carelessErrorCount + 1 }));
        }
    }

    function handleHideTimer() {
        dispatch(setShowTimer({ showTimer: !showTimer }))
    }

    return (
        <div className='row'>
            <div onKeyDown={handleGlobalKeyDown} style={{
                width: '70%'
            }}>
                <div className='answers-typed' style={{
                    border: typedAlgoOutput.length > 0 ? '1px solid black' : 'none'
                }}>
                    {typedAlgoOutput.map((line, index) => {
                        return (
                            <div key={index}>
                                {line}
                            </div>
                        )
                    })}
                </div>
                <h2>Custom Algo Learning Feature</h2>
                <div className='toggle-algorithm-options'>
                    <div className='button-div' onClick={handleRandomiseAlgo}>Randomise!</div>
                    <select onChange={handleSelectAlgo} value={algoSelected}>
                        <option disabled value='default'>Select your Algo</option>
                        {
                            Object.keys(presetAlgos).map((key, index) => {
                                return (
                                    <option key={index} value={key}>{presetAlgos[key].algoName}</option>
                                )
                            })
                        }
                    </select>
                    <div className={repeatObject.repeatOn ? 'button-div-alert' : 'button-div'} onClick={handleRepeatClick}>{
                        repeatObject.repeatOn ? 'Stop' : 'Repeat'
                    }</div>
                    <select value={repeatObject.repeatsInitial} onChange={handleRepeatsInitialChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                    </select>

                    {repeatObject.repeatOn && <div className='repeats-left'>Repeats left: {repeatObject.repeatsLeft}</div>}
                    <button onClick={handleVoiceEnable}>{voiceEnabled ? 'Disable Voice' : 'Enable Voice'}</button>
                    <div style={{
                        display: conceptErrorCount ? 'block' : 'none'
                    }}>
                        Conceptual Errors: {conceptErrorCount}
                    </div>
                    <div style={{
                        display: carelessErrorCount ? 'block' : 'none'
                    }}>
                        Careless Errors: {carelessErrorCount}
                    </div>
                </div>
                {
                    algoSelected !== 'default' && (
                        <div>
                            Description: {presetAlgos[algoSelected].description}
                        </div>
                    )
                }
                <div className='timer-wrapper'>
                    <div>
                        Start Time: {
                            startTime ? new Date(startTime).toLocaleTimeString() : 'Not started'
                        }
                    </div>
                    <div className='button-div' onClick={handleHideTimer} style={{
                        display: startTime ? 'block' : 'none'
                    }}>
                        {showTimer ? 'Hide' : 'Show'} Timer
                    </div>
                    <div style={{
                        display: showTimer ? 'block' : 'none'
                    }}>
                        Time Taken: {timeElapsed / 100} seconds
                    </div>

                </div>
                <div className='progress-bar-wrapper' style={{
                    display: startTime ? 'flex' : 'none'
                }}>
                    <p>Time spent in answer hidden is {Number((timeInAnswerNotShown / (timeInAnswerNotShown + timeInAnswerShown)) * 100).toFixed(1)}%</p>
                    <progress value={`${(timeInAnswerNotShown / (timeInAnswerNotShown + timeInAnswerShown)) * 100}`} max="100"></progress>
                </div>
                <input type="text" className={`code-input-${algoLineState}`} id="code-input" onChange={handleCodeInputChange} onKeyDown={handleCodeInputKeyDown} value={codeInput} />
                <h3> Create algo answer </h3> <button onClick={handleShowAnswer}>{showAnswer ? "Hide" : "Show"}</button>
                <textarea rows={customAlgoInput.length < 13 ? customAlgoInput.length + 1 : 14} id="answer-input" onChange={handleAnswerInputChange} value={codeSubmitted} style={{
                    display: showAnswer ? 'block' : 'none',
                    width: '100%'
                }} />
                <div className='mistake-modal-background' style={{
                    display: mistakeModalDisplay ? 'block' : 'none'
                }}
                    onClick={handleMistakeModalBackgroundClick}
                >
                    <div className='mistake-modal'>
                        <div className='mistake-modal-text'>
                            You've made a mistake!
                        </div>
                        <button onClick={handleConceptMistakeClick}>Concept Mistake</button>
                        <button onClick={handleTypoMistakeClick}>Typo Mistake</button>
                        <button>Not a mistake</button>
                    </div>

                </div>
            </div>
            <div style={{
                width: '30%'
            }}>
                <PastRecordsParent email={email} algoSelected={algoSelected} />
            </div>
        </div>
    );
}