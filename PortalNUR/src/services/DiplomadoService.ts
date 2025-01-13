import { Curso } from "../models/Curso";
import { DiplomadoRequest } from "../models/requests/DiplomadoRequest";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const DiplomadoService = {
    list: () => {
        return new Promise<Curso[]>((resolve, reject) => {
            publicApi.get('diplomados')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (slug: string) => {
        return new Promise<Curso>((resolve, reject) => {
            publicApi.get(`diplomados/${slug}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (data: DiplomadoRequest) => {
        return new Promise<Curso>((resolve, reject) => {
            privateApi.post('diplomados', data)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (slug: string, data: DiplomadoRequest) => {
        return new Promise<Curso>((resolve, reject) => {
            privateApi.put(`diplomados/${slug}`, data)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (slug: string) => {
        return new Promise<void>((resolve, reject) => {
            privateApi.delete(`diplomados/${slug}`)
                .then(() => resolve())
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}