import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setCustomAlgoInput,
    setAlgoLineState,
    setCodeInput,
    addCodeInputToTypedAlgoOutput,
    setTypedAlgoOutput
} from '../customAlgoSlice';

export function CustomAlgo() {

    const customAlgoObject = useSelector((state) => state.customAlgo);
    const customAlgoInput = customAlgoObject.customAlgoInput;
    const typedAlgoOutput = customAlgoObject.typedAlgoOutput;
    const algoLineState = customAlgoObject.algoLineState;
    const codeInput = customAlgoObject.codeInput;
    const dispatch = useDispatch();

    function handleAnswerInputChange(e) {
        dispatch(setTypedAlgoOutput({ typedAlgoOutput: [] }));
        dispatch(setCodeInput({ codeInput: '' }));
        const codeSubmitted = e.target.value
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
            const comparisonCode = customAlgoInput[typedAlgoOutput.length];
            let val = e.target.value;
            dispatch(setCodeInput({ codeInput: val }))
            let codeInputVal = val.replace(/\s/g, '');
            console.log(codeInputVal, comparisonCode)
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
            if(typedAlgoOutput.length === customAlgoInput.length-1) {
                alert('You have completed the custom algo!')
            }
        }
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
            <input type="text" className={`code-input-${algoLineState}`} id="code-input" onChange={handleCodeInputChange} onKeyDown={handleCodeInputKeyDown} value={codeInput} />
            <h3> Create algo answer </h3>
            <textarea rows={customAlgoInput.length + 1} cols="120" id="answer-input" onChange={handleAnswerInputChange} />
        </div>
    );
}