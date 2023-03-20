import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setSetSelected,
    setSetData,
    setSetNames
} from './setSlice';

export function Set() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.userObject.email);
    const setNames = useSelector(state => state.set.setNames);
    const setSelected = useSelector(state => state.set.setSelected);

    useEffect(() => {
        // const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_all_algos";

        // const presetAlgos = axios.get(url, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // });

        // let objectToDispatch = {};


        // presetAlgos.then((response) => {
        //     for (let i = 0; i < response.data.length; i++) {
        //         objectToDispatch[response.data[i].algo.algoKey] = { algoCode: response.data[i].algo.algoCode, algoName: response.data[i].algo.algoName }
        //     }

        //     dispatch(setPresetAlgos({ presetAlgos: objectToDispatch }));
        // });

        dispatch(setSetNames({
            setNames: ['set1', 'set2']
        }));

    }, [])

    useEffect(() => {

        if (setSelected !== 'default') {
            const setData = {
                setName: setSelected,
                setQuestions: [
                    {
                        algoKey: 'bubbleSort',
                        repeats: 2,
                    },
                    { algoKey: 'mergeSort', repeats: 2 },
                ]
            }

            dispatch(setSetData({
                setData
            }))
        }

    }, [setSelected])

    function handleSelectSet(e) {
        dispatch(setSetSelected({
            setSelected: e.target.value
        }));
    }

    return (
        (email !== undefined) ?
            <div>
                <h2>Set Training</h2>
                <select onChange={handleSelectSet} value={setSelected}>
                    <option disabled value='default'>Select your set</option>
                    {
                        setNames.map((algoName, index) => {
                            return (
                                <option value={algoName} key={index}>{algoName}</option>
                            )
                        }
                        )
                    }
                </select>
            </div> : <div>
                <h1>Please login to access this page</h1>
            </div>
    )
}