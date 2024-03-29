import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setGameRows,
    setRowAttempting,
    setUniqueCodeLineAt,
    setMistakeCount,
    setGameArguments,
    setGameCode,
    setShowCode
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
    const showCode = useSelector((state) => state.chooseLineGame.showCode);
    const code = useSelector((state) => state.chooseLineGame.code);
    const email = useSelector((state) => state.user.userObject.email);

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

    function handleShowCodeToggle() {
        dispatch(setShowCode(
            { showCode: !showCode }
        ))
    }

    function handleRowChange(e){
        console.log(e.target.value)
        dispatch(setRowAttempting(
            { rowAttempting: parseInt(e.target.value) }
        ))
    }

    return (
        email ? (
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

                </div>
                <div className='game-arguments-wrapper'>
                    <span style={{
                        color: 'white',
                        fontFamily: 'Trench',
                        fontStyle: 'normal',
                        fontWeight: '100',
                        fontSize: '16px',
                        lineHeight: '16px',
                    }}>
                        Arguments:

                    </span>
                    <div style={{
                        border: '1px solid #1E333B',
                        borderRadius: '5px',
                        padding: '5px',
                        marginBottom: '10px',
                        color: 'white',
                    }}>
                        {
                            Object.keys(gameArguments).map((argument, i) => {
                                // return comma if not the last argument
                                // split by line breaks
                                const inputLines = gameArguments[argument]['input'].split('\n');

                                // if there is only one line, then no need to split
                                if (inputLines.length === 1) {
                                    return (
                                        <span key={i}>
                                            {gameArguments[argument]['input']}
                                            {i !== Object.keys(gameArguments).length - 1 ? ', ' : ''}
                                        </span>
                                    )
                                } else {
                                    console.log(inputLines)
                                    return (
                                        // <span key={i}>
                                        //     this is it
                                        // </span>
                                        inputLines.map((line, j) => {
                                            return (
                                                <span key={j}>
                                                    {line}
                                                    {j !== inputLines.length - 1 ? <br /> : ''}
                                                </span>
                                            )
                                        })
                                    )

                                }

                            })
                        }
                    </div>
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
                    }}
                        onClick={handleShowCodeToggle}
                    >
                        {showCode ? 'Hide Code' : 'Show Code'}
                    </span>

                    <p style={{
                        color: 'white',
                        fontFamily: 'Trench',
                        fontStyle: 'normal',
                        fontWeight: '100',
                        marginTop: '30px'
                    }}>
                        Total rows is: {gameRows.length}
                    </p>
                </div> 
                <div
                    style={{
                        whiteSpace: "pre-wrap",
                        fontFamily: 'Trench',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        display: showCode ? 'block' : 'none',
                        marginTop: '20px',
                        color: 'white',
                    }}
                    className='choose-line-game-code'
                >
                    {code}
                </div>
                <div className='choose-line-game-table'>
                    <table
                    >
                        <tbody>
                            <tr>
                                <th>event</th>
                                <th>Objects</th>
                                <th>Code Line At</th>
                                <th>Row</th>
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
                                                        const classIndex = index % 5 === 0 ? 5 : index % 5;
                                                        return (
                                                            <div key={index}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <p
                                                                    className={`choose-line-game-table-objects-${classIndex}`}
                                                                >{key}: {JSON.stringify(gameRow.localObjects[key])}</p>
                                                            </div>
                                                        )
                                                    })

                                                }</td>
                                                <td>{gameRow.codeLineAt}</td>
                                                <td>{index}</td>
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
                                                        const classIndex = index % 5 === 0 ? 5 : index % 5;
                                                        return (
                                                            <div key={index}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                <p
                                                                    className={`choose-line-game-table-objects-${classIndex}`}
                                                                >{key}: {JSON.stringify(gameRow.localObjects[key])}</p>
                                                            </div>
                                                        )
                                                    }
                                                    )
                                                }</td>
                                                <td>
                                                    <select data-answer={gameRow.codeLineAt} value={codeLineAtAnswer} onChange={handleAnswerChange}
                                                        style={{
                                                            maxWidth: '100px',
                                                        }}
                                                    >
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
                                                <td>
                                                    <input value={index} type='number' onChange={
                                                        handleRowChange
                                                    }
                                                    style = {{
                                                        // centralize the input
                                                        textAlign: 'center',
                                                        fontSize: '16px',
                                                        width: '30%',
                                                    }}
                                                    />
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
        ) : (
            <div style={{
                backgroundColor: '#1E333B',
                backgroundImage: 'url(https://assets.website-files.com/5837424ae11409586f837994/61195e21f792d7065d2f56ad_noise.png)',
                backgroundRepeat: 'repeat',
                border: '1px solid #1E333B',
                minHeight: '100vh',
                color: 'white',
                fontFamily: 'Trench',
            }}>
                <h2>
                    Please login to access game
                </h2>
            </div>

        )

    )
}