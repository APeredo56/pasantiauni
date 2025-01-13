import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Departamento } from "../../models/Departamento";
import { DepartamentoService } from "../../services/DepartamentoService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { Routes } from "../../routes/CONSTANTS";

const ContactosPage = () => {
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    useEffect(() => {
        fetchDepartamentos();
    }, []);

    const fetchDepartamentos = () => {
        DepartamentoService.list().then((departamentos) => {
            setDepartamentos(departamentos);
        });
    };
    return (<>
        <Typography as="h1" className="text-3xl font-bold text-center mb-5">
            Contactos
        </Typography>

        <section className="shadow-md bg-gray-100 p-5 mb-5 border border-gray-200">
            <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                Número Piloto Nur
            </Typography>
            <article className="justify-items-center p-10">
                <Typography as="p" className="text-center">
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                    info@nur.edu
                </Typography>
                <Typography as="p" className="text-center">
                    <FontAwesomeIcon icon={faPhoneVolume} className="h-5 w-5 me-3 text-primary" />
                    33363939
                </Typography>
                <Typography as="p" className="text-center">
                    <FontAwesomeIcon icon={faPhoneVolume} className="h-5 w-5 me-3 text-primary" />
                    33630500
                </Typography>
            </article>
            <hr className="border-t-2 border-black mb-5" />
        </section>

        {departamentos.map((departamento) => (
            <section className="shadow-md bg-gray-100 p-5 mb-5 border border-gray-200" key={departamento.id}>
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    {departamento.nombre}
                </Typography>
                <ul className='flex flex-wrap justify-center items-center p-10'>
                    {departamento.contactos?.map((contacto) => (
                        <li className='max-w-96' key={contacto.id}>
                            <article className="justify-items-center p-10">
                                <FontAwesomeIcon icon={faAddressBook} className="h-8 w-8 mb-10 text-primary" />
                                <Typography as="h2" className="text-2xl font-bold text-center mb-3">
                                    {contacto.cargo}
                                </Typography>
                                <Typography as="p" className="text-center">
                                    <FontAwesomeIcon icon={faIdBadge} className="h-5 w-5 me-3 text-primary" />
                                    {contacto.nombre}
                                </Typography>
                                <Typography as="p" className="text-center">
                                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                                    {contacto.correo}
                                </Typography>
                                <Typography as="p" className="text-center">
                                    <FontAwesomeIcon icon={faWhatsappSquare} className="h-5 w-5 me-3 text-primary" />
                                    {contacto.celular}
                                </Typography>
                                <Typography as="p" className="text-center">
                                    <FontAwesomeIcon icon={faPhoneVolume} className="h-5 w-5 me-3 text-primary" />
                                    {contacto.fijo}
                                </Typography>
                            </article>
                        </li>
                    ))}
                </ul>
                <hr className="border-t-2 border-black mb-5" />
            </section>))}

        <section className="shadow-md bg-gray-100 p-5 mb-5 border border-gray-200">
            <article className="justify-items-center p-10">
                <FontAwesomeIcon icon={faAddressBook} className="h-8 w-8 mb-10 text-primary" />
                <Typography as="h2" className="text-2xl font-bold text-center mb-3 uppercase">
                    Coordinadores Pregrado
                </Typography>
                <a href={Routes.CONTACTOS.COORDINADORES_PREGRADO} className="flex rounded-full w-fit mx-auto p-3 px-5 my-5 bg-link text-white text-md uppercase">
                    Lista de coordinadores
                </a>
            </article>
        </section>
    </>);
}

export default ContactosPage;