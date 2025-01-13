import axios from "axios";
import { handleErrorResponse } from "../../utils/axiosUtils";
import { Routes } from "../../routes/CONSTANTS";

const privateApi = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    withXSRFToken: true,
    timeout: 5000,
});

privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        handleErrorResponse(error);
        if (error.response?.status === 401 || error.message === "No autenticado") {
            if (window.location.pathname !== Routes.ADMIN.LOGIN) {
                window.location.href = Routes.ADMIN.LOGIN;
            }
        }

        return Promise.reject(handleErrorResponse(error));
    });

export default privateApi;