import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "./questionsSlice";
import axios from "axios";
import { VisualizedCodeCard } from "./VisualizedCodeCard/VisualizedCodeCard";

export function Questions() {

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const email = useSelector((state) => state.user.userObject.email);

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
        const visualslength = e.target.dataset.visualslength;
        console.log(questionId, visualslength)
        if(visualslength === '0') {
        const postObj = {
            questionId: questionId
        }
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_visualize_codes";
        axios.post(url, postObj).then(
            (response) => {
                console.log(response.data)
                const newQuestions = JSON.parse(JSON.stringify(questions));
                newQuestions.forEach((question) => {
                    if (question.questionId === questionId) {
                        question.visualizedCodes = response.data;
                    }
                }
                )
                dispatch(setQuestions({
                    questions: newQuestions
                }))
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
        }else{
            const newQuestions = JSON.parse(JSON.stringify(questions));
            newQuestions.forEach((question) => {
                if (question.questionId === questionId) {
                    question.visualizedCodes = [];
                }
            }
            )
            dispatch(setQuestions({
                questions: newQuestions
            }))
        }
    }

    function handleCreateQuestionClick(){
        window.location.href = '/create-question';
    }

    return (
        (email !== undefined) ?
            <div>
                <div className='row'>
                <div style={{
                    width: 'fit-content'
                }}><h2>Questions</h2></div>
                <div className='button-div' onClick={handleCreateQuestionClick}>Create Question</div>
                </div>
                <div>
                    {questions.map((question, i) => {
                        return (
                            <div key={i}>
                                <h3>{question.questionName}</h3>
                                <p style={{
                                    whiteSpace: 'pre-line',
                                }}>{question.questionDescription}</p>
                                <div className='button-div' onClick={handleGetVisuals} data-questionid={question.questionId} data-visualslength={question.visualizedCodes.length}>
                                    {
                                        (question.visualizedCodes.length === 0) ?
                                        'Get Visuals' :
                                        'Remove Visuals'
                                    }
                                </div>
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
            </div> :
            <div>
                <h2>Please login to access</h2>
            </div>
    )
}