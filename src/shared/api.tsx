import axios from "axios";

export const baseURL = 'https://mysterious-escarpment-41897.herokuapp.com/';

const instance = axios.create({
    baseURL: baseURL
})

export default instance;