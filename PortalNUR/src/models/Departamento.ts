import { Contacto } from "./Contacto";

export interface Departamento {
    id?: number;
    nombre: string;
    cargo?: string;
    contactos?: Contacto[];
}