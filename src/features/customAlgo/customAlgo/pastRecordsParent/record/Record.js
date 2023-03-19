import React from 'react';

export function Record(props) {
    const record = props.record;
    const timeTaken = record.endTime - record.startTime;
    return (
        <div className='record-card'>
            <p>
                Start time: {record.startTime}
            </p>
            <p>
                End time: {record.endTime}
            </p>
            <p>
                Time taken: {timeTaken / 1000} s
            </p>
        </div>
    )

}