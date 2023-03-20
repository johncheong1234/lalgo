import React from 'react';
import '../../../index.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    setCreateSetData
} from '../createSetSlice';

export function SetQuestionCard(props) {
    const { data, index } = props;
    const { repeats, algoKey, algoName } = data;
    const dispatch = useDispatch();

    const createSetData = useSelector((state) => state.createSet.createSetData);

    function handleRepeatsChange(e) {
        const newRepeats = e.target.value;
        if (newRepeats > 0) {
            const newCreateSetData = JSON.parse(JSON.stringify(createSetData));
            newCreateSetData[index].repeats = newRepeats;
            dispatch(setCreateSetData({ createSetData: newCreateSetData }));
        }
    }

    function deleteSetQuestion() {
        const newCreateSetData = JSON.parse(JSON.stringify(createSetData));
        newCreateSetData.splice(index, 1);
        dispatch(setCreateSetData({ createSetData: newCreateSetData }));
    }

    return (
        <div className='create-set-question-card'>
            <div>
                Name: {algoName}
            </div>
            <div>
                Key: {algoKey}
            </div>
            <div>
                <input type='number' value={repeats} onChange={handleRepeatsChange} />
            </div>
            <div className='delete-button' onClick={deleteSetQuestion}>
                &#10006;
            </div>
        </div>

    )

}