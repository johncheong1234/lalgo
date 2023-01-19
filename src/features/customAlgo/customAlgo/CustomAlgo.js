import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setCustomAlgoInput,
    setAlgoLineState,
    setCodeInput,
    addCodeInputToTypedAlgoOutput,
    setTypedAlgoOutput,
    setCodeSubmitted
} from '../customAlgoSlice';

export function CustomAlgo() {

    const customAlgoObject = useSelector((state) => state.customAlgo);
    const customAlgoInput = customAlgoObject.customAlgoInput;
    const typedAlgoOutput = customAlgoObject.typedAlgoOutput;
    const algoLineState = customAlgoObject.algoLineState;
    const codeInput = customAlgoObject.codeInput;
    const presetAlgos = customAlgoObject.presetAlgos;
    const codeSubmitted = customAlgoObject.codeSubmitted;
    const dispatch = useDispatch();

    function handleAnswerInputChange(e) {
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));
        const codeSubmitted = e.target.value
        dispatch(setCodeSubmitted({ codeSubmitted }))
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
    }

    function handleCodeInputChange(e) {
        if (customAlgoInput.length > 0) {
            const comparisonCodeUnclean = customAlgoInput[typedAlgoOutput.length];
            let val = e.target.value;
            dispatch(setCodeInput({ codeInput: val }))
            let codeInputVal = val.replace(/\s/g, '');
            let comparisonCode = comparisonCodeUnclean.replace(/\s/g, '');
            console.log('code inputted is ', codeInputVal, 'comparison is ', comparisonCode)
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
        if (e.key === 'Enter' && algoLineState === 'correct') {
            dispatch(addCodeInputToTypedAlgoOutput())
            if (typedAlgoOutput.length === customAlgoInput.length - 1) {
                alert('You have completed the custom algo!')
            }
        }
    }

    function handleRandomiseAlgo(e) {
        // generate random number between 0 and length of presetAlgos
        const randomIndex = Math.floor(Math.random() * presetAlgos.length);
        const randomAlgo = presetAlgos[randomIndex];
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

        console.log('cleaned random algo', randomAlgoCopy)
        dispatch(setCustomAlgoInput({ customAlgoInput: randomAlgo }))
        dispatch(setCodeSubmitted({ codeSubmitted: codeSubmittedString }));
    }

    return (
        <div>
            <div className='answers-typed'>
                {typedAlgoOutput.map((line, index) => {
                    return (
                        <div key={index}>
                            {line}
                        </div>
                    )
                })}
            </div>
            <h2>Custom Algo Learning Feature</h2>
            <div className='button-div' onClick={handleRandomiseAlgo}>Randomise!</div>
            <input type="text" className={`code-input-${algoLineState}`} id="code-input" onChange={handleCodeInputChange} onKeyDown={handleCodeInputKeyDown} value={codeInput} />
            <h3> Create algo answer </h3>
            <textarea rows={customAlgoInput.length + 1} cols="120" id="answer-input" onChange={handleAnswerInputChange} value={codeSubmitted} />
        </div>
    );
}