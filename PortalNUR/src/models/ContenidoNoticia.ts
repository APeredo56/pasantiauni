import { TipoContenidoEnum } from "./enums/TipoContenidoEnum";

export interface ContenidoNoticia {
    id?: number;
    tipo: TipoContenidoEnum;
    contenido?: string;
    imageFile?: File;
    noticia_id?: number;
}