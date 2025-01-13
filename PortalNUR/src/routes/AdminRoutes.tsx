import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AssignMateriasPage from "../pages/admin/cursos/AssignMateriasPage";
import LoginPage from "../pages/admin/LoginPage";
import MaestriaFormPage from "../pages/admin/maestrias/MaestriaFormPage";
import CarreraFormPage from "../pages/admin/carreras/CarreraFormPage";
import CursosListPage from "../pages/admin/cursos/CursosListPage";
import { Routes } from "./CONSTANTS";
import AssignContactosPage from "../pages/admin/cursos/AssignContactosPage";
import DiplomadoFormPage from "../pages/admin/diplomados/DiplomadoFormPage";
import MateriasListPage from "../pages/admin/materias/MateriasListPage";
import MateriaFormPage from "../pages/admin/materias/MateriaFormPage";
import ContactosListPage from "../pages/admin/contactos/ContactosListPage";
import ContactoFormPage from "../pages/admin/contactos/ContactoFormPage";
import UsuariosListPage from "../pages/admin/users/UsersListPage";
import UsuarioFormPage from "../pages/admin/users/UserFormPage";
import DepartamentosListPage from "../pages/admin/departamentos/DepartamentosListPage";
import DepartamentoFormPage from "../pages/admin/departamentos/DepartamentoFormPage";
import AssignDepartamentosPage from "../pages/admin/contactos/AssignDepartamentosPage";
import AssignCertificacionesPage from "../pages/admin/certificaciones/AssignCertificacionesPage";
import ModulosListPage from "../pages/admin/modulos/ModulosListPage";
import NoticiasListPage from "../pages/admin/noticias/NoticiasListPage";
import NoticiaFormPage from "../pages/admin/noticias/NoticiaFormPage";
import ContenidoNoticiaFormPage from "../pages/admin/noticias/ContenidoNoticiaFormPage";
import RevistaListPage from "../pages/admin/revistaEstudiantil/RevistaListPage";
import RevistaFormPage from "../pages/admin/revistaEstudiantil/RevistaFormPage";

export const AdminRoutes = [
    //General
    {
        path: Routes.ADMIN.LOGIN,
        element: <LoginPage />
    },
    {
        path: Routes.ADMIN.DASHBOARD,
        element: <AdminDashboardPage />
    },
    //Cursos
    {
        path: Routes.ADMIN.CURSO.LISTAR,
        element: <CursosListPage />
    },
    {
        path: Routes.ADMIN.CURSO.ASIGNAR_MATERIAS,
        element: <AssignMateriasPage />
    },
    {
        path: Routes.ADMIN.CURSO.ASIGNAR_CONTACTOS,
        element: <AssignContactosPage />
    },
    //Carreras
    {
        path: Routes.ADMIN.PREGRADO.CREAR,
        element: <CarreraFormPage />
    },
    {
        path: Routes.ADMIN.PREGRADO.EDITAR,
        element: <CarreraFormPage />
    },
    //Maestrias
    {
        path: Routes.ADMIN.POSTGRADO.CREAR_MAESTRIA,
        element: <MaestriaFormPage />
    },
    {
        path: Routes.ADMIN.POSTGRADO.EDITAR_MAESTRIA,
        element: <MaestriaFormPage />
    },
    //Diplomados
    {
        path: Routes.ADMIN.POSTGRADO.CREAR_DIPLOMADO,
        element: <DiplomadoFormPage />
    },
    {
        path: Routes.ADMIN.POSTGRADO.EDITAR_DIPLOMADO,
        element: <DiplomadoFormPage />
    },
    //Usuarios
    {
        path: Routes.ADMIN.USUARIO.LISTAR,
        element: <UsuariosListPage />
    },
    {
        path: Routes.ADMIN.USUARIO.CREAR,
        element: <UsuarioFormPage />
    },
    {
        path: Routes.ADMIN.USUARIO.EDITAR,
        element: <UsuarioFormPage />
    },
    //Contactos
    {
        path: Routes.ADMIN.CONTACTO.LISTAR,
        element: <ContactosListPage />
    },
    {
        path: Routes.ADMIN.CONTACTO.CREAR,
        element: <ContactoFormPage />
    },
    {
        path: Routes.ADMIN.CONTACTO.EDITAR,
        element: <ContactoFormPage />
    },
    {
        path: Routes.ADMIN.CONTACTO.ASIGNAR_DEPARTAMENTO,
        element: <AssignDepartamentosPage />
    },
    //Materias
    {
        path: Routes.ADMIN.MATERIA.LISTAR,
        element: <MateriasListPage />
    },
    {
        path: Routes.ADMIN.MATERIA.CREAR,
        element: <MateriaFormPage />
    },
    {
        path: Routes.ADMIN.MATERIA.EDITAR,
        element: <MateriaFormPage />
    },
    //Certificaciones
    {
        path: Routes.ADMIN.CERTIFICACION.LISTAR,
        element: <AssignCertificacionesPage />
    },
    //Departamentos
    {
        path: Routes.ADMIN.DEPARTAMENTO.LISTAR,
        element: <DepartamentosListPage />
    },
    {
        path: Routes.ADMIN.DEPARTAMENTO.CREAR,
        element: <DepartamentoFormPage />
    },
    {
        path: Routes.ADMIN.DEPARTAMENTO.EDITAR,
        element: <DepartamentoFormPage />
    },
    //Modulos
    {
        path: Routes.ADMIN.MODULO.LISTAR,
        element: <ModulosListPage />
    },
    //Noticias
    {
        path: Routes.ADMIN.NOTICIA.LISTAR,
        element: <NoticiasListPage />
    },
    {
        path: Routes.ADMIN.NOTICIA.CREAR,
        element: <NoticiaFormPage />
    },
    {
        path: Routes.ADMIN.NOTICIA.EDITAR,
        element: <NoticiaFormPage />
    },
    {
        path: Routes.ADMIN.NOTICIA.CONTENIDO,
        element: <ContenidoNoticiaFormPage />
    },
    //Revista
    {
        path: Routes.ADMIN.REVISTA.LISTAR,
        element: <RevistaListPage />
    },
    {
        path: Routes.ADMIN.REVISTA.CREAR,
        element: <RevistaFormPage />
    },
    {
        path: Routes.ADMIN.REVISTA.EDITAR,
        element: <RevistaFormPage />
    },
];