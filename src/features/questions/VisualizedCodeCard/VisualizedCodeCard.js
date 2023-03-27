import React from "react";

export function VisualizedCodeCard(props) {

    const { visualizedCode } = props;
    const functionName = visualizedCode.functionName;
    const functionArguments = JSON.stringify(visualizedCode.arguments);
    const code = visualizedCode.code;

    return (
        console.log(visualizedCode),
        <div className='visualized-code-card'>
            <div>
                <p>Function Name: {functionName} </p>
                <p>Arguments: {functionArguments} </p>
                <div>Code: <br></br>
                    <div style={{
                        whiteSpace: "pre-wrap",
                    }}>{code}
                    </div>
                </div>
            </div>
        </div>
    )
}