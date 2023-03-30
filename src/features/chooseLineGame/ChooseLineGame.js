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
    const gameArguments = useSelector((state) => state.chooseLineGame.arguments);

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
        console.log('arguments are ', gameArguments),
        <div style={{
            backgroundColor: '#1E333B',
            backgroundImage: 'url(https://assets.website-files.com/5837424ae11409586f837994/61195e21f792d7065d2f56ad_noise.png)',
            backgroundRepeat: 'repeat',
            border: '1px solid #1E333B',
            minHeight: '100vh'
        }}>
            <div className='choose-line-game-misc-wrapper'>
                <span style={{
                    fontSize: '30px',
                    fontFamily: 'Trench',
                    marginLeft: '55px',
                    color: 'white',
                    marginTop: '0px',
                    lineHeight: '30px',
                }}>Choose Line Game
                </span>
                <span style={{
                    color: '#1E333B',
                    backgroundColor: '#F8FBFC',
                    padding: '8px',
                    fontFamily: 'Trench',
                    fontStyle: 'normal',
                    fontWeight: '100',
                    fontSize: '16px',
                    lineHeight: '16px',
                    border: '1px solid #476069',
                    borderRadius: '5px',
                    marginLeft: '20px',
                    fontWeight: 'bold'
                }}>Mistake Count:
                    <span style={{
                        color: 'red'
                    }}>{mistakeCount}</span>
                </span>
                <span style={{
                    marginLeft: '24px',
                    color: 'white',
                    background: '#1E333B',
                    border: '1px solid #FFFFFF',
                    borderRadius: '5px',
                    padding: '8px',
                    fontFamily: 'Trench',
                    fontStyle: 'normal',
                    fontWeight: '100',
                    fontSize: '16px',
                    lineHeight: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
                    onClick={
                        handleRestart
                    }
                >Restart</span>
                <span style={{
                    marginLeft: '24px',
                    color: 'white',
                    fontFamily: 'Trench',
                    fontStyle: 'normal',
                    fontWeight: '100',
                    fontSize: '16px',
                    lineHeight: '16px',
                }}>
                    Arguments:
                    <span style={{
                        color: '#1E333B',
                        backgroundColor: '#F8FBFC',
                        padding: '8px',
                        fontFamily: 'Trench',
                        fontStyle: 'normal',
                        fontWeight: '100',
                        fontSize: '16px',
                        lineHeight: '16px',
                        border: '1px solid #476069',
                        borderRadius: '5px',
                        marginLeft: '10px',
                        fontWeight: 'bold'
                    }}>
                        {
                            gameArguments.map((argument, index) => {
                                return (
                                    <span key={index}>
                                        {argument['input']}
                                        {index !== gameArguments.length - 1 ? ', ' : ''}
                                    </span>
                                )
                            })
                        }
                    </span>
                </span>
            </div>
            <div className="choose-line-game-instructions-wrapper">
                <p style={{
                    color: 'white',
                    fontFamily: 'Trench',
                    fontStyle: 'normal',
                    fontWeight: '100',
                    marginTop: '30px'
                }}>Choose the appropriate line for the current set of local variables to generate the next set of variables.
                </p>
            </div>
            <div className='choose-line-game-show-algorithm-wrapper'>
                <span style={{
                    fontFamily: 'Trench',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    border: '1px solid #FFFFFF',
                    borderRadius: '5px',
                    padding: '8px',
                    cursor: 'pointer',
                }}>
                    Show Algorithm 
                </span>
            </div>
            <div className='choose-line-game-table'>
                <table 
                >
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
        </div >
    )
}