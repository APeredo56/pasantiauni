import { Typography } from "@material-tailwind/react";
import { useUser } from "../../contexts/user/useUser";
import { Link } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import { hasPermission, pagePermissions } from "../../utils/permissionUtils";

const AdminDashboardPage = () => {
    const { user, userRoles } = useUser();

    return (<>
        <Typography color="blue" as="h1" className="my-8 text-xl font-bold">Bienvenido {user?.name}</Typography>
        {user && userRoles.size === 0 && <Typography color="red" as="h2" className="text">No tiene roles asignados</Typography>}
        <ul className="flex flex-row flex-wrap gap-3">
            {hasPermission(pagePermissions.Maestrias, userRoles) && (<li className="mb-3">
                <Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=maestrias' }}
                    className="bg-blue-500 text-white rounded-md p-3 box my-3">
                    Maestrias
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Diplomados, userRoles) && (<li className="mb-3">
                <Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=diplomados' }}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Diplomados
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Carreras, userRoles) && (<li className="mb-3">
                <Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=carreras' }}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Carreras
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Materias, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.MATERIA.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Materias
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Certificaciones, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.CERTIFICACION.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Certificaciones
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Contactos, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.CONTACTO.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Contactos
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Departamentos, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.DEPARTAMENTO.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Departamentos
                </Link>
            </li>)}
            {hasPermission(pagePermissions.Usuarios, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.USUARIO.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Usuarios
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Noticias, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.NOTICIA.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Noticias
                </Link>
            </li>)}

            {hasPermission(pagePermissions.Revistas, userRoles) && (<li className="mb-3">
                <Link to={Routes.ADMIN.REVISTA.LISTAR}
                    className="bg-blue-500 text-white rounded-md p-3">
                    Revistas
                </Link>
            </li>)}
        </ul>
    </>);
}

export default AdminDashboardPage;