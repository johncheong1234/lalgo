import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setQuestionName,
    setQuestionDescription,
} from './createQuestionSlice';
import axios from 'axios';

export function CreateQuestion() {

    const dispatch = useDispatch();
    const questionName = useSelector((state) => state.createQuestion.questionName);
    const questionDescription = useSelector((state) => state.createQuestion.questionDescription);

    function handleQuestionNameChange(e) {
        dispatch(setQuestionName({
            questionName: e.target.value
        }));
    }

    function handleQuestionDescriptionChange(e) {
        dispatch(setQuestionDescription({
            questionDescription: e.target.value
        }));
    }

    function handleSubmitQuestion() {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/create_question";

        const uniqueQuestionId = Date.now() + Math.random().toString(16).slice(2) + questionName.replace(/\s/g, '');

        const body = {
            questionId: uniqueQuestionId,
            questionName,
            questionDescription
        }

        axios.post(url, body).then((response) => {
            alert('Question submitted successfully');
            dispatch(setQuestionName({
                questionName: ''
            }));
            dispatch(setQuestionDescription({
                questionDescription: ''
            }));
        }).catch((error) => {
            alert('Question submission failed');
            console.log(error)
        }
        );
    }

    return (
        <div>
            <h1>Create Question</h1>
            <input type="text" value={questionName} onChange={handleQuestionNameChange} placeholder='Enter Question Name' />
            <br></br>
            <textarea placeholder='Enter Question Description' value={questionDescription} onChange={handleQuestionDescriptionChange} cols='140' rows='10' />
            <br></br>
            <div className='button-div' onClick={handleSubmitQuestion}>Submit Question</div>
        </div>
    );
}