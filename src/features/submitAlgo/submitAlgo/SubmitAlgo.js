import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setAlgoCode,
    setDescription,
    setAlgoName
} from '../submitAlgoSlice';
import axios from 'axios';

export function SubmitAlgo() {

    const postUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/create_new_algo';

    const dispatch = useDispatch();
    const algoName = useSelector(state => state.submitAlgo.algoName);
    const description = useSelector(state => state.submitAlgo.description);
    const algoCode = useSelector(state => state.submitAlgo.algoCode);
    const email = useSelector(state => state.user.userObject.email);

    function handleAlgoNameChange(e) {
        dispatch(setAlgoName(e.target.value));
    }

    function handleDescriptionChange(e) {
        dispatch(setDescription(e.target.value));
    }

    function handleEnterAlgoCodeChange(e) {
        const AllLinesOfCode = e.target.value.split("\n");

        for (let i = 0; i < AllLinesOfCode.length; i += 1) {
            // check if line has no characters apart from spaces and remove it
            if (AllLinesOfCode[i].trim() === '') {
                AllLinesOfCode.splice(i, 1);
                i -= 1;
            }
        }
        dispatch(setAlgoCode(AllLinesOfCode));
    }

    function handleSubmit() {
        if (algoName === '' ||
            // algoKey === '' || 
            algoCode.length === 0) {
            alert('Please fill all the fields');
            return;
        }

        // generate unique algoKey based on timestamp
        const uniqueId = Date.now() + Math.random().toString(16).slice(2) + algoName.replace(/\s/g, '') + email;

        const body = {
            algoName,
            algoKey: uniqueId,
            algoCode,
            description
        }

        axios.post(postUrl, body).then((response) => {
            alert('Algo submitted successfully');
        }).catch((error) => {
            alert('Error submitting algo');
        })
    }

    return (
        console.log('email is ', email),

        (email !== undefined) ?
            <div>
                < h1 > Submit Algo</h1 >
                <div>
                    <input type="text" placeholder="Enter algo name" value={algoName} onChange={handleAlgoNameChange} />
                </div>
                <div>
                    <input type="text" placeholder="Enter Description" value={description} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <textarea placeholder="Enter algo code" cols='100' rows={algoCode.length} onChange={handleEnterAlgoCodeChange} />
                </div>
                <button onClick={handleSubmit}>Submit</button>

            </div >


            : <div>Please login to submit algo</div>
    )
}