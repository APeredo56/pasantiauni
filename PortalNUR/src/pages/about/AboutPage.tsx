import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";

const AboutPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/portada-bienvenido-a-la-nur1100X400.jpg"
                alt="Portada bienvenido a la nur"
            />
            <Typography as="h1" className="text-3xl font-bold text-center">
                Conociendo la Nur
            </Typography>
        </header>
        <section>
            <ul className="grid lg:grid-cols-5 gap-5">
                <li>
                    <Link to={Routes.ABOUT.FUNDACION}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/EDIFICIO-390x200.jpg"
                                alt="Fundación"
                            />
                            <figcaption className="text-xl font-bold">Fundación</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.MISION_VISION}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/M-Y-V-390x200.jpg"
                                alt="Misión y Visión"
                            />
                            <figcaption className="text-xl font-bold">Misión y Visión</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.FILOSOFIA}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/FILOSOFIA-EDUCATIVA-390x200.jpg"
                                alt="Filosofía Educativa"
                            />
                            <figcaption className="text-xl font-bold">Filosofía Educativa</figcaption>
                        </figure>
                    </Link>
                </li>
                
                <li>
                    <Link to={Routes.ABOUT.PRINCIPIOS}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/Principios-y-Valores-Institucionales-390X200-390x200.jpg"
                                alt="Principios y Valores Institucionales"
                            />
                            <figcaption className="text-xl font-bold">Principios y Valores Institucionales</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.CONSTITUYENTES}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/CONTITUYENTES-390x200.jpg"
                                alt="Constituyentes"
                            />
                            <figcaption className="text-xl font-bold">Constituyentes</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.AUTORIDADES}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/Autoridades-Ejecutivas-1100x906-1-390x200.jpg"
                                alt="Autoridades Ejecutivas"
                            />
                            <figcaption className="text-xl font-bold">Autoridades Ejecutivas</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.JUNTA_FIDUCIARIA}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/JUNTA-JURIDICA-390x200.jpg"
                                alt="Junta Fiduciaria"
                            />
                            <figcaption className="text-xl font-bold">Junta Fiduciaria</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.FUNDADORES}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/Constituyentes-390X200-Recuperado-390x200.jpg"
                                alt="Fundadores"
                            />
                            <figcaption className="text-xl font-bold">Fundadores</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.LOGROS}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/LOGROS-1-390x200.jpg"
                                alt="Logros"
                            />
                            <figcaption className="text-xl font-bold">Logros</figcaption>
                        </figure>
                    </Link>
                </li>

                <li>
                    <Link to={Routes.ABOUT.POLITICA}>
                        <figure>
                            <img
                                className="mx-auto w-full object-cover object-center mb-1"
                                src="/images/about/POLITICA-DE-CALIDAD-390x200.jpg"
                                alt="Política de Calidad"
                            />
                            <figcaption className="text-xl font-bold">Política de Calidad</figcaption>
                        </figure>
                    </Link>
                </li>
            </ul>
        </section>
    </>);
}

export default AboutPage;