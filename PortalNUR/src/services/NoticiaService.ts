import { ContenidoNoticia } from "../models/ContenidoNoticia";
import { Noticia } from "../models/Noticia";
import { NoticiaPagination } from "../models/NoticiaPagination";
import { MessageResponse } from "../models/responses/MessageResponse";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import publicApi from "./axiosInstances/publicApi";

export const NoticiaService = {
    list: () => {
        return new Promise<NoticiaPagination>((resolve, reject) => {
            publicApi.get('noticias')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (slug: string) => {
        return new Promise<Noticia>((resolve, reject) => {
            publicApi.get(`noticias/${slug}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (noticia: Noticia) => {
        return new Promise<Noticia>((resolve, reject) => {
            privateApi.post('noticias', noticia)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (slug: string, noticia: Noticia) => {
        return new Promise<Noticia>((resolve, reject) => {
            privateApi.put(`noticias/${slug}`, noticia)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (slug: string) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`noticias/${slug}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    search: (term: string) => {
        return new Promise<NoticiaPagination>((resolve, reject) => {
            publicApi.get(`noticias/buscar/${term}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    getPageByUrl: (url: string) => {
        return new Promise<NoticiaPagination>((resolve, reject) => {
            privateApi.get(url)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    saveImage: (noticiaSlug: string, image: File) => {
        const formData = new FormData();
        formData.append('imagen', image);
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`noticias/${noticiaSlug}/imagen`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    createContenido: (contenido: ContenidoNoticia) => {
        return new Promise<ContenidoNoticia>((resolve, reject) => {
            privateApi.post(`noticias/contenido`, contenido)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    updateContenido: (contenidoId: number, contenido: ContenidoNoticia) => {
        return new Promise<ContenidoNoticia>((resolve, reject) => {
            privateApi.put(`noticias/contenido/${contenidoId}`, contenido)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    deleteContenido: (contenidoId: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`noticias/contenido/${contenidoId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    saveImageContenido: (contenidoId: number, image: File) => {
        const formData = new FormData();
        formData.append('imagen', image);
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post(`noticias/contenido/${contenidoId}/imagen`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    }
}