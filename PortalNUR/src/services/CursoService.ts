import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";
import { MessageResponse } from "../models/responses/MessageResponse";
import { Pensum } from "../models/Pensum";
import { Curso } from "../models/Curso";
import { AssignMateriaRequest } from "../models/requests/AssignMateriaRequest";

export const CursoService = {
    get: (cursoSlug: string) => {
        return new Promise<Curso>((resolve, reject) => {
            publicApi.get(`cursos/${cursoSlug}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)));
        })
    },
    saveImage: (cursoSlug: string, image: File) => {
        const formData = new FormData();
        formData.append('imagen', image);
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`cursos/${cursoSlug}/imagen`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getPensum: (cursoSlug: string) => {
        return new Promise<Pensum>((resolve, reject) => {
            publicApi.get(`cursos/${cursoSlug}/pensum`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    assignMaterias: (cursoSlug: string, semestre: AssignMateriaRequest) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`cursos/${cursoSlug}/materias`, semestre)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    assignContacto: (cursoSlug: string, contactoId: number, cargo: string)=>{
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`cursos/${cursoSlug}/contactos/${contactoId}`, {cargo})
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    unassignContacto: (cursoSlug: string, contactoId: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`cursos/${cursoSlug}/contactos/${contactoId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    }
}