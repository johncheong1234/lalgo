import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "./questionsSlice";
import axios from "axios";
import {VisualizedCodeCard} from "./VisualizedCodeCard/VisualizedCodeCard";

export function Questions() {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);

    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_questions";
        axios.post(url, {}).then(
            (response) => {
                console.log(response.data)
                const questions = [];
                response.data.forEach((question) => {
                    questions.push({
                        questionName: question.questionName,
                        questionDescription: question.questionDescription,
                        questionId: question.questionId,
                        visualizedCodes: []
                    })
                });
                dispatch(setQuestions({
                    questions: questions
                }))
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }, [])

    function handleGetVisuals(e) {
        const questionId = e.target.dataset.questionid;
        console.log(questionId)
    }

    return (
        <div>
            <h2>Questions</h2>
            <div>
                {questions.map((question) => {
                    return (
                        <div>
                            <h3>{question.questionName}</h3>
                            <p>{question.questionDescription}</p>
                            <div className='button-div' onClick={handleGetVisuals} data-questionId={question.questionId}>Get Visuals</div>
                            {
                                question.visualizedCodes.map((visualizedCode, index) => {
                                    return (
                                        <VisualizedCodeCard visualizedCode={visualizedCode} key={index} />
                                    )
                                })
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}