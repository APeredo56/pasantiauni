import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";

const HomeServicesComponent = () => {
    return (<>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl cursor-pointer">
            <img src="/icons/inicio/universitygraduatehat_104965.png" alt="Programas Académicos"
                className="h-10 mx-auto pb-3" />
            <Typography as={"h2"} className="text-2xl font-bold">
                Programas Académicos
            </Typography>
            <Typography as={"p"} className="text-md text-gray-700 mt-4">
                Pregrado - Postgrado - Idiomas - Educación Continua
            </Typography>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl cursor-pointer">
            <img src="/icons/inicio/desarrollo-100x100.png" alt="Apoyo Académico"
                className="h-10 mx-auto pb-3" />
            <Typography as={"h2"} className="text-2xl font-bold">
                Apoyo Académico
            </Typography>
            <Typography as={"p"} className="text-md text-gray-700 mt-4">
                Aplicaciones de apoyo para Estudiantes y Docentes
            </Typography>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl cursor-pointer">
            <Link to={Routes.NOTICIAS.DEFAULT}>
                <img src="/icons/inicio/desarrollo-100x100.png" alt="Actividades"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Actividades
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Todas nuestras actividades y las ultimas noticias
                </Typography>
            </Link>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <Link to={Routes.CURSOS.PREGRADO.DEFAULT}>
                <img src="/icons/inicio/universitygraduatehat_104965.png" alt="Inicio de Clases Verano"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Inicio de Clases Verano 23 de Enero
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Pregrado - Carreras a nivel licenciatura de lunes a viernes.
                </Typography>
            </Link>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <Link to={Routes.CURSOS.PREGRADO.DEFAULT}>
                <img src="/icons/inicio/universitygraduatehat_104965.png" alt="Inicio de Clases Semipresencial"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Inicio de Clases Semipresencial 09 de Marzo
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Pregrado - Carreras a nivel licenciatura Sabados por la tarde.
                </Typography>
            </Link>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <Link to={Routes.CURSOS.PREGRADO.DEFAULT}>
                <img src="/icons/inicio/universitygraduatehat_104965.png" alt="Inicio de Clases Presencial"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Inicio de Clases Presencial 11 de Marzo
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Pregrado - Carreras a nivel licenciatura de lunes a viernes.
                </Typography>
            </Link>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <a href="http://unirse.nur.edu/">
                <img src="/icons/inicio/UNIRSE-ok.jpg" alt="Esdes - Unirse"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Esdes - Unirse
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Proyectos realizados al Servicio de la Comunidad
                </Typography>
            </a>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <a href="https://internacionalizacion.nur.edu/">
                <img src="/icons/inicio/Internacionalizacion.jpg" alt="Internacionalización"
                    className="h-10 mx-auto" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Internacionalización
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Posibilidad de cursar un periodo de estudio en una institución extranjero
                </Typography>
            </a>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <a href="https://iics.nur.edu/">
                <img src="/icons/inicio/LOGO-iics-black250x250-150x150.jpg" alt="Centro de Investigación"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Centro de Investigación
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Instituto de Investigación Científica y Social (IICS-NUR)
                </Typography>
            </a>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <a href="https://notas2.nur.edu/adminSite/pagos.html">
                <img src="/icons/inicio/tarjeta.png" alt="Pagos en Línea"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Pagos en Línea
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    ¡¡¡ Ahora puede pagar desde aquí !!! Pagos en línea
                </Typography>
            </a>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <a href="https://cvsc.nur.edu/">
                <img src="/icons/inicio/LOGO-CVSC-250X250.jpg" alt="Plataforma Virtual"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    Plataforma Virtual
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Plataforma de educación virtual cvsc.nur.edu
                </Typography>
            </a>
        </article>
        <article className="text-center p-8 shadow-2xl hover:shadow-4xl">
            <a href="https://festinur.nur.edu/">
                <img src="/icons/inicio/tarjeta.png" alt="FESTINUR"
                    className="h-10 mx-auto pb-3" />
                <Typography as={"h2"} className="text-2xl font-bold">
                    FESTINUR
                </Typography>
                <Typography as={"p"} className="text-md text-gray-700 mt-4">
                    Festival de Cortometrajes NUR (FESTINUR)
                </Typography>
            </a>
        </article>
    </>);
}

export default HomeServicesComponent;