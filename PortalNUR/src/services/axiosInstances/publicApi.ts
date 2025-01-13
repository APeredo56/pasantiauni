import axios from "axios";

const publicApi = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
});

export default publicApi;