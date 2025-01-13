import { Typography } from "@material-tailwind/react"
import { AreaCursoEnum } from "../../models/enums/AreaCursoEnum";
import React, { useEffect, useState } from "react";
import { Curso } from "../../models/Curso";
import { CarreraService } from "../../services/CarreraService";
import { Routes } from "../../routes/CONSTANTS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";

const PregradoPage = () => {
    const [carreras, setCarreras] = useState<Curso[]>([]);
    const [departamento, setDepartamento] = useState<Departamento>();

    const areas = Object.values(AreaCursoEnum).filter((area) => area !== AreaCursoEnum.UNSET);
    const baseImgUrl = import.meta.env.VITE_BASE_IMG_URL;

    useEffect(() => {
        fetchCarreras();
        fetchDepartamento();
    }, []);

    const fetchCarreras = () => {
        CarreraService.list().then((data) => {
            setCarreras(data);
        });
    }

    const fetchDepartamento = () => {
        ModuloService.getPregrado().then((data) => {
            setDepartamento(data);
        });
    }

    return (<>
        <header className="mb-5">
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/pregrado/arte-pregrado.jpg"
                alt="Arte Pregrado"
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                Pregrado
            </Typography>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 justify-items-center">
            <img
                className="mx-auto lg:h-80 w- object-cover object-center mb-5"
                src="/images/pregrado/arte-presencial.jpg"
                alt="Arte Presencial"
            />
            <div className="p-5 flex flex-col items-center justify-center max-w-96">
                <Typography as="h2" className="text-2xl font-bold mb-3">
                    Presencial
                </Typography>
                <Typography as="p" className="text-justify">
                    En Pregrado tenemos la modalidad presencial, es un etapa universitaria de lunes a
                    viernes, está planificada para potenciar y enriquecer tus conocimientos, de manera
                    efectiva.
                </Typography>
            </div>
        </section>
        <hr className="border-t-2 border-black my-5" />
        <section className="grid grid-cols-1 sm:grid-cols-2 justify-items-center">
            <div className="p-5 flex flex-col items-center justify-center max-w-96">
                <Typography as="h2" className="text-2xl font-bold mb-3">
                    Semipresencial
                </Typography>
                <Typography as="p" className="text-justify">
                    Ofrecemos un sistema de educación a distancia para pregrado, donde tu puedes
                    organizarte según tu agenda, necesidades y responsabilidades, el tiempo dedicado
                    al estudio, a través de este sistema de aprendizaje que combina el uso de plataforma
                    virtual y clases presenciales en aulas.
                </Typography>
            </div>
            <img
                className="mx-auto lg:h-80 w- object-cover object-center mb-5"
                src="/images/pregrado/arte-semipresencial.jpg"
                alt="Arte Presencial"
            />
        </section>
        <hr className="border-t-2 border-black my-5" />
        <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
            Nuestras Carreras a Nivel Licenciatura
        </Typography>
        {areas.map((area) => {
            const filteredCarreras = carreras.filter((carrera) => carrera.area === area);
            return filteredCarreras.length > 0 ? (
                <React.Fragment key={area}>
                    <section className="mb-5">
                        <Typography as="h2" className="text-2xl font-bold mb-3">
                            {area}
                        </Typography>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-3">
                            {filteredCarreras.map((carrera) => {
                                return (
                                    <a key={carrera.id} href={Routes.CURSOS.PREGRADO.CARRERA_PARAM(carrera.slug)}>
                                        <img
                                            className="w-full aspect-video object-cover object-center"
                                            src={baseImgUrl + carrera.imagen_url}
                                            alt={carrera.nombre}
                                        />
                                        <Typography as="h3" className="text-md">
                                            {carrera.nombre}
                                        </Typography>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                    <hr className="border-t-2 border-black my-5" />
                </React.Fragment>
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

export default PregradoPage;