import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setAlgoCode,
    setAlgoKey,
    setAlgoName
} from '../submitAlgoSlice';
import axios from 'axios';

export function SubmitAlgo() {

    const postUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/create_new_algo';

    const dispatch = useDispatch();
    const algoName = useSelector(state => state.submitAlgo.algoName);
    const algoKey = useSelector(state => state.submitAlgo.algoKey);
    const algoCode = useSelector(state => state.submitAlgo.algoCode);

    function handleAlgoNameChange(e) {
        dispatch(setAlgoName(e.target.value));
    }

    function handleAlgoKeyChange(e) {
        dispatch(setAlgoKey(e.target.value));
    }

    function handleEnterAlgoCodeChange(e) {
        const AllLinesOfCode = e.target.value.split("\n");

        // remove empty string from array
        for (let i = 0; i < AllLinesOfCode.length; i += 1) {
            if (AllLinesOfCode[i] === "") {
                AllLinesOfCode.splice(i, 1);
            }
        }
        dispatch(setAlgoCode(AllLinesOfCode));
    }

    function handleSubmit(){
        if(algoName === '' || algoKey === '' || algoCode.length === 0){
            alert('Please fill all the fields');
            return;
        }

        //ensure algoKey is 1 word
        if(algoKey.split(' ').length > 1){
            alert('Algo Key should be one word');
            return;
        }

        const body = {
            algoName,
            algoKey,
            algoCode
        }

        axios.post(postUrl, body)
    }

    return (
        <div>
            <h1>Submit Algo</h1>
            <div>
                <input type="text" placeholder="Enter algo name" value={algoName} onChange={handleAlgoNameChange} />
            </div>
            <div>
                <input type="text" placeholder="Enter algo Key" value={algoKey} onChange={handleAlgoKeyChange} />
            </div>
            <div>
                <textarea placeholder="Enter algo code" cols='100' rows={algoCode.length} onChange={handleEnterAlgoCodeChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>

        </div>
    )
}