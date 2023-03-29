import React, { useEffect, useState } from "react";
import axios from "axios";

export function ChooseLineGameController() {

    const [visualizeCodes, setVisualizeCodes] = useState([]);

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
                }
                console.log(response.data.docs)
                setVisualizeCodes(response.data.docs)
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
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}>Question: {visualizeCode.question.questionName}</p>
                                <p>Function Name: {visualizeCode.functionName}</p>
                                <div className="button-div" data-id={visualizeCode._id} onClick={handlePlayGame}>Play Game</div>
                                <p>Arguments: {
                                    Object.keys(visualizeCode.arguments).map((argument, i) => {
                                        return (
                                            <span key={i}>{visualizeCode.arguments[argument]['input']}</span>
                                        )
                                    })
                                } </p>
                                <div>Code:
                                    <div style={{
                                        whiteSpace: "pre-wrap",
                                    }}>{visualizeCode.code}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}