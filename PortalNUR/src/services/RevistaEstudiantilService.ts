import { RevistaEstudiantil } from "../models/RevistaEstudiantil";
import { MessageResponse } from "../models/responses/MessageResponse";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";

export const RevistaEstudiantilService = {
    list: () => {
        return new Promise<RevistaEstudiantil[]>((resolve, reject) => {
            privateApi.get('revista-estudiantil')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (slug: string) => {
        return new Promise<RevistaEstudiantil>((resolve, reject) => {
            privateApi.get(`revista-estudiantil/${slug}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (revista: RevistaEstudiantil) => {
        return new Promise<RevistaEstudiantil>((resolve, reject) => {
            privateApi.post('revista-estudiantil', revista)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (slug: string, revista: RevistaEstudiantil) => {
        return new Promise<RevistaEstudiantil>((resolve, reject) => {
            privateApi.put(`revista-estudiantil/${slug}`, revista)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (slug: string) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`revista-estudiantil/${slug}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    saveImage: (revistaSlug: string, image: File) => {
        const formData = new FormData();
        formData.append('imagen', image);
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`revista-estudiantil/${revistaSlug}/imagen`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    saveAutores: (revistaSlug: string, image: File) => {
        const formData = new FormData();
        formData.append('imagen', image);
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`revista-estudiantil/${revistaSlug}/autores`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    savePdf: (revistaSlug: string, pdf: File) => {
        const formData = new FormData();
        formData.append('pdf', pdf);
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`revista-estudiantil/${revistaSlug}/pdf`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
}