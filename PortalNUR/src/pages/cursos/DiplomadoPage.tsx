import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Curso } from '../../models/Curso';
import { AreaCursoEnum } from '../../models/enums/AreaCursoEnum';
import { Typography } from '@material-tailwind/react';
import { Pensum } from '../../models/Pensum';
import { CursoService } from '../../services/CursoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { DiplomadoService } from '../../services/DiplomadoService';

const defaultCurso: Curso = {
    id: 0,
    nombre: 'Cargando...',
    objetivos: '',
    area: AreaCursoEnum.UNSET,
    semestres: 0,
    slug: '',
}

const DiplomadoPage = () => {
    const [diplomado, setDiplomado] = useState<Curso>(defaultCurso);
    const [pensum, setPensum] = useState<Pensum>([]);
    const { slug } = useParams();

    useEffect(() => {
        if (!slug) return;
        DiplomadoService.get(slug).then((data) => {
            setDiplomado(data);
        });
        CursoService.getPensum(slug).then((data) => {
            setPensum(data);
        });
    }, [slug]);

    return (<>
        <header className="mb-5">
            <img
                className={`mx-auto w-full aspect-video object-cover object-center mb-5 ${diplomado.imagen_url ? '' : 'invisible'}`}
                src={import.meta.env.VITE_BASE_IMG_URL + diplomado.imagen_url}
                alt={diplomado.nombre}
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                {diplomado.nombre}
            </Typography>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center mb-5">
            <div className="p-5 max-w-96 xl:max-w-[30vw] shadow-md rounded-md">
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/objetivo-100x100.png"
                    alt="Objetivos"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Objetivos
                </Typography>
                <Typography as="p" className="text-justify">
                    {diplomado.objetivos}
                </Typography>
            </div>
            <div className="p-5 max-w-96 xl:max-w-[30vw] shadow-md rounded-md">
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/introduccion-100x100.png"
                    alt="Publico Objetivo"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Dirigido a
                </Typography>
                <Typography as="p" className="text-justify">
                    {diplomado.diplomado?.publico_objetivo ?? ""}
                </Typography>
            </div>
        </section>

        <section className="shadow-md bg-gray-200 p-5 mb-5">
            <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                Contenido
            </Typography>
            <hr className="border-t-2 border-black mb-5 w-48 mx-auto" />
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
                {pensum.map((semestre) => (
                    <li key={semestre.semestre}>
                        <Typography as="h3" className="text-lg font-bold mb-1">
                            Módulo {semestre.semestre}
                        </Typography>
                        {semestre.materias.map((materia) => (
                            <Typography as="p" className="text-md" key={materia.id}>
                                {materia.nombre}
                            </Typography>
                        ))}
                    </li>
                ))}
            </ul>
        </section>

        <section className='flex flex-wrap justify-center gap-5 sm:divide-x-4 sm:divide-solid'>
            {diplomado.contactos?.map((contacto) => (
                <ul className='max-w-96 justify-items-center p-10' key={contacto.id}>
                    <li><FontAwesomeIcon icon={faAddressBook} className="h-8 w-8 mb-10 text-primary" /></li>
                    <li className='flex place-items-center'>
                        <Typography as="h2" className="text-2xl font-bold text-center">
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
        </section>
    </>);
}

export default DiplomadoPage;