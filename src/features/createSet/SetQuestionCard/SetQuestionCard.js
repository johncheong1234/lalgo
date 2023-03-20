import React from 'react';
import '../../../index.css';

export function SetQuestionCard(props) {
    const { data, index } = props;
    const { repeats, algoKey, algoName } = data;

    return (
        <div className='create-set-question-card'>
            <div>
                {algoName}
            </div>
            <div>
                {algoKey}
            </div>
            <div>
                {repeats}
            </div>
        </div>

    )

}