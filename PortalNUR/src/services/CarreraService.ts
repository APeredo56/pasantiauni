import { Curso } from "../models/Curso";
import { CarreraRequest } from "../models/requests/CarreraRequest";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const CarreraService = {
    list: () => {
        return new Promise<Curso[]>((resolve, reject) => {
            publicApi.get('carreras')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (slug: string) => {
        return new Promise<Curso>((resolve, reject) => {
            publicApi.get(`carreras/${slug}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (data: CarreraRequest) => {
        return new Promise<Curso>((resolve, reject) => {
            privateApi.post('carreras', data)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (slug: string, data: CarreraRequest) => {
        return new Promise<Curso>((resolve, reject) => {
            privateApi.put(`carreras/${slug}`, data)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (slug: string) => {
        return new Promise<void>((resolve, reject) => {
            privateApi.delete(`carreras/${slug}`)
                .then(() => resolve())
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}