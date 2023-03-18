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
                console.log('response ', response)
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
        <div>
            <h2>
                Past Records
            </h2>
            {
                isLoading ? <div>Loading...</div> :
                    pastRecords.map((record, i) => {
                        return (
                            // console.log('record ', record),
                            <div key={i}>
                                <p>
                                    {record.startTime}
                                </p>
                                <p>
                                    {record.endTime}
                                </p>
                            </div>
                        )
                    })

            }
        </div>
    );
}