import { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    IconButton,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Menu,
    MenuHandler,
    MenuList,
    ListItem,
} from "@material-tailwind/react";
import { Routes } from '../../routes/CONSTANTS';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom" allowHover={true}>
        <MenuHandler>
            <Typography className="text-md hidden lg:block" as="div">
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    Otros Servicios
                    <FontAwesomeIcon icon={faChevronDown}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                </ListItem>
            </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block">
            {otherServicesLinks}
        </MenuList>
    </Menu>);
}

const otherServicesLinks = (
    <ul className="flex flex-col gap-2 !outline-none text-white lg:text-black">
        <Link to={Routes.ABOUT.DEFAULT} className="border-b lg:border-0 text-base">
            Conociendo la Nur
        </Link>
        <Link to={Routes.NOTICIAS.DEFAULT} className="border-b lg:border-0 text-base">
            Actividades
        </Link>
        <Typography as={"a"} href="https://biblio.nur.edu/" className="border-b lg:border-0">
            Biblioteca
        </Typography>
        <Typography as={"a"} href="https://iics.nur.edu/" className="border-b lg:border-0">
            Centro Investigación
        </Typography>
        <Link to={Routes.REVISTAS.DEFAULT} className="border-b lg:border-0 text-base">
            Investigación Estudiantil
        </Link>
        <Typography as={"a"} href="http://unirse.nur.edu/" className="border-b lg:border-0">
            Unirse
        </Typography>
    </ul>
);
const navLinks = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 lg:text-center">
        <Link to={Routes.CURSOS.POSTGRADO.DEFAULT} className="border-b lg:border-0">
            Postgrado
        </Link>
        <Link to={Routes.CURSOS.PREGRADO.DEFAULT} className="border-b lg:border-0">
            Pregrado
        </Link>
        <Link to={Routes.IDIOMAS.DEFAULT} className="border-b lg:border-0">
            Idiomas
        </Link>
        <Link to="https://cvsc.nur.edu/" className="border-b lg:border-0">
            Plataforma Virtual
        </Link>
        <Link to="https://notas2.nur.edu/" className="border-b lg:border-0">
            Consulta Notas
        </Link>
        <Link to={Routes.CONTACTOS.DEFAULT} className="border-b lg:border-0">
            Contactos
        </Link>
        <NavListMenu />
    </ul>
);

const TopNabvarComponent = () => {
    const [openNav, setOpenNav] = useState(false);
    const [openServices, setOpenServices] = useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="sticky top-0 z-[100] p-0 rounded-none bg-primary" color="blue" fullWidth>
            <div className="max-w-screen-2xl m-auto p-3 flex items-center justify-between min-h-10">
                <Link to={Routes.HOME} className=" z-10">
                    <img src="/images/logo.png" alt="Logo" className="max-w-[150px] h-auto" />
                </Link>
                <div className="mr-4 hidden lg:block">{navLinks}</div>
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
            <Collapse open={openNav} className="px-8 max-h-72 overflow-scroll">
                {navLinks}
                <Accordion open={openServices} className="mb-8" icon={
                    <FontAwesomeIcon icon={faChevronDown}
                        className={`h-3 w-3 transition-transform ${openServices ? "rotate-180" : ""}`} />
                } >
                    <AccordionHeader onClick={() => setOpenServices(!openServices)}
                        className="text-base text-white hover:text-white pb-0 pt-2">
                        Otros Servicios
                    </AccordionHeader>
                    <AccordionBody className="text-white ps-8 pb-0">
                        {otherServicesLinks}
                    </AccordionBody>
                </Accordion>
            </Collapse>
        </Navbar>
    );
}

export default TopNabvarComponent;