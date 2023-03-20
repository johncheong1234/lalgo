import React from 'react';
import '../../../index.css';

export function QuestionCard(props) {
    const { question } = props;
    const { algoName, algoCode, algoKey } = question;

    return (
        <div className='create-set-question-card'>
            <div>
                {algoName}
            </div>
            <div>
                {algoKey}
            </div>
        </div>
    )
}