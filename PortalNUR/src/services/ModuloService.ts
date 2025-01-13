import { Departamento } from "../models/Departamento";
import { Modulo } from "../models/Modulo";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const ModuloService = {
    list: () => {
        return new Promise<Modulo[]>((resolve, reject) => {
            privateApi.get('modulos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getPostgrado: () => {
        return new Promise<Departamento>((resolve, reject) => {
            publicApi.get('modulos/postgrado/departamentos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getPregrado: () => {
        return new Promise<Departamento>((resolve, reject) => {
            publicApi.get('modulos/pregrado/departamentos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getIdiomas: () => {
        return new Promise<Departamento>((resolve, reject) => {
            publicApi.get('modulos/idiomas/departamentos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getCoordinadoresPregrado: () => {
        return new Promise<Departamento>((resolve, reject) => {
            publicApi.get('modulos/coordinadores-pregrado/departamentos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getRevista: () => {
        return new Promise<Departamento>((resolve, reject) => {
            publicApi.get('modulos/revista-estudiantil/departamentos')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    assignDepartamento: (moduloId: number, departamentoId: number) => {
        return new Promise<Modulo>((resolve, reject) => {
            privateApi.post(`/modulos/${moduloId}/departamentos/${departamentoId}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}