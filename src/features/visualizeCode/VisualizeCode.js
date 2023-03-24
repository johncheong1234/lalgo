import React from 'react';
import { useSelector } from 'react-redux';
import {
    setAlgoCode,
    setArguments,
    setCode
} from './visualizeCodeSlice';

export function VisualizeCode() {

    const email = useSelector((state) => state.user.userObject.email);

    return (
        (email !== undefined) ?
            <div>
                <h2>Visualize Python Code</h2>
                <div>
                    <input type="text" placeholder="Enter main function name, e.g. isMatch" style={{
                        width: '300px'
                    }}/>
                </div>
                <div>
                    <input type="text" placeholder="Enter argument" style={{
                        width: '300px'
                    }}/>
                    <button>Add argument</button>
                </div>
                <div>
                    <textarea placeholder="Enter algo code" cols='100' />
                </div>
                <div>
                    <button>Visualize</button>
                </div>
            </div> :
            <div>Please login to visualize code execution</div>

    )

}