import { TipoCertificacionEnum } from "./enums/TipoCertificacionEnum";

export interface Certificacion {
    id?: number;
    tipo: TipoCertificacionEnum;
    titulo: string;
    carrera_id: number;
}