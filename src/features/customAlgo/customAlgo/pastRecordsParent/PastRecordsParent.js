import React, {
    useEffect, useState
} from "react";
// import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
// import {
//     setPastRecordsRender
// } from '../../customAlgoSlice';

export function PastRecordsParent(props) {

    // const dispatch = useDispatch();
    const algoSelected = props.algoSelected;
    const email = props.email;
    // const pastRecordsRender = useSelector((state) => state.customAlgo.pastRecordsRender);
    const postUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_algo_records';
    const [pastRecords, setPastRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (email !== undefined && algoSelected !== 'default') {
            const get_algo_records = async () => {
                setIsLoading(true);
                const response = await axios.post(postUrl, {
                    email: email,
                    algoSelected: algoSelected
                })
                // console.log('response ', response)

                // sort the records by start time, most recent first
                response.data.sort((a, b) => {
                    return b.startTime - a.startTime;
                })

                setPastRecords(response.data);
                setIsLoading(false);
            };
            get_algo_records();
        }

    }, [algoSelected, email])

    // useEffect(() => {
    //     if (pastRecordsRender) {
    //         console.log('rendering past records')
    //         const get_algo_records = async () => {
    //             setIsLoading(true);
    //             const response = await axios.post(postUrl, {
    //                 email,
    //                 algoSelected: algoSelected
    //             })
    //             console.log('response ', response)
    //             setPastRecords(response.data);
    //             setIsLoading(false);
    //         };
    //         get_algo_records();
    //         dispatch(setPastRecordsRender({ pastRecordsRender: false }));
    //     }
    // }, [dispatch, pastRecordsRender])

    return (
        // console.log('props are ', props, 'pastRecords are ', pastRecords, 'isLoading is ', isLoading),
        <div style={{
            display: (algoSelected === 'default' && email === undefined) ? 'none' : 'block'
        }}>
            <h2>
                Past Records
            </h2>
            {
                isLoading ? <div>Loading...</div> :
                    pastRecords.map((record, i) => {
                        let timeTaken = record.endTime - record.startTime;
                        return (
                            // console.log('record ', record),

                            <div key={i} className='record-card'>
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
                    })

            }
        </div>
    );
}