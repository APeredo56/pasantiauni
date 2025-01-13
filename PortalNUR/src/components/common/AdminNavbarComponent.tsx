import { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    IconButton,
    Typography,
    Menu,
    MenuHandler,
    ListItem,
    MenuList,
} from "@material-tailwind/react";

import { Routes } from '../../routes/CONSTANTS';
import { useUser } from "../../contexts/user/useUser";
import { RoleEnum } from "../../models/enums/RoleEnum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { hasPermission, pagePermissions } from "../../utils/permissionUtils";

const postgradoLinks = () => {
    return (<ul className="flex flex-col gap-2 text-black !outline-none text-base">
        <li><Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=maestrias' }}>Maestrias</Link></li>
        <li><Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=diplomados' }}>Diplomados</Link></li>
        <li><Link to={Routes.ADMIN.MATERIA.LISTAR}>Materias</Link></li>
    </ul>);
}

const pregradoLinks = () => {
    return (<ul className="flex flex-col gap-2 text-black !outline-none text-base">
        <li><Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=carreras' }}>Carreras</Link></li>
        <li><Link to={Routes.ADMIN.MATERIA.LISTAR}>Materias</Link></li>
        <li><Link to={Routes.ADMIN.CERTIFICACION.LISTAR}>Certificaciones</Link></li>
    </ul>);
}

const contactosLinks = () => {
    return (<ul className="flex flex-col gap-2 text-black !outline-none text-base">
        <li><Link to={Routes.ADMIN.CONTACTO.LISTAR}>Contactos</Link></li>
        <li><Link to={Routes.ADMIN.DEPARTAMENTO.LISTAR}>Departamentos</Link></li>
        <li><Link to={Routes.ADMIN.MODULO.LISTAR}>Departamentos por Modulo</Link></li>
    </ul>);
}

const otherLinks = (userRoles: Set<RoleEnum>) => {
    return (<ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {hasPermission(pagePermissions.Usuarios, userRoles) && (<li>
            <Link to={Routes.ADMIN.USUARIO.LISTAR}>Usuarios</Link>
        </li>)}

        {hasPermission(pagePermissions.Noticias, userRoles) && (<li>
            <Link to={Routes.ADMIN.NOTICIA.LISTAR}>Noticias</Link>
        </li>)}

        {hasPermission(pagePermissions.Revistas, userRoles) && (<li>
            <Link to={Routes.ADMIN.REVISTA.LISTAR}>Revistas</Link>
        </li>)}
    </ul>);
}

function PostgradoMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom" allowHover={true}>
        <MenuHandler>
            <Typography className="text-md hidden lg:block" as="div">
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Postgrado
                    <FontAwesomeIcon icon={faChevronDown}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </ListItem>
            </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
            {postgradoLinks()}
        </MenuList>
    </Menu>);
}

function PregradoMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom" allowHover={true}>
        <MenuHandler>
            <Typography className="text-md hidden lg:block" as="div">
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Pregrado
                    <FontAwesomeIcon icon={faChevronDown}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </ListItem>
            </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
            {pregradoLinks()}
        </MenuList>
    </Menu>);
}

function ContactosMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom" allowHover={true}>
        <MenuHandler>
            <Typography className="text-md hidden lg:block" as="div">
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Contactos
                    <FontAwesomeIcon icon={faChevronDown}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </ListItem>
            </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
            {contactosLinks()}
        </MenuList>
    </Menu>);
}

const mobileLinks = (userRoles: Set<RoleEnum>) => {
    return (<ul className="my-2 flex flex-col gap-2">
        {hasPermission(pagePermissions.Maestrias, userRoles) && (<li>
            <Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=maestrias' }}>Maestrias</Link>
        </li>)}

        {hasPermission(pagePermissions.Diplomados, userRoles) && (<li>
            <Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=diplomados' }}>Diplomados</Link>
        </li>)}

        {hasPermission(pagePermissions.Carreras, userRoles) && (<li>
            <Link to={{ pathname: Routes.ADMIN.CURSO.LISTAR, search: '?tipo=carreras' }}>Carreras</Link>
        </li>)}

        {hasPermission(pagePermissions.Materias, userRoles) && (<li>
            <Link to={Routes.ADMIN.MATERIA.LISTAR}>Materias</Link>
        </li>)}

        {hasPermission(pagePermissions.Certificaciones, userRoles) && (<li>
            <Link to={Routes.ADMIN.CERTIFICACION.LISTAR}>Certificaciones</Link>
        </li>)}

        {hasPermission(pagePermissions.Contactos, userRoles) && (<li>
            <Link to={Routes.ADMIN.CONTACTO.LISTAR}>Contactos</Link>
        </li>)}

        {hasPermission(pagePermissions.Departamentos, userRoles) && (<li>
            <Link to={Routes.ADMIN.DEPARTAMENTO.LISTAR}>Departamentos</Link>
        </li>)}

        {hasPermission(pagePermissions.Departamentos, userRoles) && (<li>
            <Link to={Routes.ADMIN.MODULO.LISTAR}>Departamentos por Módulo</Link>
        </li>)}

        {hasPermission(pagePermissions.Usuarios, userRoles) && (<li>
            <Link to={Routes.ADMIN.USUARIO.LISTAR}>Usuarios</Link>
        </li>)}

        {hasPermission(pagePermissions.Noticias, userRoles) && (<li>
            <Link to={Routes.ADMIN.NOTICIA.LISTAR}>Noticias</Link>
        </li>)}

        {hasPermission(pagePermissions.Revistas, userRoles) && (<li>
            <Link to={Routes.ADMIN.REVISTA.LISTAR}>Revistas</Link>
        </li>)}
    </ul>);
}

const AdminNavbarComponent = () => {
    const [openNav, setOpenNav] = useState(false);
    const { user, userRoles, signOut } = useUser();

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="top-0 z-[100] p-0 rounded-none bg-primary" color="blue" fullWidth>
            <div className="max-w-screen-2xl m-auto p-3 flex items-center justify-between min-h-10">
                <a href={Routes.ADMIN.DASHBOARD} className=" z-10">
                    <img src="/images/logo.png" alt="Logo" className="max-w-[150px] h-auto" />
                </a>
                <div className="hidden lg:flex">
                    {user && <div className="mr-4 hidden lg:flex gap-2">
                        {(userRoles.has(RoleEnum.SUPERUSUARIO) || userRoles.has(RoleEnum.ADMIN_POSTGRADO)) && <PostgradoMenu />}
                        {(userRoles.has(RoleEnum.SUPERUSUARIO) || userRoles.has(RoleEnum.ADMIN_PREGRADO)) && <PregradoMenu />}
                        {(userRoles.has(RoleEnum.SUPERUSUARIO) || userRoles.has(RoleEnum.ADMIN_CONTACTOS)) && <ContactosMenu />}
                        {otherLinks(userRoles)}
                        <Typography as="button" className="ms-6" onClick={signOut}>Cerrar Sesión</Typography>
                    </div>}
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
                    ) : (
                        <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
                    )}
                </IconButton>
            </div>
            {user && <Collapse open={openNav} className="px-8 max-h-72 overflow-scroll">
                <>
                    {mobileLinks(userRoles)}
                    <Typography as="button" className="pb-3" onClick={signOut}>Cerrar Sesión</Typography>
                </>
            </Collapse>}
        </Navbar>
    );
}

export default AdminNavbarComponent;