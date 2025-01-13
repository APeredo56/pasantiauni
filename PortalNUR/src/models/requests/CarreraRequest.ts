import { AreaCursoEnum } from "../enums/AreaCursoEnum";

export interface CarreraRequest {
    nombre: string;
    objetivos: string;
    semestres: number;
    caracteristicas: string;
    perfil_profesional: string;
    introduccion: string;
    campo_laboral: string;
    porque_estudiar: string;
    area: AreaCursoEnum;
    imagen_url?: string;
}