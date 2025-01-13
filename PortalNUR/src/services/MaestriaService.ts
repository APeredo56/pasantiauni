import { Curso } from "../models/Curso";
import { MaestriaRequest } from "../models/requests/MaestriaRequest";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const MaestriaService = {
    list: () => {
        return new Promise<Curso[]>((resolve, reject) => {
            publicApi.get('maestrias')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (slug: string) => {
        return new Promise<Curso>((resolve, reject) => {
            publicApi.get(`maestrias/${slug}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (data: MaestriaRequest) => {
        return new Promise<Curso>((resolve, reject) => {
            privateApi.post('maestrias', data)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (slug: string, data: MaestriaRequest) => {
        return new Promise<Curso>((resolve, reject) => {
            privateApi.put(`maestrias/${slug}`, data)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (slug: string) => {
        return new Promise<void>((resolve, reject) => {
            privateApi.delete(`maestrias/${slug}`)
                .then(() => resolve())
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}