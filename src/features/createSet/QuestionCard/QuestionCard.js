import React from 'react';
import '../../../index.css';

export function QuestionCard(props) {
    const { question, algoKey } = props;
    const { algoName } = question;

    function handleOnDragStart(event) {
        const algoKey = event.target.getAttribute('data-algokey');
        const repeats = event.target.getAttribute('data-repeats');
        const algoName = event.target.getAttribute('data-algoname');
        event.dataTransfer.setData('text/plain', JSON.stringify({ algoKey, repeats, algoName }));
    }

    return (
        <div className='create-set-question-card'
            draggable={true}
            onDragStart={
                handleOnDragStart
            }
            data-algokey={`${algoKey}`}
            data-repeats={1}
            data-algoname={`${algoName}`}
        >
            <div>
                Name: {algoName}
            </div>
            <div>
                Key: {algoKey}
            </div>
        </div>
    )
}