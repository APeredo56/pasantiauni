import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Curso } from '../../models/Curso';
import { AreaCursoEnum } from '../../models/enums/AreaCursoEnum';
import { Accordion, AccordionBody, AccordionHeader, Typography } from '@material-tailwind/react';
import { Pensum } from '../../models/Pensum';
import { CursoService } from '../../services/CursoService';
import { semesterToText } from '../../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCaretRight, faEnvelope, faIdBadge, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { MaestriaService } from '../../services/MaestriaService';

const defaultCurso: Curso = {
    id: 0,
    nombre: 'Cargando...',
    objetivos: '',
    area: AreaCursoEnum.UNSET,
    semestres: 0,
    slug: '',
}

const MaestriaPage = () => {
    const [maestria, setMaestria] = useState<Curso>(defaultCurso);
    const [pensum, setPensum] = useState<Pensum>([]);
    const [openSemester, setOpenSemester] = useState(0);
    const { slug } = useParams();

    useEffect(() => {
        if (!slug) return;
        MaestriaService.get(slug).then((data) => {
            setMaestria(data);
        });
        CursoService.getPensum(slug).then((data) => {
            setPensum(data);
        });
    }, [slug]);

    const handleOpenSemester = (semester: number) => {
        setOpenSemester(openSemester === semester ? 0 : semester);
    };

    return (<>
        <header className="mb-5">
            <img
                className={`mx-auto w-full aspect-video object-cover object-center mb-5 ${maestria.imagen_url ? '' : 'invisible'}`}
                src={import.meta.env.VITE_BASE_IMG_URL + maestria.imagen_url}
                alt={maestria.nombre}
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                {maestria.nombre}
            </Typography>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center mb-5">
            <div className="p-5 max-w-96 shadow-md rounded-md">
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/objetivo-100x100.png"
                    alt="Objetivos"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Objetivos
                </Typography>
                <Typography as="p" className="text-justify">
                    {maestria.objetivos}
                </Typography>
            </div>
            <div className="p-5 max-w-96 shadow-md rounded-md">
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/introduccion-100x100.png"
                    alt="Publico objetivo"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Dirigido a
                </Typography>
                <Typography as="p" className="text-justify">
                    {maestria.maestria?.publico_objetivo ?? ""}
                </Typography>
            </div>
        </section>

        <section className="shadow-md bg-gray-200 p-5 mb-5">
            <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                Contenido
            </Typography>
            <hr className="border-t-2 border-black mb-5 w-48 mx-auto" />
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {pensum.map((semestre) => (
                    <li key={semestre.semestre}>
                        <Accordion open={semestre.semestre === openSemester}>
                            <AccordionHeader onClick={() => handleOpenSemester(semestre.semestre)}
                                className={`!justify-normal font-bold ${openSemester === semestre.semestre ? 'focus:text-blue-500' : 'text-black'}`}>
                                <FontAwesomeIcon icon={faCaretRight}
                                    className={`h-5 w-5 me-3 transition-transform ${openSemester === semestre.semestre ? "-rotate-90" : ""}`} />
                                {semesterToText(semestre.semestre)}
                            </AccordionHeader>
                            <AccordionBody>
                                <ul className='ps-10'>
                                    {semestre.materias.map((materia) => (
                                        <Typography as="li" key={materia.id} className="mb-1 text-black">
                                            {materia.nombre}
                                        </Typography>
                                    ))}
                                </ul>
                            </AccordionBody>
                        </Accordion>
                    </li>
                ))}
            </ol>
        </section>

        <section className='flex flex-wrap justify-center gap-5 sm:divide-x-4 sm:divide-solid'>
            {maestria.contactos?.map((contacto) => (
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

export default MaestriaPage;