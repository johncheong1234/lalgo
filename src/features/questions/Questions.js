import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "./questionsSlice";
import axios from "axios";

export function Questions() {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);

    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_questions";
        axios.post(url, {}).then(
            (response) => {
                console.log(response.data)
                dispatch(setQuestions({
                    questions: response.data
                }))
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }, [])

    return (
        <div>
            <h2>Questions</h2>
            <div>
                {questions.map((question) => {
                    return (
                        <div>
                            <h3>{question.questionName}</h3>
                            <p>{question.questionDescription}</p>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}