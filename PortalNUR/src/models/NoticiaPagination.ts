import { Noticia } from "./Noticia";

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface NoticiaPagination {
    current_page: number;
    data: Noticia[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    total: number;
    per_page: number;
    prev_page_url: string;
    to: number;
    links: PaginationLink[];
}