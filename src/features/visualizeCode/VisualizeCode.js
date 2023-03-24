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


    function cleanString(str) {
        // Remove all escape characters from the string
        str = str.replace(/\\/g, '');

        // Replace single quotes with double quotes
        str = str.replace(/'/g, '"');

        // Remove any trailing commas
        str = str.replace(/,(?=\s*?[\]}])/g, '');

        // Return the cleaned-up string
        return str;
    }

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

    function handleVisualize() {
        const postObj = {
            functionName: functionName,
            arguments: functionArguments,
            code: code
        }

        const url = 'http://localhost:5000/submit';
        axios.post(url, postObj).then(
            (response) => {
                alert('success');
                const cleanedVisualList = [];
                for (let i = 0; i < response.data.visualList.length; i++) {
                    if (response.data.visualList[i].event !== 'opcode') {
                        
                        const visualObject = response.data.visualList[i]
                        
                        // implement try catch
                        try {
                            const newString = cleanString(visualObject.localObjects);
                            const parsedLocalObjects = JSON.parse(newString);
                            visualObject.localObjects = parsedLocalObjects;
                        } catch (error) {
                            console.log(error, visualObject.localObjects)
                        }

                        cleanedVisualList.push(visualObject);
                    }



                }
                console.log(cleanedVisualList)
            }
        ).catch(
            (error) => {
                alert('error');
            }
        )
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