import { Typography } from "@material-tailwind/react"
import { Routes } from "../../routes/CONSTANTS";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";

const IdiomasPage = () => {
    const [departamento, setDepartamento] = useState<Departamento>();

    useEffect(() => {
        fetchDepartamento();
    }, []); 

    const fetchDepartamento = () => {
        ModuloService.getIdiomas().then((data) => {
            setDepartamento(data);
        });
    }

    return (<>
        <header className="mb-5">
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/idiomas/arte-IDIOMAS-1100X400-OK.jpg"
                alt="Arte Postgrado"
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                Centro de Idiomas Nur
            </Typography>
        </header>
        <section className="mb-5 grid grid-cols-1 sm:grid-cols-2">
            <article>
                <Link to={Routes.IDIOMAS.INGLES}>
                    <img
                        className="mx-auto h-48 lg:h-80 object-cover object-center mb-5"
                        src="/images/idiomas/INGLES-LINK.jpg"
                        alt="CIN Ingles NUR"
                    />
                </Link>
                <Typography as="h2" className="text-2xl font-bold text-center mb-5">
                    Inglés
                </Typography>
                <Link to={Routes.IDIOMAS.INGLES} className="block bg-secondary text-white py-2 px-4 rounded-md w-fit mx-auto">
                    Más información
                </Link>
            </article>
            <article>
                <Link to={Routes.IDIOMAS.PORTUGUES}>
                    <img
                        className="mx-auto h-48 lg:h-80 object-cover object-center mb-5"
                        src="/images/idiomas/PORTUGUES-LINK.jpg"
                        alt="CIN Portugues NUR"
                    />
                </Link>
                <Typography as="h2" className="text-2xl font-bold text-center mb-5">
                    Portugués
                </Typography>
                <Link to={Routes.IDIOMAS.PORTUGUES} className="block bg-secondary text-white py-2 px-4 rounded-md w-fit mx-auto">
                    Más información
                </Link>
            </article>
        </section>
        <section className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 grid-flow-row-dense">
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/idiomas/ENGLISH-SCORE-EXAMEN-web-2-960x960.jpg"
                alt="Certificación internacional English Score"
            />
            <div className="md:col-span-2 lg:col-span-1">
                <Typography as="h3" className="text-xl font-bold text-center mb-5">
                    Requisitos:
                </Typography>
                <Typography as="p" className="text-md text-center mb-5 text-justify">
                    <strong className="font-bold">Fotocopia de Carnet de Identidad (Boliviano):</strong> Asegúrate 
                    de proporcionar una copia legible de tu carnet de identidad boliviano. Este 
                    documento es esencial para procesar tu inscripción y mantener un registro preciso 
                    de nuestros estudiantes.
                </Typography>
                <Typography as="p" className="text-md text-center mb-5 text-justify">
                    <strong className="font-bold">Edad Mínima de Ingreso: 14 años:</strong> En el Centro 
                    Internacional de Idiomas Nur, damos la bienvenida a estudiantes a partir de los 14 
                    años. Creemos que el aprendizaje de idiomas es una experiencia enriquecedora que 
                    puede comenzar a una edad temprana, brindando oportunidades valiosas para el 
                    desarrollo personal y académico.
                </Typography>
            </div>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/idiomas/ENGLISH-SCORE-EXAMEN-web-960x960.jpg"
                alt="Examen English Score"
            />
        </section>

        <hr className="border-t-2 border-black my-10 w-full" />

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

export default IdiomasPage;