import React from 'react';
import '../../../index.css';

export function QuestionCard(props) {
    const { question, algoKey } = props;
    const { algoName } = question;

    function handleOnDragStart(event) {
        const algoKey = event.target.getAttribute('data-algokey');
        const repeats = event.target.getAttribute('data-repeats');
        event.dataTransfer.setData('text/plain', JSON.stringify({ algoKey, repeats }));
    }

    return (
        <div className='create-set-question-card'
            draggable={true}
            onDragStart={
                handleOnDragStart
            }
            data-algokey={`${algoKey}`}
            data-repeats={1}
        >
            <div>
                {algoName}
            </div>
            <div>
                {algoKey}
            </div>
        </div>
    )
}