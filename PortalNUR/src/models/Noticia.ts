import { ContenidoNoticia } from "./ContenidoNoticia";
import { TipoNoticiaEnum } from "./enums/TipoNoticiaEnum";

export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
    tipo: TipoNoticiaEnum;
    enlace_url?: string;
    icono_url?: string;
    icono?: File;
    slug?: string;
    contenidos?: ContenidoNoticia[];
}