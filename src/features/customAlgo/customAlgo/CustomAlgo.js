import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setCustomAlgoInput} from '../customAlgoSlice';

export function CustomAlgo() {

  const customAlgoObject = useSelector((state) => state.customAlgo);
  const customAlgoInput = customAlgoObject.customAlgoInput;
  const dispatch = useDispatch();

  function handleAnswerInputChange(e) {
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

    const answer = AllLinesOfCode;
    console.log('new answers array', answer);
    dispatch(setCustomAlgoInput({customAlgoInput: answer}))
  }

  return (
    console.log(customAlgoInput),
    <div>
      <h2>Custom Algo Feature</h2>
      <input type="text" className="code-input" id="code-input" />
      <h3> Create algo answer </h3>
      <textarea rows={customAlgoInput.length+1} cols="120" id="answer-input" onChange={handleAnswerInputChange}/>
    </div>
  );
}