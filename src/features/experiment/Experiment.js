import React, { useEffect } from 'react';

export default function Experiment() {

    let test = 'test';

    useEffect(() => {
        console.log('test', test);
    },[test]);

    function modifyTest(){
        for(let i=0; i<10; i++){
            test = `${i}`;
            console.log('test', test);
        }
    }
    

    return (
        <div>
            <div className='button-div' onClick={modifyTest}>Press</div>
        </div>
    )
}