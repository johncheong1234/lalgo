import React, { useEffect } from "react";
import axios from "axios";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    setVisualizeCodes,
} from "./chooseLineGameControllerSlice";

export function ChooseLineGameController() {

    const visualizeCodes = useSelector((state) => state.chooseLineGameController.visualizeCodes);
    const dispatch = useDispatch();
    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_visualize_codes";
        axios.post(url, {}).then(
            (response) => {

                for (let i = 0; i < response.data.docs.length; i++) {
                    for (let j = 0; j < response.data.questions.length; j++) {
                        if (response.data.docs[i].questionId === response.data.questions[j].questionId) {
                            response.data.docs[i].question = response.data.questions[j]
                        }
                    }
                    response.data.docs[i].showCode = false;
                }
                console.log(response.data.docs)
                dispatch(setVisualizeCodes({
                    visualizeCodes: response.data.docs
                }))
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }, [])

    function handlePlayGame(e) {
        const visualizeCodeId = e.target.dataset.id;
        window.location.href = `/choose-line-game/${visualizeCodeId}`
    }

    function handleToggleShowCode(e) {
        const visualizeCodeId = e.target.dataset.id;
        const newVisualizeCodes = JSON.parse(JSON.stringify(visualizeCodes));
        for (let i = 0; i < newVisualizeCodes.length; i++) {
            if (newVisualizeCodes[i]._id === visualizeCodeId) {
                newVisualizeCodes[i].showCode = !newVisualizeCodes[i].showCode;
            }
        }
        dispatch(setVisualizeCodes({
            visualizeCodes: newVisualizeCodes
        }))
    }

    return (
        <div style={{
            backgroundColor: '#1E333B',
            backgroundImage: 'url(https://assets.website-files.com/5837424ae11409586f837994/61195e21f792d7065d2f56ad_noise.png)',
            backgroundRepeat: 'repeat',
        }}>
            <p style={{
                fontSize: '30px',
                fontFamily: 'Trench',
                marginLeft: '55px',
                color: 'white',
                marginTop: '0px'
            }}>Choose Line Game To Play</p>
            <div style={{
                fontFamily: 'Trench',
                marginLeft: '55px',
                color: 'white',
                fontSize: '18px',
                lineHeight: '2px',
                width: '70vw'
            }}>
                <p>Each game represents an algorithm that you want to learn for a particular problem.</p>
                <p>Choose the appropriate line for the current set of local variables to generate the next set of variables.</p>
                <p>Simple?</p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                paddingLeft: '55px',
                paddingTop: '60px',
            }}>
                {
                    visualizeCodes.map((visualizeCode, index) => {
                        return (
                            <div key={index} style={{
                                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                marginBottom: '10px',
                                backgroundColor: '#F1F7F9',
                                fontFamily: 'Trench',
                                paddingTop: '18px',
                                paddingLeft: '35px',
                                borderRadius: '20px',
                                width: '70vw'
                            }}>
                                <div>
                                    <span style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}>Question: {visualizeCode.question.questionName}</span>
                                    <span style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginLeft: '15px',
                                        color: 'white',
                                        background: '#334C55',
                                        borderRadius: '5px',
                                        paddingTop: '4px',
                                        paddingBottom: '4px',
                                        paddingLeft: '25px',
                                        paddingRight: '25px',
                                        cursor: 'pointer',
                                    }}
                                        data-id={visualizeCode._id} onClick={handlePlayGame}
                                    >
                                        Play!
                                    </span>
                                </div>
                                <p>
                                    <span style={{
                                        fontWeight: 'bold',
                                    }}>Arguments: </span>
                                    <span style={{
                                        border: '1px solid #1E333B',
                                        borderRadius: '5px',
                                        padding: '5px',
                                    }}>
                                        {
                                            Object.keys(visualizeCode.arguments).map((argument, i) => {
                                                // return comma if not the last argument
                                                return (
                                                    <span key={i}>
                                                        {visualizeCode.arguments[argument]['input']}
                                                        {i !== Object.keys(visualizeCode.arguments).length - 1 ? ', ' : ''}
                                                    </span>
                                                )
                                            })
                                        }
                                    </span>
                                </p>
                                {/* <p>Function Name: {visualizeCode.functionName}</p> */}
                                {/* <div className="button-div" data-id={visualizeCode._id} onClick={handlePlayGame}>Play Game</div> */}

                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    marginLeft: '15px',
                                    color: 'white',
                                    background: '#334C55',
                                    borderRadius: '5px',
                                    paddingTop: '4px',
                                    paddingBottom: '4px',
                                    paddingLeft: '25px',
                                    paddingRight: '25px',
                                    cursor: 'pointer',
                                    maxWidth: '100px',
                                    marginLeft:'0px',
                                    marginBottom:'10px'
                                }}
                                    data-id={visualizeCode._id}
                                onClick={handleToggleShowCode}
                                >
                                    {visualizeCode.showCode ? 'Hide Code' : 'Show Code'}
                                </div>
                                <div
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        fontFamily: 'Trench',
                                        fontStyle: 'normal',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        lineHeight: '14px',
                                        display: visualizeCode.showCode ? 'block' : 'none'
                                    }}>
                                    {visualizeCode.code}
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}