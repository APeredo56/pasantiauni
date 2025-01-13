import { Contacto } from "../models/Contacto";
import { MessageResponse } from "../models/responses/MessageResponse";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const ContactoService = {
    list: () => {
        return new Promise<Contacto[]>((resolve, reject) => {
            publicApi.get('contactos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (id: number) => {
        return new Promise<Contacto>((resolve, reject) => {
            privateApi.get(`contactos/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (contacto: Contacto) => {
        return new Promise<Contacto>((resolve, reject) => {
            privateApi.post('contactos', contacto)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (id: number, contacto: Contacto) => {
        return new Promise<Contacto>((resolve, reject) => {
            privateApi.put(`contactos/${id}`, contacto)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (id: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`contactos/${id}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    assignDepartamento: (contactoId: number, departamentoId: number, cargo: string) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`contactos/${contactoId}/departamentos/${departamentoId}`, { cargo })
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    unassignDepartamento: (contactoId: number, departamentoId: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`contactos/${contactoId}/departamentos/${departamentoId}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    }
}