import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { NoticiaPagination } from "../../models/NoticiaPagination";
import { NoticiaService } from "../../services/NoticiaService";
import SearchBarComponent from "../../components/common/SearchBarComponent";
import PaginationComponent from "../../components/common/PaginationComponent";
import { Link } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import { TipoNoticiaEnum } from "../../models/enums/TipoNoticiaEnum";

const NoticiasPage = () => {
    const [noticias, setNoticias] = useState<NoticiaPagination>();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = () => {
        NoticiaService.list().then((noticias) => {
            setNoticias(noticias);
        });
    }

    const searchNoticias = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm) {
            fetchNoticias();
            return;
        }
        NoticiaService.search(searchTerm).then((noticias) => {
            setNoticias(noticias);
        });
    }

    const handlePageChange = (page: number) => {
        const url = noticias?.links.find((link) => link.label === page.toString())?.url;
        NoticiaService.getPageByUrl(url ?? "").then((noticias) => {
            setNoticias(noticias);
        });
    }

    return (<>
        <Typography as="h1" className="text-3xl font-bold text-center mb-3">
            Noticias
        </Typography>

        <SearchBarComponent setSearchTerm={setSearchTerm} onSubmit={searchNoticias}
            containerClassNames="mx-auto md:w-96 mb-8" />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {noticias?.data.map((noticia) => (
                <article key={noticia.slug} className="shadow-lg rounded-md w-full max-w-96 mx-auto overflow-hidden">
                    <Link to={noticia.tipo === TipoNoticiaEnum.ARTICULO? Routes.NOTICIAS.NOTICIA_PARAM(noticia.slug) : noticia.enlace_url!}>
                        <img src={import.meta.env.VITE_BASE_IMG_URL + noticia.icono_url} alt={noticia.titulo} className="w-full h-60 object-cover object-center" />
                        <div className="p-5">
                            <Typography as="h2" className="text-xl font-bold mb-2">{noticia.titulo}</Typography>
                            <Typography as="p" className="text-justify text-sm" color="gray">{noticia.descripcion}</Typography>
                        </div>
                    </Link>
                </article>
            ))}
            {!noticias?.data.length && searchTerm && <Typography as="p" className="text-center col-span-full">No se encontraron noticias</Typography>}
        </section>

        <div className="flex justify-center pt-5">
            <PaginationComponent pages={noticias?.last_page ?? 0}
                currentPage={noticias?.current_page ?? 0} changePage={handlePageChange} />
        </div>
    </>);
}

export default NoticiasPage;