import { Carrera } from "./Carrera";
import { Contacto } from "./Contacto";
import { Diplomado } from "./Diplomado";
import { AreaCursoEnum } from "./enums/AreaCursoEnum";
import { Maestria } from "./Maestria";

export interface Curso {
    id?: number;
    nombre: string;
    imagen_url?: string;
    area: AreaCursoEnum;
    objetivos: string;
    semestres: number;
    slug: string;
    carrera?: Carrera;
    maestria?: Maestria;
    diplomado?: Diplomado;
    contactos?: Contacto[];
}