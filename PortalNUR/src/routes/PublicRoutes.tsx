import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import { Routes } from './CONSTANTS';
import PostgradoPage from '../pages/cursos/PostgradoPage';
import PregradoPage from '../pages/cursos/PregradoPage';
import CarreraPage from '../pages/cursos/CarreraPage';
import MaestriaPage from '../pages/cursos/MaestriaPage';
import DiplomadoPage from '../pages/cursos/DiplomadoPage';
import IdiomasPage from '../pages/idiomas/IdiomasPage';
import InglesPage from '../pages/idiomas/InglesPage';
import PortuguesPage from '../pages/idiomas/PortuguesPage';
import ContactosPage from '../pages/contactos/ContactosPage';
import CoordinadoresPregradoPage from '../pages/contactos/CoordinadoresPregradoPage';
import AboutPage from '../pages/about/AboutPage';
import FundacionPage from '../pages/about/FundacionPage';
import MisionVisionPage from '../pages/about/MisionVision';
import FilosofiaPage from '../pages/about/FilosofiaPage';
import PrincipiosPage from '../pages/about/PrincipiosPage';
import ConstituyentesPage from '../pages/about/Constituyentes';
import AutoridadesPage from '../pages/about/AutoridadesPage';
import JuntaFiduciariaPage from '../pages/about/JuntaFiduciariaPage';
import FundadoresPage from '../pages/about/FundadoresPage';
import LogrosPage from '../pages/about/LogrosPage';
import PoliticaPage from '../pages/about/PoliticaPage';
import NoticiasPage from '../pages/noticias/NoticiasPage';
import NoticiaDetailPage from '../pages/noticias/NoticiaDetailPage';
import RevistasPage from '../pages/revista/RevistasPage';
import RevistaDetailPage from '../pages/revista/RevistaDetailPage';
export const PublicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />
    },
    // Postgrado
    {
        path: Routes.CURSOS.POSTGRADO.DEFAULT,
        element: <PostgradoPage />
    },
    {
        path: Routes.CURSOS.POSTGRADO.MAESTRIA,
        element: <MaestriaPage />
    },
    {
        path: Routes.CURSOS.POSTGRADO.DIPLOMADO,
        element: <DiplomadoPage />
    },
    // Pregrado
    {
        path: Routes.CURSOS.PREGRADO.DEFAULT,
        element: <PregradoPage />
    },
    {
        path: Routes.CURSOS.PREGRADO.CARRERA,
        element: <CarreraPage />
    },
    // Idiomas
    {
        path: Routes.IDIOMAS.DEFAULT,
        element: <IdiomasPage />
    },
    {
        path: Routes.IDIOMAS.INGLES,
        element: <InglesPage />
    },
    {
        path: Routes.IDIOMAS.PORTUGUES,
        element: <PortuguesPage />
    },
    // Contactos
    {
        path: Routes.CONTACTOS.DEFAULT,
        element: <ContactosPage />
    },
    {
        path: Routes.CONTACTOS.COORDINADORES_PREGRADO,
        element: <CoordinadoresPregradoPage />
    },
    // Conociendo la NUR
    {
        path: Routes.ABOUT.DEFAULT,
        element: <AboutPage />
    },
    {
        path: Routes.ABOUT.FUNDACION,
        element: <FundacionPage />
    },
    {
        path: Routes.ABOUT.MISION_VISION,
        element: <MisionVisionPage />
    },
    {
        path: Routes.ABOUT.FILOSOFIA,
        element: <FilosofiaPage />
    },
    {
        path: Routes.ABOUT.PRINCIPIOS,
        element: <PrincipiosPage />
    },
    {
        path: Routes.ABOUT.CONSTITUYENTES,
        element: <ConstituyentesPage />
    },
    {
        path: Routes.ABOUT.AUTORIDADES,
        element: <AutoridadesPage />
    },
    {
        path: Routes.ABOUT.JUNTA_FIDUCIARIA,
        element: <JuntaFiduciariaPage />
    },
    {
        path: Routes.ABOUT.FUNDADORES,
        element: <FundadoresPage />
    },
    {
        path: Routes.ABOUT.LOGROS,
        element: <LogrosPage />
    },
    {
        path: Routes.ABOUT.POLITICA,
        element: <PoliticaPage />
    },
    // Noticias/Actividades
    {
        path: Routes.NOTICIAS.DEFAULT,
        element: <NoticiasPage />
    },
    {
        path: Routes.NOTICIAS.NOTICIA,
        element: <NoticiaDetailPage />
    },
    // Revista Estudiantil
    {
        path: Routes.REVISTAS.DEFAULT,
        element: <RevistasPage />
    },
    {
        path: Routes.REVISTAS.REVISTA,
        element: <RevistaDetailPage />
    },
];