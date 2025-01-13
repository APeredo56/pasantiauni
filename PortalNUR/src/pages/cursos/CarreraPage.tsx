import { useEffect, useState } from 'react';
import { CarreraService } from '../../services/CarreraService';
import { useParams } from 'react-router-dom';
import { Curso } from '../../models/Curso';
import { AreaCursoEnum } from '../../models/enums/AreaCursoEnum';
import { Accordion, AccordionBody, AccordionHeader, Typography } from '@material-tailwind/react';
import { Pensum } from '../../models/Pensum';
import { CursoService } from '../../services/CursoService';
import { semesterToText } from '../../utils/commonUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCaretRight, faEnvelope, faIdBadge, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { TipoCertificacionEnum } from '../../models/enums/TipoCertificacionEnum';

const defaultCarrera: Curso = {
    id: 0,
    nombre: 'Cargando...',
    objetivos: '',
    area: AreaCursoEnum.UNSET,
    semestres: 0,
    slug: '',
}

const CarreraPage = () => {
    const [carrera, setCarrera] = useState<Curso>(defaultCarrera);
    const [pensum, setPensum] = useState<Pensum>([]);
    const [openSemester, setOpenSemester] = useState(0);
    const [openCertificacion, setOpenCertificacion] = useState(0);
    const { slug } = useParams();

    useEffect(() => {
        if (!slug) return;
        CarreraService.get(slug).then((data) => {
            setCarrera(data);
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
                className={`mx-auto w-full aspect-video object-cover object-center mb-5 ${carrera.imagen_url ? '' : 'invisible'}`}
                src={import.meta.env.VITE_BASE_IMG_URL + carrera.imagen_url}
                alt={carrera.nombre}
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                {carrera.nombre}
            </Typography>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center mb-5">
            <div className="p-5 max-w-96 shadow-md rounded-md sm:col-span-2 lg:col-span-1">
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/introduccion-100x100.png"
                    alt="Introducción"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Introducción
                </Typography>
                <Typography as="p" className="text-justify">
                    {carrera.carrera?.introduccion ?? ""}
                </Typography>
            </div>
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
                    {carrera.objetivos}
                </Typography>
            </div>
            <div className="p-5 max-w-96 shadow-md rounded-md">
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/introduccion-100x100.png"
                    alt="Caracteristicas"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Características
                </Typography>
                <Typography as="p" className="text-justify">
                    {carrera.carrera?.caracteristicas ?? ""}
                </Typography>
            </div>
        </section>

        <section className="shadow-md bg-gray-200 p-5 mb-5">
            <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                Pensum
            </Typography>
            <hr className="border-t-2 border-black mb-5 w-48 mx-auto" />
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {pensum.map((semestre) => (
                    <li key={semestre.semestre}>
                        <Accordion open={semestre.semestre === openSemester} >
                            <AccordionHeader onClick={() => handleOpenSemester(semestre.semestre)}
                                className={`!justify-normal font-bold ${openSemester === semestre.semestre ? 'focus:text-blue-500' : 'text-black'}`}>
                                <FontAwesomeIcon icon={faCaretRight}
                                    className={`h-5 w-5 me-3 transition-transform ${openSemester === semestre.semestre ? "-rotate-90" : ""}`} />
                                {semesterToText(semestre.semestre)}
                            </AccordionHeader>
                            <AccordionBody>
                                <ul className='ps-10 list-disc'>
                                    {semestre.materias.map((materia) => (
                                        <Typography as="li" key={materia.id} className="mb-1 text-black list-item">
                                            {materia.nombre}
                                        </Typography>
                                    ))}
                                </ul>
                            </AccordionBody>
                        </Accordion>
                    </li>
                ))}
            </ol>

            <hr className="border-t-2 border-black my-10" />

            <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                Certificaciones para la Carrera de {carrera.nombre}
            </Typography>
            <ul className='ps-10 list-disc'>
                <Accordion open={openCertificacion === 1} >
                    <AccordionHeader onClick={() => setOpenCertificacion(openCertificacion === 1 ? 0 : 1)}
                        className={`!justify-normal font-bold ${openCertificacion === 1 ? 'focus:text-blue-500' : 'text-black'}`}>
                        <FontAwesomeIcon icon={faCaretRight}
                            className={`h-5 w-5 me-3 transition-transform ${openCertificacion === 1 ? "-rotate-90" : ""}`} />
                        Certificación Intermedia
                    </AccordionHeader>
                    <AccordionBody>
                        <Typography as="p">
                            A mitad de tu carrera podrás obtener certificaciones intermedias que avalan
                            los conocimientos y capacidades adquiridas para comenzar a trabajar mientras
                            vas avanzando en tus estudios. (Mayor información con el coordinador de
                            carrera)
                        </Typography>
                        <ul className='ps-10'>
                            {carrera.carrera?.certificaciones?.map((certificacion) => (
                                certificacion.tipo === TipoCertificacionEnum.INTERMEDIA ? (
                                    <Typography as="li" key={certificacion.id} className="my-2">
                                        {certificacion.titulo}
                                    </Typography>
                                ) : null
                            ))}
                        </ul>
                    </AccordionBody>
                </Accordion>

                <Accordion open={openCertificacion === 2} >
                    <AccordionHeader onClick={() => setOpenCertificacion(openCertificacion === 2 ? 0 : 2)}
                        className={`!justify-normal font-bold ${openCertificacion === 2 ? 'focus:text-blue-500' : 'text-black'}`}>
                        <FontAwesomeIcon icon={faCaretRight}
                            className={`h-5 w-5 me-3 transition-transform ${openCertificacion === 2 ? "-rotate-90" : ""}`} />
                        Certificación de Menciones para Egresado
                    </AccordionHeader>
                    <AccordionBody>
                        <Typography as="p">
                            La mención es un conocimiento adicional en otra área específica distinta a
                            la que estudiaste, y es un plus a tu formación como profesional. (Mayor
                            información con el coordinador de carrera)
                        </Typography>
                        <ul className='ps-10'>
                            {carrera.carrera?.certificaciones?.map((certificacion) => (
                                certificacion.tipo === TipoCertificacionEnum.MENCION ? (
                                    <Typography as="li" key={certificacion.id} className="my-2">
                                        {certificacion.titulo}
                                    </Typography>
                                ) : null
                            ))}
                        </ul>
                    </AccordionBody>
                </Accordion>
            </ul>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 justify-items-center shadow-md rounded-md p-10 gap-5 mb-5">
            <div className='max-w-96'>
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/professional-profile-with-image-1-1.png"
                    alt="Perfil Profesional"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Perfil Profesional
                </Typography>
                <div className="markdown-container gap-3 flex flex-col">
                    {carrera.carrera?.perfil_profesional?.replace(/<br\s*\/?>/g, "\n").split("\n").map((line, index) => (
                        <ReactMarkdown key={"line-" + index} remarkPlugins={[remarkGfm]}>
                            {line}
                        </ReactMarkdown>
                    ))}
                </div>
            </div>
            <div className='max-w-96'>
                <img
                    className="mx-auto max-h-[100px] object-cover object-center mb-5"
                    src="/icons/cursos/businessman-standing-with-a-suitcase.png"
                    alt="Campo Laboral"
                />
                <Typography as="h2" className="text-2xl font-bold mb-3 text-center">
                    Campo Laboral
                </Typography>
                <div className="markdown-container gap-3 flex flex-col">
                    {carrera.carrera?.campo_laboral?.replace(/<br\s*\/?>/g, "\n").split("\n").map((line, index) => (
                        <ReactMarkdown key={"line-" + index} remarkPlugins={[remarkGfm]}>
                            {line}
                        </ReactMarkdown>
                    ))}
                </div>
            </div>
        </section>

        <section style={{ backgroundImage: `url('${import.meta.env.VITE_BASE_IMG_URL + carrera.imagen_url}')` }}
            className='mb-5 py-8 sm:py-16 lg:py-24 bg-no-repeat bg-center bg-cover bg-fixed relative before:absolute before:h-full before:w-full before:bg-gray-600/75 before:top-0 before:left-0'>
            <Typography as="h2" className="px-5 sm:px-16 md:px-24 xl:px-48 text-2xl font-bold mb-3 text-center text-white relative">
                ¿Por qué estudiar {carrera.nombre}?
            </Typography>
            <Typography as="p" className="px-5 sm:px-16 md:px-24 xl:px-48 text-justify text-white relative">
                {carrera.carrera?.porque_estudiar ?? ""}
            </Typography>
        </section>

        <section className='flex flex-wrap justify-center gap-5 sm:divide-x-4 sm:divide-solid'>
            {carrera.contactos?.map((contacto) => (
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

export default CarreraPage;