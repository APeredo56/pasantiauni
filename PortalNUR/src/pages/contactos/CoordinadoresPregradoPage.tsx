import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";
import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";

const CoordinadoresPregradoPage = () => {
    const [departamento, setDepartamento] = useState<Departamento>();

    useEffect(() => {
        fetchDepartamento();
    }, []);

    const fetchDepartamento = () => {
        ModuloService.getCoordinadoresPregrado().then((data) => {
            setDepartamento(data);
        });
    }

    return (<>
        <Typography as="h1" className="text-2xl font-bold text-center mb-3 uppercase">
            Coordinadores Pregrado
        </Typography>
        <section className="p-5 mb-5">
                <ul className='flex flex-wrap justify-center items-center p-10'>
                    {departamento?.contactos?.map((contacto) => (
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
            </section>
    </>);
}

export default CoordinadoresPregradoPage;