import React, { useEffect, useState } from "react";
import axios from "axios";

export function ChooseLineGameController() {

    const [visualizeCodes, setVisualizeCodes] = useState([]);

    useEffect(() => {
        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_visualize_codes";
        axios.post(url, {}).then(
            (response) => {
                setVisualizeCodes(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }, [])

    function handlePlayGame(e){
        const visualizeCodeId = e.target.dataset.id;
        window.location.href = `/choose-line-game/${visualizeCodeId}`
    }

    return (
        <div>
            <h1>Choose Line Game Controller</h1>
            {
                visualizeCodes.map((visualizeCode, index) => {
                    return (
                        <div key={index} style={{
                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                            marginBottom: '10px'
                        }}>
                            <p>Function Name: {visualizeCode.functionName}</p>
                            <div className="button-div" data-id={visualizeCode._id} onClick={handlePlayGame}>Play Game</div>
                            <p>Arguments: {
                                Object.keys(visualizeCode.arguments).map((argument, i) => {
                                    return (
                                        <span key={i}>{visualizeCode.arguments[argument]['input']}</span>
                                    )
                                })
                            } </p>
                            <div>Code: <div style={{
                                whiteSpace: "pre-wrap",
                            }}>{visualizeCode.code}</div></div>
                        </div>
                    )
                })
            }
        </div>
    )
}