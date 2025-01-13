import { AreaCursoEnum } from "../enums/AreaCursoEnum";

export interface MaestriaRequest {
    nombre: string;
    objetivos: string;
    semestres: number;
    publico_objetivo: string;
    area: AreaCursoEnum;
    imagen_url?: string;
}