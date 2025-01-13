import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";

const InglesPage = () => {
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
        <img
            className="mx-auto w-full object-cover object-center mb-5"
            src="/images/idiomas/ingles/CININGLES.jpg"
            alt="Arte CIN Inglés"
        />

        <hr className="border-t-2 border-black my-10 w-full" />

        <section className="mb-5">
            <div className="lg:flex">
                <img
                    className="mx-auto w-full object-cover object-center basis-1/2"
                    src="/images/idiomas/ingles/Ingles-nur-1.jpg"
                    alt="Ingles NUR"
                />
                <article className="py-5 lg:py-0 lg:px-5 content-center basis-1/2">
                    <Typography as="h2" className="text-2xl font-bold">
                        PROGRAMA DE INGLÉS PARA LA COMUNICACIÓN
                    </Typography>
                    <Typography as="p" className="my-5">
                        Esta es una nueva versión del programa de inglés para la comunicación que brinda la
                        Universidad Nur. Este programa ha sido revisado y actualizado tomando en cuenta las
                        nuevas tendencias en la enseñanza de idiomas.
                    </Typography>
                </article>
            </div>
            <div className="lg:flex flex-row-reverse">
                <img
                    className="mx-auto w-full object-cover object-center basis-1/2"
                    src="/images/idiomas/ingles/Ingles-nur-2.jpg"
                    alt="Ingles NUR"
                />
                <article className="py-5 lg:py-0 lg:px-5 content-center basis-1/2">
                    <Typography as="h2" className="text-2xl font-bold">
                        EL MARCO COMÚN EUROPEO DE REFERENCIA PARA LAS LENGUAS
                    </Typography>
                    <Typography as="p" className="my-5">
                        El marco común europeo de referencia para las lenguas define un corpus mínimo
                        requerido para que una persona pueda comunicarse en un idioma, en nuestro caso
                        el idioma inglés. Además, este favorece a una perspectiva comunicativa para la
                        enseñanza de idiomas.
                    </Typography>
                </article>
            </div>
            <div className="lg:flex">
                <img
                    className="mx-auto w-full object-cover object-center basis-1/2"
                    src="/images/idiomas/ingles/Ingles-nur-3.jpg"
                    alt="Ingles NUR"
                />
                <article className="py-5 lg:py-0 lg:px-5 content-center basis-1/2">
                    <Typography as="h2" className="text-2xl font-bold">
                        ASPECTOS CULTUALES Y SOCIOCULTURALES
                    </Typography>
                    <Typography as="p" className="my-5">
                        Debido a que la comunicación ocurre siempre en varios contextos y la forma de
                        comunicarse varía según la situación, las personas y el lugar, cada unidad tiene
                        información acerca de aspectos culturales y socioculturales de las sociedades
                        angloparlantes.
                    </Typography>
                </article>
            </div>
        </section>

        <hr className="border-t-2 border-black my-10 w-full" />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 grid-flow-row-dense">
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/idiomas/ENGLISH-SCORE-EXAMEN-web-2-960x960.jpg"
                alt="Certificación internacional English Score"
            />
            <article className="md:col-span-2 lg:col-span-1">
                <Typography as="h3" className="text-xl font-bold text-center mb-5">
                    Certificaciones:
                </Typography>
                <Typography as="p" className="text-md text-center mb-5 text-justify">
                    El Centro Internacional de Idiomas  Nur brinda a sus estudiantes la oportunidad de
                    rendir un examen de inglés que otorga certificación internacional como parte de la
                    estructura del plan de estudios. El examen es British Council EnglishScore y se
                    rinde al finalizar todo el programa.
                </Typography>
                <Typography as="p" className="text-md text-center mb-5 text-justify">
                    EnglishScore es un examen de nivel de inglés rápido y preciso. Este examen evalúa
                    tu dominio de gramática, vocabulario, lectura y comprensión auditiva, y puedes
                    usarlo para mejorarte tú mismo, demostrar tu nivel de inglés a una empresa o
                    prepararte para exámenes tales como el Sistema Internacional de Prueba del Idioma
                    Inglés.
                </Typography>
                <Typography as="p" className="text-md text-center mb-5 text-justify">
                    Los alumnos matriculados en los cursos de Inglés avanzado del Centro de Idiomas
                    y/o último nivel del pensum de su carrera, rinden el examen internacional British
                    Council EnglishScore como prueba final de dichos niveles, obteniendo una
                    certificación internacional Core Skills B1, B2 o C1 (según corresponda), de
                    acuerdo al cronograma establecido para tal fin.
                </Typography>
            </article>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/idiomas/ENGLISH-SCORE-EXAMEN-web-960x960.jpg"
                alt="Examen English Score"
            />
        </section>

        <hr className="border-t-2 border-black my-5 w-full" />

        <section className="mb-5">
            <Typography as="h3" className="text-xl font-bold mb-1">
                Enfoque Comunicativo
            </Typography>
            <Typography as="p" className="text-md mb-5">
                Este enfoque se refiere a que los objetivos de aprendizaje se expresan en formas de
                funciones que se realizan en la comunicación. Los nuevos contenidos mínimos de nuestro
                programa se define en términos de funciones, por ejemplo: Después de la primera unidad,
                el estudiante podrá saludar y despedir, presentarse a uno mismo, intercambiar
                información personal básica, etc. Al final del programa, el estudiante podrá hablar
                sobre asuntos relacionados con salud y buen estado físico, reportar enunciados,
                preguntas, órdenes y solicitudes, escribir una carta pidiendo consejo, etc.
            </Typography>

            <Typography as="h3" className="text-xl font-bold mb-1">
                Tipo de Actividades en la Clase
            </Typography>
            <Typography as="p" className="text-md mb-5">
                El enfoque comunicativo favorece al uso de actividades participativas en las cuales el estudiante debe interactuar tanto con los otros estudiantes como con el docente. En este proceso los errores gramaticales están permitidos pues es a través de estos que se consolidan los conocimientos. A pesar de tener un docente quien lleva la clase, el estudiante debe ser responsable de su propio aprendizaje participando en las actividades sugeridas por el docente y el libro. A la vez, él debe buscar reforzar los conocimientos a través de material que se puede encontrar en el internet, revistas, libros, periódicos y/o televisión.
            </Typography>

            <Typography as="h3" className="text-xl font-bold mb-1">
                Tipo de material
            </Typography>
            <Typography as="p" className="text-md mb-5">
                El material que se usa dentro de nuestro programa es auténtico y semi-auténtico (lo
                cual significa que ha sido alterado con el propósito de ayudar a un estudiante de
                idiomas). Este material se usa en actividades de comprensión auditiva, producción oral,
                comprensión escrita y producción escrita. Las habilidades mencionadas se mezclan de una
                forma que un estudiante pueda desarrollar sus competencias de forma transversal. El
                material presentado en el método TRAVELER de mmpublications sigue este lineamiento y
                nos ayuda a llegar a nuestros objetivos.
            </Typography>

            <Typography as="h3" className="text-xl font-bold mb-1">
                Gramática
            </Typography>
            <Typography as="p" className="text-md mb-5">
                Aunque el enfoque del programa es comunicativo, el aspecto gramatical juega un rol
                importante en la comunicación por eso este aspecto está integrado para que el
                estudiante pueda desarrollar tanto la comunicación como la precisión en el uso del
                idioma.
            </Typography>

            <Typography as="h3" className="text-xl font-bold mb-1">
                Test
            </Typography>
            <Typography as="p" className="text-md mb-5">
                Para que el estudiante pueda evaluar su propio progreso, a lo largo del programa se
                incluyen evaluaciones formativas a la mitad y al final de cada módulo.
            </Typography>
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

export default InglesPage;