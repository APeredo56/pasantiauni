import { Typography } from "@material-tailwind/react"
import { AreaCursoEnum } from "../../models/enums/AreaCursoEnum";
import { useEffect, useState } from "react";
import { MaestriaService } from "../../services/MaestriaService";
import { Curso } from "../../models/Curso";
import { DiplomadoService } from "../../services/DiplomadoService";
import { Routes } from "../../routes/CONSTANTS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";

const PostgradoPage = () => {
    const [maestrias, setMaestrias] = useState<Curso[]>([]);
    const [diplomados, setDiplomados] = useState<Curso[]>([]);
    const [departamento, setDepartamento] = useState<Departamento>();

    const areas = Object.values(AreaCursoEnum).filter((area) => area !== AreaCursoEnum.UNSET);
    const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;

    useEffect(() => {
        fetchMaestrias();
        fetchDiplomados();
        fetchDepartamento();
    }, []);

    const fetchMaestrias = () => {
        MaestriaService.list().then((data) => {
            setMaestrias(data);
        });
    }

    const fetchDiplomados = () => {
        DiplomadoService.list().then((data) => {
            setDiplomados(data);
        });
    }

    const fetchDepartamento = () => {
        ModuloService.getPostgrado().then((data) => {
            setDepartamento(data);
        });
    }

    return (<>
        <header>
            <img
                className="mx-auto h-48 lg:h-80 object-cover object-center mb-5"
                src="/images/postgrado/arte-posgrado-ok-1100X400.jpg"
                alt="Arte Postgrado"
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                Postgrado
            </Typography>
        </header>
        <hr className="border-t-2 border-black my-5" />
        {areas.map((area) => {
            const filteredMaestrias = maestrias.filter((maestria) => maestria.area === area);
            const filteredDiplomados = diplomados.filter((diplomado) => diplomado.area === area);
            return filteredMaestrias.length > 0 && filteredDiplomados.length > 0 ? (
                <>
                    <section key={area} className="mb-5">
                        <Typography as="h2" className="text-2xl font-bold mb-3">
                            {area}
                        </Typography>
                        {filteredMaestrias.length > 0 &&
                            <Typography as="h3" className="text-lg font-bold mb-1">
                                Maestrías
                            </Typography>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3">
                            {filteredMaestrias.map((maestria) => {
                                return (
                                    <a key={maestria.id} href={Routes.CURSOS.POSTGRADO.MAESTRIA_PARAM(maestria.slug)}>
                                        <img
                                            className="w-full aspect-video object-cover object-center"
                                            src={baseImgUrl + maestria.imagen_url}
                                            alt={maestria.nombre}
                                        />
                                        <Typography as="h3" className="text-md">
                                            {maestria.nombre}
                                        </Typography>
                                    </a>
                                );
                            })}
                        </div>
                        {filteredDiplomados.length > 0 &&
                            <Typography as="h3" className="text-lg font-bold mb-1">
                                Diplomados
                            </Typography>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3">
                            {diplomados.filter((diplomado) => diplomado.area === area).map((diplomado) => {
                                return (
                                    <a key={diplomado.id} href={Routes.CURSOS.POSTGRADO.DIPLOMADO_PARAM(diplomado.slug)}>
                                        <img
                                            className="w-full aspect-video object-cover object-center"
                                            src={baseImgUrl + diplomado.imagen_url}
                                            alt={diplomado.nombre}
                                        />
                                        <Typography as="h3" className="text-md">
                                            {diplomado.nombre}
                                        </Typography>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                    <hr className="border-t-2 border-black my-5" />
                </>
            ) : null;
        })}

        <section>
            <Typography as="h2" className="text-2xl font-bold text-center">
                {departamento?.nombre}
            </Typography>
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

export default PostgradoPage;