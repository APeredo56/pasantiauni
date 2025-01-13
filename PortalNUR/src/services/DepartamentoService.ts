import { Departamento } from "../models/Departamento";
import { MessageResponse } from "../models/responses/MessageResponse";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const DepartamentoService = {
    list: () => {
        return new Promise<Departamento[]>((resolve, reject) => {
            publicApi.get('departamentos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (id: number) => {
        return new Promise<Departamento>((resolve, reject) => {
            privateApi.get(`departamentos/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (departamento: Departamento) => {
        return new Promise<Departamento>((resolve, reject) => {
            privateApi.post('departamentos', departamento)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (id: number, departamento: Departamento) => {
        return new Promise<Departamento>((resolve, reject) => {
            privateApi.put(`departamentos/${id}`, departamento)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (id: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`departamentos/${id}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}