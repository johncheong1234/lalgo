import React from 'react';

export function Record(props) {
    const record = props.record;
    const timeTaken = record.endTime - record.startTime;
    // format the start time
    const startTime = new Date(record.startTime).toLocaleString();
    const endTime = new Date(record.endTime).toLocaleString();
    return (
        <div className='record-card'>
            <p>
                Start time: {startTime}
            </p>
            <p>
                End time: {endTime}
            </p>
            <p>
                Time taken: {timeTaken / 1000} s
            </p>
        </div>
    )

}