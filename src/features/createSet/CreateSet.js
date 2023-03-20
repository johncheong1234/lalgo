import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setQuestions
} from './createSetSlice';
import {QuestionCard} from './QuestionCard/QuestionCard';

export function CreateSet() {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.createSet.questions);
    const email = useSelector((state) => state.user.userObject.email);

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
                                <QuestionCard key={index} question={questions[key]} />
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
            </div>
        </div>
    </div> : <div> Please login to create a new set </div>
    );
}