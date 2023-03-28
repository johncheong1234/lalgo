import React from "react";

export function VisualizedCodeCard(props) {

    const { visualizedCode } = props;
    const functionName = visualizedCode.functionName;
    const functionArguments = JSON.stringify(visualizedCode.arguments);
    const code = visualizedCode.code;
    const visualList = visualizedCode.visualList;

    return (
        // console.log(visualizedCode),
        <div className='visualized-code-card' style={{
            width: 'fit-content'
        }}>
            <div>
                <p>Function Name: {functionName} </p>
                <p>Arguments: {functionArguments} </p>
                <div>Code: <br></br>
                    <div style={{
                        whiteSpace: "pre-wrap",
                    }}>{code}
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>event</th>
                                {/* <th>Code Line Prior</th> */}
                                <th>Code Line At</th>
                                <th>Objects</th>
                            </tr>
                            {visualList.map((visual, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{visual.event}</td>
                                        {/* <td> {visual.codeLinePrior}</td> */}
                                        <td>{visual.codeLineAt} </td>
                                        <td>
                                            {
                                                Object.keys(visual.localObjects).map((key, index) => {
                                                    // console.log(key, visual.localObjects[key])
                                                    return (
                                                        <div key={index}>
                                                            <p>{key}: {JSON.stringify(visual.localObjects[key])}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}