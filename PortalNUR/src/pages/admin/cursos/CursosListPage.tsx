import { useEffect, useState } from "react";
import { CarreraService } from "../../../services/CarreraService";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Curso } from "../../../models/Curso";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import SearchBarComponent from "../../../components/common/SearchBarComponent";
import { MaestriaService } from "../../../services/MaestriaService";
import { DiplomadoService } from "../../../services/DiplomadoService";

const TABLE_HEAD = ["Nombre", "Area", "Semestres", "Materias", "Contactos", "", " "];

const CursosListPage = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [searchResults, setSearchResults] = useState<Curso[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState("");
    const navigate = useNavigate();
    const cursoType = new URLSearchParams(useLocation().search).get('tipo');
    const [cursoTypeError, setCursoTypeError] = useState("");

    useEffect(() => {
        setCursoTypeError("");
        setSearchTerm("");
        setSearchResults([]);
        fetchCursos();
    }, [cursoType]);

    const fetchCursos = () => {
        if (!cursoType) {
            setCursoTypeError("No se especificó el tipo de curso");
            return;
        }

        switch (cursoType) {
            case "carreras":
                CarreraService.list().then((carreras) => {
                    setCursos(carreras);
                    setSearchResults(carreras);
                });
                break;
            case "maestrias":
                MaestriaService.list().then((maestrias) => {
                    setCursos(maestrias);
                    setSearchResults(maestrias);
                });
                break;
            case "diplomados":
                DiplomadoService.list().then((diplomados) => {
                    setCursos(diplomados);
                    setSearchResults(diplomados);
                });
                break;
            default:
                setCursoTypeError("Tipo de curso no válido");
                break;
        }
    }

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults(cursos);
            return;
        }
        const results = cursos.filter((curso) =>
            curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            curso.semestres.toString().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [cursos, searchTerm]);

    const handleDelete = (slug: string) => {
        setIsDeleteModalOpen(true);
        setDeleteSlug(slug);
    }

    const confirmDelete = () => {
        CarreraService.delete(deleteSlug).then(() => {
            setIsDeleteModalOpen(false);
            setDeleteSlug("");
            fetchCursos();
        });
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteSlug("");
    }

    const getAddLink = () => {
        switch (cursoType) {
            case "carreras":
                return Routes.ADMIN.PREGRADO.CREAR;
            case "maestrias":
                return Routes.ADMIN.POSTGRADO.CREAR_MAESTRIA;
            case "diplomados":
                return Routes.ADMIN.POSTGRADO.CREAR_DIPLOMADO;
            default:
                return "";
        }
    }

    const getEditLink = (slug: string) => {
        switch (cursoType) {
            case "carreras":
                return Routes.ADMIN.PREGRADO.EDITAR_PARAM(slug);
            case "maestrias":
                return Routes.ADMIN.POSTGRADO.EDITAR_MAESTRIA_PARAM(slug);
            case "diplomados":
                return Routes.ADMIN.POSTGRADO.EDITAR_DIPLOMADO_PARAM(slug);
            default:
                return "";
        }
    }

    return (<>
        {cursoTypeError && (
            <Typography color="red" className="font-bold text-center">
                {cursoTypeError}
            </Typography>
        )}
        <Card className="w-full my-8  max-h-[75vh]">
            <CardHeader className="rounded-none p-4 m-0 flex flex-col justify-between md:flex-row md:items-center"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">Gestionar {cursoType}</Typography>
                <div className="flex flex-wrap sm:flex-nowrap w-full shrink-0 gap-2 md:w-max">
                    <SearchBarComponent setSearchTerm={setSearchTerm} />
                    <Button color="blue" onClick={() => navigate(getAddLink())}>
                        Agregar
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="p-0 overflow-y-auto scroll-container">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((curso) => (
                            <tr key={curso.id} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {curso.nombre}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {curso.area}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {curso.semestres}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button color="blue" className="normal-case rounded-full p-2"
                                        onClick={() => navigate(Routes.ADMIN.CURSO.ASIGNAR_MATERIAS_PARAM(curso.slug))}>
                                        Asignar Materias
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Button color="blue" className="normal-case rounded-full p-2"
                                        onClick={() => navigate(Routes.ADMIN.CURSO.ASIGNAR_CONTACTOS_PARAM(curso.slug))}>
                                        Asignar Contactos
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Typography as="a" href={getEditLink(curso.slug)} variant="small" color="white">
                                        <FontAwesomeIcon icon={faPen} className="h-4 w-4 rounded-full bg-blue-500 p-2" />
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleDelete(curso.slug)}>
                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4 rounded-full bg-red-500 p-2" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {searchResults.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4">
                                    <Typography color="blue-gray" className="font-normal">
                                        No se encontraron resultados
                                    </Typography>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
        <DeleteConfirmModal isOpen={isDeleteModalOpen} onCancel={cancelDelete}
            onConfirm={confirmDelete} title={"Eliminar " + cursoType}
            message="¿Está seguro que desea eliminar el curso?" />
    </>);
}

export default CursosListPage;