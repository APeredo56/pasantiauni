import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Noticia } from "../../models/Noticia";
import { TipoNoticiaEnum } from "../../models/enums/TipoNoticiaEnum";
import { NoticiaService } from "../../services/NoticiaService";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TipoContenidoEnum } from "../../models/enums/TipoContenidoEnum";

const defaultNoticia: Noticia = {
    id: 0,
    titulo: 'Cargando...',
    descripcion: '',
    tipo: TipoNoticiaEnum.UNSET,
    slug: '',
}

const NoticiaDetailPage = () => {
    const [noticia, setNoticia] = useState<Noticia>(defaultNoticia);
    const { slug } = useParams();

    useEffect(() => {
        if (!slug) return;
        NoticiaService.get(slug).then((data) => {
            setNoticia(data);
        });
    }, [slug]);

    return (<>
        <header className="mb-5">
            <img
                className={`mx-auto w-full aspect-video object-cover object-center mb-5 ${noticia.icono_url ? '' : 'invisible'}`}
                src={import.meta.env.VITE_BASE_IMG_URL + noticia.icono_url}
                alt={noticia.titulo}
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                {noticia.titulo}
            </Typography>
        </header>
        {noticia.contenidos?.map((contenido) => {
            const markdownLines = contenido.contenido?.replace(/<br\s*\/?>/g, "\n").split("\n") ?? [];
            return (
                <section key={contenido.id} className="markdown-container gap-3 flex flex-col mb-3">
                    {contenido.tipo === TipoContenidoEnum.TEXTO ? markdownLines.map((line, index) => (
                        <ReactMarkdown key={"line-" + index} remarkPlugins={[remarkGfm]}>
                            {line}
                        </ReactMarkdown>
                    )) :
                        <img src={import.meta.env.VITE_BASE_IMG_URL + contenido.contenido}
                            alt={noticia.titulo} className="mx-auto max-w-[40rem] w-full" />}
                </section>
            )
        })}
    </>);
}

export default NoticiaDetailPage;