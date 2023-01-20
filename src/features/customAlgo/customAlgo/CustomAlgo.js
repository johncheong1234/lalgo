import React, { useEffect } from 'react';
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


    }, [codeSubmitted]);

    function handleAnswerInputChange(e) {
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));
        const codeSubmitted = e.target.value
        dispatch(setCodeSubmitted({ codeSubmitted }))
    }

    function handleCodeInputChange(e) {
        if (customAlgoInput.length > 0) {
            const comparisonCodeUnclean = customAlgoInput[typedAlgoOutput.length];
            let comparisonCode = comparisonCodeUnclean.replace(/\s/g, '');
            let val = e.target.value;
            dispatch(setCodeInput({ codeInput: val }))
            let codeInputVal = val.replace(/\s/g, '');
            // let comparisonCode = comparisonCodeUnclean.replace(/\s/g, '');
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
                // empty the typed algo output
                dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
                dispatch(setCodeSubmitted({ codeSubmitted: '' }));
            }
        }
    }

    function handleRandomiseAlgo() {
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));

        // get random key of presetAlgos
        const randomAlgoKey = Object.keys(presetAlgos)[Math.floor(Math.random() * Object.keys(presetAlgos).length)];
        const randomAlgo = presetAlgos[randomAlgoKey];

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
    }

    function handleSelectAlgo(e){
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));
        const selectedAlgo = e.target.value;
        const selectedAlgoCopy = [...presetAlgos[selectedAlgo]];
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
            <div className='toggle-algorithm-options'>
            <div className='button-div' onClick={handleRandomiseAlgo}>Randomise!</div>
            <select onChange={handleSelectAlgo} defaultValue={'DEFAULT'}>
                <option disabled value='DEFAULT'>Select your Algo</option>
                {
                    Object.keys(presetAlgos).map((key, index) => {
                        return (
                            <option key={index}>{key}</option>
                        )
                    })
                }
            </select>
            </div>
            <input type="text" className={`code-input-${algoLineState}`} id="code-input" onChange={handleCodeInputChange} onKeyDown={handleCodeInputKeyDown} value={codeInput} />
            <h3> Create algo answer </h3>
            <textarea rows={customAlgoInput.length + 1} cols="120" id="answer-input" onChange={handleAnswerInputChange} value={codeSubmitted} />
        </div>
    );
}