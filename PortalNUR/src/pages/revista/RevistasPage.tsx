import { Typography } from "@material-tailwind/react"
import { useEffect, useState } from "react";
import { Routes } from "../../routes/CONSTANTS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";
import { RevistaEstudiantil } from "../../models/RevistaEstudiantil";
import { RevistaEstudiantilService } from "../../services/RevistaEstudiantilService";
import { Link } from "react-router-dom";

const RevistasPage = () => {
    const [revistas, setRevistas] = useState<RevistaEstudiantil[]>([]);
    const [departamento, setDepartamento] = useState<Departamento>();

    useEffect(() => {
        fetchRevistas();
        fetchDepartamento();
    }, []);

    const fetchRevistas = () => {
        RevistaEstudiantilService.list().then((data) => {
            setRevistas(data);
        });
    }

    const fetchDepartamento = () => {
        ModuloService.getRevista().then((data) => {
            setDepartamento(data);
        });
    }

    return (<>
        <header className="mb-5">
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/portada-revista-600x1060-1.jpg"
                alt="Arte Pregrado"
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                OIKONOMIA NUR – Revista Digital Estudiantil
            </Typography>
        </header>
        <section>
            <Typography as="p" className="text-justify mb-3">
                La universidad Núr, institución educativa boliviana, en base a su Principio Armonía Esencial
                entre Ciencia y Religión; promueve la formación integral académica de sus estudiantes,
                desarrollando distintas actividades. Una de estas actividades es la Revista Digital
                Estudiantil para impulsar la investigación que, respondiendo al objetivo del área se
                convierten en investigadores y plasman su trabajo en artículos elavorados por cada uno de
                los estudiantes de la materia de Macroeconomía I plasmados en una revista cientifica.
            </Typography>
            <Typography as="p" className="text-justify mb-3">
                En cada una de sus páginas encontraran importante información socioeconómica
                desarrolladas por los estudiantes, respondiendo en forma creativa al reto de
                investigar y escribir un artículo de interés de toda la comunidad universitaria de la
                cual formamos parte y de la propia sociedad civil.
            </Typography>
            <Typography as="p" className="text-justify mb-3">
                Las investigaciones realizadas, brindan sus aportes a la disciplina y a la comunidad Núr,
                labor apoyada por nuestros/as queridas/os docentes de Economía, quienes otorgan asesoría
                o consultoría con un enfoque innovador en cada trabajo.
            </Typography>
            <Typography as="p" className="text-justify">
                Para finalizar solo quiero felicitar a cada uno de los estudiantes y docentes por el
                trabajo investigativo ya desarrollado y los invito a continuar de manera permanente
                en este camino de la investigación, cuyo producto final serán artículos orientados a
                reforzar el conocimiento académico.
            </Typography>
        </section>
        <hr className="border-t-2 border-black my-5" />
        <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
            AQUÍ TE DEJAMOS LAS INVESTIGACIONES
        </Typography>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {revistas.map((revista) => (
                <article key={revista.slug} className="w-full max-w-96 mx-auto">
                    <Link to={Routes.REVISTAS.REVISTA_PARAM(revista.slug)}>
                        <img src={import.meta.env.VITE_BASE_IMG_URL + revista.icono_url} alt={revista.titulo} className="w-full aspect-video object-cover object-center mb-2" />
                        <Typography as="h2" className="text-xl font-bold mb-2">{revista.titulo}</Typography>
                    </Link>
                </article>
            ))}
        </section>
        <hr className="border-t-2 border-black my-5" />

        <section>
            <div className='flex flex-wrap justify-center gap-5 sm:divide-x-4 sm:divide-solid'>
                {departamento?.contactos?.map((contacto) => (
                    <ul className='max-w-96 justify-items-center p-10' key={contacto.id}>
                        <li><FontAwesomeIcon icon={faAddressBook} className="h-8 w-8 mb-10 text-primary" /></li>
                        <li className='flex place-items-center'>
                            <Typography as="h4" className="text-2xl font-bold text-center">
                                {contacto.cargo}
                            </Typography>
                        </li>
                        <li className='flex place-items-center'>
                            <FontAwesomeIcon icon={faIdBadge} className="h-5 w-5 me-3 text-primary" />
                            <Typography as="p" className="text-center">
                                {contacto.nombre}
                            </Typography>
                        </li>
                        <li className='flex place-items-center'>
                            <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                            <Typography as="p" className="text-center">
                                {contacto.correo}
                            </Typography>
                        </li>
                        <li className='flex place-items-center'>
                            <FontAwesomeIcon icon={faWhatsappSquare} className="h-5 w-5 me-3 text-primary" />
                            <Typography as="p" className="text-center">
                                {contacto.celular}
                            </Typography>
                        </li>
                        <li className='flex place-items-center'>
                            <FontAwesomeIcon icon={faPhoneVolume} className="h-5 w-5 me-3 text-primary" />
                            <Typography as="p" className="text-center">
                                {contacto.fijo}
                            </Typography>
                        </li>
                    </ul>
                ))}
            </div>
        </section>
    </>);
}

export default RevistasPage;