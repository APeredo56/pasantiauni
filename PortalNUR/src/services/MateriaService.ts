import { Materia } from "../models/Materia";
import { MessageResponse } from "../models/responses/MessageResponse";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";

export const MateriaService = {
    list: () => {
        return new Promise<Materia[]>((resolve, reject) => {
            privateApi.get('materias')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (id: number) => {
        return new Promise<Materia>((resolve, reject) => {
            privateApi.get(`materias/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (materia: Materia) => {
        return new Promise<Materia>((resolve, reject) => {
            privateApi.post('materias', materia)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (id: number, materia: Materia) => {
        return new Promise<Materia>((resolve, reject) => {
            privateApi.put(`materias/${id}`, materia)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (id: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`materias/${id}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}