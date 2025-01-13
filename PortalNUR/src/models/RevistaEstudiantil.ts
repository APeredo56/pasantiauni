export interface RevistaEstudiantil {
    id? : number;
    titulo: string;
    introduccion: string;
    subtitulo: string;
    descripcion: string;
    icono_url?: string;
    autores_url?: string;
    pdf_url?: string;
    slug?: string;
}