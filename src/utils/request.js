import axios from "axios";
import { API_ENDPOINT } from "../config/api";
import * as Storage from '../utils/storage';
import { storageKeys } from "../constants/storage";
import { encryptParams } from "./string";

const instance = axios.create({
    baseURL: API_ENDPOINT,
    transformRequest: [data => JSON.stringify(encryptParams(data))]
});

instance.interceptors.request.use(
    async config => {
        config.headers = {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "*/*",
        };

        const user = Storage.getString(storageKeys.USER);
        if (user) {
            config.headers.authorization = `${user}`;
        }
        return config;
    },
    err => Promise.reject(err)
);

instance.interceptors.response.use(
    response => response,
    error => {
        const response = error.response;
        // if ((response.data.message === "Invalid or Expired Token; Please login again" && response.status === 401) ||
        //     (response.data.message ===  "Invalid tokens" && response.status === 401)
        // ) 
        // {
        //     localStorage.removeItem(storageKeys.TOKEN)
        //     localStorage.removeItem(storageKeys.USER)
        //     window.location = "/login"
        // }
        return Promise.reject(error.response);
    }
);

export default instance;