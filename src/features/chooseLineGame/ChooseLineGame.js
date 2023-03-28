import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setGameRows,
    setRowAttempting,
    setUniqueCodeLineAt
} from "./chooseLineGameSlice";
import axios from "axios";

export function ChooseLineGame() {

    const dispatch = useDispatch();
    const gameRows = useSelector((state) => state.chooseLineGame.gameRows);
    const rowAttempting = useSelector((state) => state.chooseLineGame.rowAttempting);
    const uniqueCodeLineAt = useSelector((state) => state.chooseLineGame.uniqueCodeLineAt);
    const codeLineAtAnswer = useSelector((state) => state.chooseLineGame.codeLineAtAnswer);

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
                    return gameRow.codeLineAt;
                }
                ))];

                dispatch(setUniqueCodeLineAt(
                    { uniqueCodeLineAt: uniqueCodeLineAt }
                ))
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }, [])

    function handleAnswerChange(e){
        const userAnswer = e.target.value;
        const correctAnswer = e.target.dataset.answer;
        if(userAnswer === correctAnswer){
            console.log("correct")
            dispatch(setRowAttempting(
                { rowAttempting: rowAttempting + 1 }
            ))
            if(rowAttempting === gameRows.length - 1){
                alert("You have completed the game!")
            }
        }
    }

    return (
        <div>
            <h1>Choose Line Game</h1>
            <table style={{
                width: '100%'
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