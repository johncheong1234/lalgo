import React from 'react';

export function AlgoCard(props) {

    const { algo, completionIndex,index } = props;

    let backgroundColor = 'white';

    if(completionIndex > index) {
        backgroundColor = 'green';
    }else if(completionIndex === index) {
        backgroundColor = 'yellow';
    }

    return (
        <div className='set-algo-progress-card' style={{
            backgroundColor: backgroundColor
        }}>
            <div>{algo.algoName}</div>
        </div>
    )
}