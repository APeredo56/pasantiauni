import { Departamento } from "./Departamento";

export interface Modulo {
    id: number;
    nombre: string;
    departamentos?: Departamento[];
}