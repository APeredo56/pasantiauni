import { faMinus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionBody, AccordionHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";

const JuntaFiduciariaPage = () => {
    const [openMember, setOpenMember] = useState<number>(0);

    const handleOpenMember = (member: number) => {
        setOpenMember(openMember === member ? 0 : member);
    };

    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/JUNTA-JURIDICA.jpg"
                alt="Junta Fiduciaria"
            />
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                JUNTA FIDUCIARIA
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La Junta Fiduciaria es elegida mediante voto secreto por la Asamblea General de Constituyentes para una gestión de cinco años de acuerdo a Reglamento Interno. Está conformada por cinco personas que cumplen sus funciones de manera voluntaria. La Junta Fiduciaria, recibe el fideicomiso de la Asamblea General de Constituyentes como máximo órgano de decisión de acuerdo a la estructura institucional de la Universidad Nur.
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La Junta Fiduciaria emite las políticas y lineamientos para el funcionamiento de la Universidad, dentro del accionar que representa la aplicación de los Principios y la Filosofía de la Universidad, al igual que el cumplimiento de las normas legales del país en todos los aspectos de la educación superior universitaria. Por su parte, los miembros de la Junta Fiduciaria conscientes de la naturaleza única de la Universidad Nur comprometida en servir a la población boliviana, a través de principios universales para el mejoramiento de la humanidad, buscan promover a través de sus acciones y decisiones, el desarrollo e integración de los pueblos del mundo. Buscan, además, generar una educación de excelencia, en sus componentes prácticos y teóricos, con el fin de que los estudiantes busquen promover el bien común del país. Como máximo órgano de decisión, está conformado de manera colegiada de acuerdo con la naturaleza de su personalidad jurídica y los integrantes toman decisiones en base a la consulta, que busca llegar siempre a la verdad, y cumpliendo con todas las normativas legales del país y de la normativa interna de la Universidad.
            </Typography>
        </section>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h2" className="text-xl mb-3 font-bold text-center">
                Los Valores que la Núr promueve institucionalmente son:
            </Typography>
            <ul>
                <li>
                    <Accordion open={openMember === 1} >
                        <AccordionHeader onClick={() => handleOpenMember(1)}
                            className={`!justify-normal text-lg font-bold ${openMember === 1 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={openMember === 1 ? faMinus : faUser}
                                className="h-5 w-5 me-3" />
                            Grisel Ruth Oreggia Crisci
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Educadora desde 1991, desempeñó funciones en el área de educación continua y en la docencia de pre y post grado. Profesional en el área de Ciencias de la Educación, de la Universidad Nacional de Salta, República Argentina, con Maestría en Educación Universitaria, de la Universidad Nur-Bolivia. En Universidad Nur, cumplió funciones académicas-administrativas en el Colegio de Postgrado, cofundadora de la modalidad de Educación a Distancia, coordinadora de la Maestría en Educación Universitaria, integrante del equipo de capacitadoras para maestros rurales, en talleres sobre estrategias educativas y educación potencializadora. Se desempeñó como capacitadora-tallerista y tutora virtual en el programa de Capacitación a maestros, en Lecto-escritura en el primer ciclo de primaria, acompañando a escuelas lectoras en área urbana y rural (Programa Nur-Usaid-Bolivia)
                            </Typography>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Comprometida con la educación en valores y el desarrollo de capacidades emocionales, actualmente capacita y acompaña a docentes de pre y postgrado, en el ámbito universitario privado y estatal, en las áreas de estrategias educativas, planes de clase, investigación y aprendizaje cooperativo. Aprendiendo más sobre educación digital.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openMember === 2} >
                        <AccordionHeader onClick={() => handleOpenMember(2)}
                            className={`!justify-normal text-lg font-bold ${openMember === 2 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={openMember === 2 ? faMinus : faUser}
                                className="h-5 w-5 me-3" />
                            Patricia Fabiana Méndez Raya
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Secretaria de la Junta Fiduciaria de la Universidad Nur. Bióloga, con Maestrías en Educación Ambiental y Desarrollo Sustentable, interesada principalmente en los procesos de aprendizaje y liderazgo para desarrollar una vida responsable, con uno/a mismo/a, con la sociedad y el medio ambiente. Directora Ejecutiva del Museo Nacional de Historia Natural (2015 – 2018) donde gestionó una Ley sancionada por la Asamblea Legislativa Plurinacional para fortalecer dicha organización. Durante más de 15 años coordinó y dirigió proyectos de investigación, así como proyectos educativos ambientales, en biodiversidad, cambio climático y gestión de residuos, para organismos de cooperación internacional y organizaciones no gubernamentales. Fue encargada del tema transversal educación para el medio ambiente del Ministerio de Educación (2005 -2006). Desde la gestión 2001 es docente de Estudios del Desarrollo en la Universidad Nur sede La Paz.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openMember === 3} >
                        <AccordionHeader onClick={() => handleOpenMember(3)}
                            className={`!justify-normal text-lg font-bold ${openMember === 3 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={openMember === 3 ? faMinus : faUser}
                                className="h-5 w-5 me-3" />
                            Augusto Esteban Costas Morelli
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Trabajó durante 34 años en el área de gerencia y dirección en organizaciones sin fines de lucro y privadas. Tiene una Licenciatura en Administración de Empresas, Maestría en gerencia para el desarrollo en la Universidad Tomas Alba Edison de USA y un doctorado en educación con la Atlantic International University de USA junto a especializaciones y diplomados nacionales e internacionales en desarrollo social, investigación y evaluación. En Bolivia, Augusto trabajó para Radio Baha´i de Bolivia por 17 años como su Director Nacional; para Save the Children International por 23 años como Gerente de Oruro y Director de Programas/Educación, fue desde el 2013 al 2019 Punto focal de educación y emergencias para la región LAC; para Save the Children USA como asesor global de educación por 5 años y como punto focal de gestión de Riesgos y Asesor de Calidad de Educación para la región LAC;  para FUNDESIB por 3 años como Director Ejecutivo; al momento es Director Ejecutivo de HELP GLOBAL EDUCACION, docente universitario en la Universidad Nur por ya 4 años y actualmente es miembro de la Junta Fiduciaria de la Universidad.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openMember === 4} >
                        <AccordionHeader onClick={() => handleOpenMember(4)}
                            className={`!justify-normal text-lg font-bold ${openMember === 4 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={openMember === 4 ? faMinus : faUser}
                                className="h-5 w-5 me-3" />
                            Nadim Ouladi
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Presidente de la Junta Fiduciaria de la Universidad Nur desde el año 2007. Tiene un doctorado en Salud Pública de la Universidad de California en Los Ángeles (UCLA) y sus áreas de interés incluyen el acceso y calidad a/de los servicios de salud para poblaciones vulnerables y la implementación de políticas en salud para países en vías del desarrollo. Cuenta con maestrías en Salud Publica, en Gerencia Financiera y en Administración de Empresas y recibió su grado de Licenciatura en Administración de la Universidad Núr. Su experiencia laboral se enfoca a proyectos para el desarrollo en salud, educación y seguridad/soberanía alimentaria. También es docente en distintas universidades públicas y privadas en temáticas de salud, finanzas, administración y la aplicación de métodos cuantitativos y cualitativos de investigación en dichas áreas. Entre sus premios más destacados se encuentran la Beca Fulbright, el premio Ursula Mandel y el premio Bill Clinton de excelencia académica.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>

                <li>
                    <Accordion open={openMember === 5} >
                        <AccordionHeader onClick={() => handleOpenMember(5)}
                            className={`!justify-normal text-lg font-bold ${openMember === 5 ? 'focus:text-blue-500' : 'text-black'}`}>
                            <FontAwesomeIcon icon={openMember === 5 ? faMinus : faUser}
                                className="h-5 w-5 me-3" />
                            Reynaldo Hurtado Choque
                        </AccordionHeader>
                        <AccordionBody>
                            <Typography as="p" className="text-lg text-justify" color="blue-gray">
                                Es miembro de la comunidad bahá’í, graduado de la Universidad Nur como Economista Agrícola y partícipe activo en la promoción del desarrollo socio-económico, especialmente en poblaciones rurales. También tiene formación en cursos de Liderazgo Moral y procesos de conciliación extrajudicial. Ha sido parte del equipo que desarrolló los sistemas de información computarizados, en las primeras etapas de la Universidad Nur. Ha trabajado colaborando con el proyecto educativo «Unidad de los Pueblos» de Puka Puka en Tarabuco-Chuquisaca, estableciendo y consolidando los niveles primario y secundario. También ha trabajado en la dirección de la Radio Bahá’í en Puno-Perú y luego en la Secretaría de la Asamblea Espiritual Nacional de los Bahá’ís de Bolivia.
                            </Typography>
                        </AccordionBody>
                    </Accordion>
                </li>
            </ul>
        </section>
    </>);
}

export default JuntaFiduciariaPage;