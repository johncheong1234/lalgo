import React from 'react';

export function Record(props) {
    const record = props.record;
    const timeTaken = record.endTime - record.startTime;
    // format the start time
    const startTime = new Date(record.startTime).toLocaleString();
    const endTime = new Date(record.endTime).toLocaleString();
    const carelessErrorCount = record.carelessErrorCount;
    const conceptErrorCount = record.conceptErrorCount;
    const timedShowAnswers = record.timedShowAnswers;

    let timeInAnswerShown = 0;
    let timeInAnswerNotShown = 0;
    for (let i = 0; i < timedShowAnswers.length; i++) {
        if (i !== timedShowAnswers.length - 1) {
            if (timedShowAnswers[i].showAnswer === true) {
                timeInAnswerShown += timedShowAnswers[i + 1].time - timedShowAnswers[i].time;
            } else {
                timeInAnswerNotShown += timedShowAnswers[i + 1].time - timedShowAnswers[i].time;
            }
        } else {
            if (timedShowAnswers[i].showAnswer === true) {
                timeInAnswerShown += endTime - timedShowAnswers[i].time;
            } else {
                timeInAnswerNotShown += endTime - timedShowAnswers[i].time;
            }
        }
    }

    const percentageHidden = Number((timeInAnswerNotShown / (timeInAnswerNotShown + timeInAnswerShown)) * 100).toFixed(1);

    const repeatObject = record.repeatObject;

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
            <p>
                Careless errors: {carelessErrorCount}
            </p>
            <p>
                Concept errors: {conceptErrorCount}
            </p>
            <p>
                Percentage hidden: {percentageHidden}%
            </p>
            {repeatObject.repeatOn && (
                <>
                    <p>
                        Repeats Left: {repeatObject.repeatsLeft}
                    </p>
                    <p>
                        Repeats Initial: {repeatObject.repeatsInitial}
                    </p>
                </>
            )}
        </div>
    )

}