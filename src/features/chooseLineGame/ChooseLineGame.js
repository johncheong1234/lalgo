import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export function ChooseLineGame(){

    useEffect(() => {

        // get id from url
        const _id = window.location.pathname.split("/")[2];
        const postObj = {
            _id: _id
        }

        const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/lalgo-ubstj/endpoint/get_visualize_code_by_id";
        axios.post(url, postObj).then(
            (response) => {
                console.log(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
        
    },[])

    return(
        <div>
            <h1>Choose Line Game</h1>
        </div>
    )
}