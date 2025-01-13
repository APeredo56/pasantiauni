import { Departamento } from "./Departamento";

export interface Contacto{
    id?: number;
    nombre: string;
    correo: string;
    celular: string;
    fijo: string;
    cargo?: string;
    departamentos?: Departamento[];
}