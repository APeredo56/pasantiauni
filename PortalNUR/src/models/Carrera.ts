import { Certificacion } from "./Certificacion";

export interface Carrera {
    id?: number;
    introduccion: string;
    caracteristicas: string;
    perfil_profesional: string;
    campo_laboral: string;
    complementario: string;
    porque_estudiar: string;
    curso_id: number;
    slug: string;
    certificaciones?: Certificacion[];
}