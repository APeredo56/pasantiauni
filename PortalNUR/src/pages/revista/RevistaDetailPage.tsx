import { useEffect, useState } from "react";
import { RevistaEstudiantil } from "../../models/RevistaEstudiantil";
import { RevistaEstudiantilService } from "../../services/RevistaEstudiantilService";
import { useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const RevistaDetailPage = () => {
    const [revista, setrevista] = useState<RevistaEstudiantil>({
        titulo: "Cargando...",
        subtitulo: "",
        introduccion: "",
        descripcion: "",
    });
    const { slug } = useParams();

    useEffect(() => {
        fetchRevista();
    }, []);

    const fetchRevista = () => {
        if (!slug) return
        RevistaEstudiantilService.get(slug).then((revista) => {
            setrevista(revista);
        });
    }

    return (<>
        <Typography as="h1" className="text-3xl font-bold text-center mb-5">
            {revista.titulo}
        </Typography>
        <Typography as="p" className="text-justify mb-3">
            {revista.introduccion}
        </Typography>
        <hr className="border-t-2 border-black my-5" />
        <section className="mb-3">
            {revista.pdf_url && <object data={import.meta.env.VITE_BASE_IMG_URL + revista.pdf_url}
                className="max-w-[40rem] w-full aspect-[2/3] mx-auto" type="application/pdf">
                <p>Ocurrio un error al visualizar el pdf, <a className="text-blue-500"
                    href={import.meta.env.VITE_BASE_IMG_URL + revista.pdf_url}> descarguelo aquí</a>
                </p>
            </object>}
        </section>
        <hr className="border-t-2 border-black my-5" />
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <img src={import.meta.env.VITE_BASE_IMG_URL + revista.autores_url} alt={revista.titulo}
                className={"w-full max-w-[80%] mx-auto object-cover object-center mb-2" + (revista.icono_url ? "" : " invisible")} />
            <div className="p-5 flex flex-col items-center justify-center">
                <Typography as="h2" className="text-2xl font-bold mb-2">{revista.subtitulo}</Typography>
                <Typography as="p" className="text-lg mb-2 text-justify" color="blue-gray">{revista.descripcion}</Typography>

            </div>
        </section>
    </>);
}

export default RevistaDetailPage;