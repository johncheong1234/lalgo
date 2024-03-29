import React, {
    useEffect, useState
} from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {
    setPastRecords
} from './pastRecordsSlice';
import { Record } from './record/Record';

export function PastRecordsParent(props) {

    const dispatch = useDispatch();

    const algoSelected = props.algoSelected;
    const email = props.email;
    // const pastRecordsRender = useSelector((state) => state.customAlgo.pastRecordsRender);
    const postUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_algo_records';
    const pastRecords = useSelector((state) => state.pastRecords.pastRecords);
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

                dispatch(setPastRecords({
                    pastRecords: response.data
                }));
                setIsLoading(false);
            };
            get_algo_records();
        }

    }, [algoSelected, email])

    return (
        // console.log('props are ', props, 'pastRecords are ', pastRecords, 'isLoading is ', isLoading),
        <div style={{
            display: (algoSelected === 'default' || email === undefined) ? 'none' : 'block',
        }}>
            <h2>
                Past Records
            </h2>
            <div style={{
                overflowY: 'scroll',
                height: '100vh',
            }}>
                {
                    isLoading ? <div>Loading...</div> :

                        pastRecords.map((record, i) => {
                            return (
                                <Record key={i} record={record} />
                            )

                        })


                }
            </div>
        </div>
    );
}