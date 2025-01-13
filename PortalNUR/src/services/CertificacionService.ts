import { Certificacion } from "../models/Certificacion";
import { MessageResponse } from "../models/responses/MessageResponse";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";

export const CertificacionService = {
    list: () => {
        return new Promise<Certificacion[]>((resolve, reject) => {
            privateApi.get('certificaciones')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (id: number) => {
        return new Promise<Certificacion>((resolve, reject) => {
            privateApi.get(`certificaciones/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (certificacion: Certificacion) => {
        return new Promise<Certificacion>((resolve, reject) => {
            privateApi.post('certificaciones', certificacion)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (id: number, certificacion: Certificacion) => {
        return new Promise<Certificacion>((resolve, reject) => {
            privateApi.put(`certificaciones/${id}`, certificacion)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (id: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`certificaciones/${id}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}