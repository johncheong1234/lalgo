import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setFunctionName,
    setFunctionArguments,
    setFunctionCode
} from './visualizeCodeSlice';
import axios from 'axios';

export function VisualizeCode() {

    const dispatch = useDispatch();

    const email = useSelector((state) => state.user.userObject.email);
    const functionArguments = useSelector((state) => state.visualizeCode.arguments);
    const functionName = useSelector((state) => state.visualizeCode.functionName);
    const code = useSelector((state) => state.visualizeCode.code);

    function handleArgumentChange(e) {
        const index = e.target.dataset.index;

        const value = e.target.value;
        console.log(index, value)
        const newArguments = JSON.parse(JSON.stringify(functionArguments));
        newArguments[index].input = value;
        console.log(newArguments)
        dispatch(setFunctionArguments({
            arguments: newArguments
        }));
    }

    function handleAddArgument() {
        const newArguments = JSON.parse(JSON.stringify(functionArguments));
        newArguments.push({
            input: ''
        });
        dispatch(setFunctionArguments({
            arguments: newArguments
        }));
    }

    function handleFunctionNameChange(e) {
        dispatch(setFunctionName({
            functionName: e.target.value
        }));
    }

    function handleCodeChange(e) {
        dispatch(setFunctionCode({
            code: e.target.value
        }));
    }

    function handleVisualize(){
        const postObj = {
            functionName: functionName,
            arguments: functionArguments,
            code: code
        }

        const url = 'http://localhost:5000/submit';
        axios.post(url, postObj)
    }

    return (
        (email !== undefined) ?
            <div>
                <h2>Visualize Python Code</h2>
                <div>
                    <input type="text" placeholder="Enter main function name, e.g. isMatch" style={{
                        width: '300px'
                    }}
                        value={functionName}
                        onChange={handleFunctionNameChange}
                    />
                </div>
                <div>
                    {
                        functionArguments.map((argument, index) => {
                            return (
                                <div key={index}>
                                    argument {index + 1}: 
                                    <input type="text" placeholder="Enter argument" style={{
                                        width: '300px'
                                    }}
                                        value={argument.input}
                                        onChange={handleArgumentChange}
                                        data-index={index}
                                    />
                                </div>
                            )
                        })
                    }
                    <div className='button-div' onClick={handleAddArgument}>
                        Add Argument
                    </div>
                </div>
                <div>
                    <textarea placeholder="Enter algo code" cols='100' value={
                        code
                    }
                        onChange={
                            handleCodeChange
                        }

                        rows='10'
                    />
                </div>
                <div>
                    <button onClick={
                        handleVisualize
                    }>Visualize</button>
                </div>
            </div> :
            <div>Please login to visualize code execution</div>

    )

}