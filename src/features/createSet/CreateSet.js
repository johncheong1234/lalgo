import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setQuestions,
    setCreateSetData
} from './createSetSlice';
import {QuestionCard} from './QuestionCard/QuestionCard';
import {SetQuestionCard} from './SetQuestionCard/SetQuestionCard';

export function CreateSet() {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.createSet.questions);
    const email = useSelector((state) => state.user.userObject.email);
    const createSetData = useSelector((state) => state.createSet.createSetData);

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
                objectToDispatch[response.data[i].algo.algoKey] = { algoCode: response.data[i].algo.algoCode, algoName: response.data[i].algo.algoName }
            }

            dispatch(setQuestions({ questions: objectToDispatch }));
        });

    }, []);

    function handleDropQuestion(e){
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        const {algoKey, repeats, algoName} = JSON.parse(data);
        console.log(algoKey, repeats, algoName);
        const newCreateSetData = [...createSetData, {algoKey, repeats, algoName}];
        dispatch(setCreateSetData({createSetData: newCreateSetData}));
    }

    function handleOnDragOver(e){
        e.preventDefault();
    }

    return (
        (email !== undefined) ? <div>
        <h2> Create new Training Set </h2>
        <div className='row'>
            <div style={{
                width: '50%'
            }}>
                <h5>
                    Questions
                </h5>
                {
                        Object.keys(questions).map((key, index) => {
                            return (
                                <QuestionCard key={index} question={questions[key]} algoKey={key} />
                            )
                        })
                    }
            </div>
            <div style={{
                width: '50%'
            }}>
                <h5>
                    Set Data
                </h5>
                <div className='create-set-information' onDrop={handleDropQuestion} onDragOver={handleOnDragOver}>
                    {
                        createSetData.map((data, index) => {
                            return (
                                <SetQuestionCard key={index} data={data} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div> : <div> Please login to create a new set </div>
    );
}