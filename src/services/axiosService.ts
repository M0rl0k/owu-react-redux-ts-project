import axios from "axios";

import {apiToken, baseURL} from "../constants";

const axiosService = axios.create({
    baseURL,
    headers: {
        'Authorization': apiToken
    }
})

export  {
    axiosService
}