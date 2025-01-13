import { faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faEnvelope, faIdBadge, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Departamento } from "../../models/Departamento";
import { ModuloService } from "../../services/ModuloService";

const PortuguesPage = () => {
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
            src="/images/idiomas/portugues/CINPORTUGUES.jpg"
            alt="Arte CIN Portugués"
        />

        <hr className="border-t-2 border-black my-10 w-full" />

        <section className="mb-5">
            <div className="lg:flex">
                <img
                    className="mx-auto w-full object-cover object-center basis-1/2"
                    src="/images/idiomas/portugues/portugues-1.jpg"
                    alt="Portugues NUR"
                />
                <article className="py-5 lg:py-0 lg:px-5 content-center basis-1/2">
                    <Typography as="h2" className="text-2xl font-bold">
                        PROGRAMA DE PORTUGUÉS PARA LA COMUNICACIÓN
                    </Typography>
                    <Typography as="p" className="my-5">
                        Esta es una nueva versión del programa de portugués para la comunicación que
                        brinda la Universidad Nur. Este programa ha sido revisado y actualizado
                        tomando en cuenta las nuevas tendencias en la enseñanza de idiomas.
                    </Typography>
                </article>
            </div>
            <div className="lg:flex flex-row-reverse">
                <img
                    className="mx-auto w-full object-cover object-center basis-1/2"
                    src="/images/idiomas/portugues/portugues-2.jpg"
                    alt="Portugues NUR"
                />
                <article className="py-5 lg:py-0 lg:px-5 content-center basis-1/2">
                    <Typography as="h2" className="text-2xl font-bold">
                        PROGRAMA DE PORTUGUÉS
                    </Typography>
                    <Typography as="p" className="my-5">
                        En el programa de portugués tiene una duración corta de 5 meses, inician desde
                        el nivel inicial, concluyen con un nivel avanzado del idioma. DE PORTUGUÉS
                        tiene una duración corta de 5 meses, inician desde el nivel inicial, concluyen
                        con un nivel avanzado del idioma.
                    </Typography>
                </article>
            </div>
            <div className="lg:flex">
                <img
                    className="mx-auto w-full object-cover object-center basis-1/2"
                    src="/images/idiomas/portugues/portugues-3.jpg"
                    alt="Portugues NUR"
                />
                <article className="py-5 lg:py-0 lg:px-5 content-center basis-1/2">
                    <Typography as="h2" className="text-2xl font-bold">
                        VENTAJAS DE APRENDER EL IDIOMA
                    </Typography>
                    <ul>
                        <Typography as="li" className="my-5">
                            Aprender el idioma portugués te brinda muchas posibilidades, Brasil siendo
                            un país parte del Mercosur, las relaciones económicas bilaterales abundan.
                            Por este motivo, invertir en el aprendizaje del idioma portugués te puede
                            dar muchos beneficios.
                        </Typography>
                        <Typography as="li" className="my-5">
                            Contar con el conocimiento del portugués es una gran ventaja si lo destacas
                            en tu currículum. Tener empleados capaces de comunicarse sin problemas con
                            posibles socios económicos extranjeros es siempre un plus.
                        </Typography>
                        <Typography as="li" className="my-5">
                            Imagina que estás postulando a un puesto de trabajo en el que la gran
                            mayoría de los candidatos saben hablar inglés. En esta ocasión, puede no
                            ser un punto muy decisivo. Sin embargo, si agregas a eso tus conocimientos
                            en la lengua lusa, las posibilidades de ser seleccionado o seleccionada
                            serán mucho mayores
                        </Typography>
                    </ul>
                </article>
            </div>
        </section>

        <hr className="border-t-2 border-black my-10 w-full" />

        <section>
            <Typography as="h3" className="text-xl font-bold mb-1">
                Enfoque Comunicativo
            </Typography>
            <Typography as="p" className="text-md mb-5">
                Este enfoque se refiere a que los objetivos de aprendizaje se expresan en formas de
                funciones que se realizan en la comunicación. Los nuevos contenidos mínimos de nuestro
                programa se definen en términos de funciones, por ejemplo: Después de la primera unidad,
                el estudiante podrá saludar y despedir, presentarse a uno mismo, intercambiar
                información personal básica, etc. Al final del programa, el estudiante podrá hablar
                sobre asuntos relacionados con salud y buen estado físico, reportar enunciados,
                preguntas, órdenes y solicitudes, escribir una carta pidiendo consejo, etc.
            </Typography>

            <Typography as="h3" className="text-xl font-bold mb-1">
                Tipo de material
            </Typography>
            <Typography as="p" className="text-md mb-5">
                El material que se usa dentro de nuestro programa es auténtico y semi-auténtico (lo
                cual significa que ha sido alterado con el propósito de ayudar a un estudiante de
                idiomas). Este material se usa en actividades de comprensión auditiva, producción oral,
                comprensión escrita y producción escrita. Las habilidades mencionadas se mezclan de
                una forma que un estudiante pueda desarrollar sus competencias de forma transversal.
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
            <article className="shadow-xl rounded-xl max-w-96 p-5 mx-auto text-center">
                <Typography as="h2" className="text-xl font-bold mb-1" color="blue">
                    CENTRO INTERNACIONAL DE IDIOMAS NUR
                </Typography>
                <Typography as="p" className="text-md mb-1">
                    Costo Bs. 400 (Módulo)
                </Typography>
                <Typography as="p" className="text-md mb-1">
                    Un módulo por mes
                </Typography>
                <Typography as="p" className="text-md mb-1">
                    Duración 5 módulos
                </Typography>
                <Typography as="p" className="text-md mb-5">
                    MATRICULA ÚNICA 95 Bs.
                </Typography>

                <Typography as="strong" className="text-md font-bold mb-5">
                    Entrega de Certificado por la conclusión de todo el  curso
                </Typography>
                <Typography as="strong" className="text-md font-bold mb-1">
                    Requisitos:
                </Typography>
                <ul>
                    <Typography as="li" className="text-md mb-1">
                        Fotocopia de Documento de Identidad
                    </Typography>
                </ul>
            </article>
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

export default PortuguesPage;