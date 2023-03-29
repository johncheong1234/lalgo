import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setGameRows,
    setRowAttempting,
    setUniqueCodeLineAt,
    setMistakeCount,
    setGameArguments,
    setGameCode
} from "./chooseLineGameSlice";
import axios from "axios";

export function ChooseLineGame() {

    const dispatch = useDispatch();
    const gameRows = useSelector((state) => state.chooseLineGame.gameRows);
    const rowAttempting = useSelector((state) => state.chooseLineGame.rowAttempting);
    const uniqueCodeLineAt = useSelector((state) => state.chooseLineGame.uniqueCodeLineAt);
    const codeLineAtAnswer = useSelector((state) => state.chooseLineGame.codeLineAtAnswer);
    const mistakeCount = useSelector((state) => state.chooseLineGame.mistakeCount);

    useEffect(() => {

        // get id from url
        const _id = window.location.pathname.split("/")[2];
        const postObj = {
            _id: _id
        }

        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_visualize_code_by_id";
        axios.post(url, postObj).then(
            (response) => {
                // filter response.data based on whether codeLineAt property exists for each object
                const gameRows = response.data[0].visualList.filter((visual) => {
                    return visual.codeLineAt !== undefined;
                })

                dispatch(setGameRows(
                    { gameRows: gameRows }
                ))

                const uniqueCodeLineAt = [...new Set(gameRows.map((gameRow) => {
                    // strip leading spaces
                    return gameRow.codeLineAt.replace(/^\s+/, "");
                }
                ))];

                dispatch(setUniqueCodeLineAt(
                    { uniqueCodeLineAt: uniqueCodeLineAt }
                ))

                dispatch(
                    setGameArguments(
                        {
                            arguments: response.data[0].arguments
                        }
                    )
                )

                dispatch(
                    setGameCode(
                        {
                            code: response.data[0].code
                        }
                    )
                )
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }, [])

    useEffect(() => {

        const elem = document.getElementById("row-attempting");
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }

    }, [rowAttempting])

    function handleAnswerChange(e) {
        const userAnswer = e.target.value.replace(/^\s+/, "");
        const correctAnswer = e.target.dataset.answer.replace(/^\s+/, "");
        if (userAnswer === correctAnswer) {
            if (rowAttempting === gameRows.length - 1) {
                alert("You have completed the game!")
            } else {
                dispatch(setRowAttempting(
                    { rowAttempting: rowAttempting + 1 }
                ))
            }

        } else {
            console.log("wrong")
            dispatch(setMistakeCount(
                { mistakeCount: mistakeCount + 1 }
            ))
        }
    }

    function handleRestart() {
        dispatch(setRowAttempting(
            { rowAttempting: 0 }
        ))
        dispatch(setMistakeCount(
            { mistakeCount: 0 }
        ))
    }

    return (
        <div style={{
            backgroundColor: '#1E333B',
            backgroundImage: 'url(https://assets.website-files.com/5837424ae11409586f837994/61195e21f792d7065d2f56ad_noise.png)',
            backgroundRepeat: 'repeat',
        }}>
            <div>
                <span style={{
                    fontSize: '30px',
                    fontFamily: 'Trench',
                    marginLeft: '55px',
                    color: 'white',
                    marginTop: '0px'
                }}>Choose Line Game
                </span>
                <span>Mistake Count:
                    <span style={{
                        color: 'red'
                    }}>{mistakeCount}</span>
                </span>
                <span className='button-div' style={{
                    marginBottom: '10px'
                }}
                    onClick={
                        handleRestart
                    }
                >Restart</span>
                <span>
                    Arguments: {

                    }
                </span>
            </div>
            <p>Choose the line of code that corresponds to the event and objects</p>
            <table style={{
                width: '100%',
                marginBottom: '200px'
            }}>
                <tbody>
                    <tr>
                        <th>event</th>
                        <th>Objects</th>
                        <th>Code Line At</th>
                    </tr>
                    {
                        gameRows.map((gameRow, index) => {
                            if (index < rowAttempting) {
                                return (
                                    <tr key={index}>
                                        <td>{gameRow.event}</td>
                                        <td>{

                                            Object.keys(gameRow.localObjects).map((key, index) => {
                                                // console.log(key, visual.localObjects[key])
                                                return (
                                                    <div key={index}>
                                                        <p>{key}: {JSON.stringify(gameRow.localObjects[key])}</p>
                                                    </div>
                                                )
                                            })

                                        }</td>
                                        <td>{gameRow.codeLineAt}</td>
                                    </tr>
                                )
                            }
                            else if (index === rowAttempting) {
                                return (
                                    <tr key={index} id='row-attempting'>
                                        <td>{gameRow.event}</td>
                                        <td>{
                                            Object.keys(gameRow.localObjects).map((key, index) => {
                                                // console.log(key, visual.localObjects[key])
                                                return (
                                                    <div key={index}>
                                                        <p>{key}: {JSON.stringify(gameRow.localObjects[key])}</p>
                                                    </div>
                                                )
                                            }
                                            )
                                        }</td>
                                        <td>
                                            <select data-answer={gameRow.codeLineAt} value={codeLineAtAnswer} onChange={handleAnswerChange} >
                                                <option value='default' disabled>Choose Code Line At</option>
                                                {
                                                    uniqueCodeLineAt.map((codeLineAt, index) => {
                                                        return (
                                                            <option key={index} value={codeLineAt}>{codeLineAt}</option>
                                                        )
                                                    }
                                                    )
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}