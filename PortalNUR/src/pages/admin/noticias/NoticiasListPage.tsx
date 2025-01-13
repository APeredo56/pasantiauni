import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import SearchBarComponent from "../../../components/common/SearchBarComponent";
import { useEffect, useState } from "react";
import { NoticiaPagination } from "../../../models/NoticiaPagination";
import { useNavigate } from "react-router-dom";
import { NoticiaService } from "../../../services/NoticiaService";
import { Routes } from "../../../routes/CONSTANTS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import PaginationComponent from "../../../components/common/PaginationComponent";
import { TipoNoticiaEnum } from "../../../models/enums/TipoNoticiaEnum";

const TABLE_HEAD = ["Titulo", "Tipo", "Contenido", "", " "];

const NoticiasListPage = () => {
    const [noticias, setNoticias] = useState<NoticiaPagination>();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = () => {
        NoticiaService.list().then((noticias) => {
            setNoticias(noticias);
        });
    }

    const searchNoticias = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm) {
            fetchNoticias();
            return;
        }
        NoticiaService.search(searchTerm).then((noticias) => {
            setNoticias(noticias);
        });
    }

    const handleDelete = (slug: string) => {
        setIsDeleteModalOpen(true);
        setDeleteSlug(slug);
    }

    const confirmDelete = () => {
        NoticiaService.delete(deleteSlug).then(() => {
            setIsDeleteModalOpen(false);
            setDeleteSlug("");
            fetchNoticias();
        });
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteSlug("");
    }

    const handlePageChange = (page: number) => {
        const url = noticias?.links.find((link) => link.label === page.toString())?.url;
        NoticiaService.getPageByUrl(url ?? "").then((noticias) => {
            setNoticias(noticias);
        });
    }

    return (<>
        <Card className="w-full my-8">
            <CardHeader className="rounded-none p-4 m-0 flex flex-col justify-between md:flex-row md:items-center"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">Gestionar Noticias</Typography>
                <div className="flex flex-wrap sm:flex-nowrap w-full shrink-0 gap-2 md:w-max">
                    <Button color="blue" onClick={() => navigate(Routes.ADMIN.NOTICIA.CREAR)}>
                        Crear Noticia
                    </Button>
                    <SearchBarComponent setSearchTerm={setSearchTerm} onSubmit={searchNoticias} />
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
                        {noticias?.data.map((noticia) => (
                            <tr key={noticia.id} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {noticia.titulo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {noticia.tipo}
                                    </Typography>
                                </td>
                                {noticia.tipo === TipoNoticiaEnum.ARTICULO ? <td className="p-2">
                                    <Button color="blue" className="normal-case rounded-full p-2"
                                        onClick={() => navigate(Routes.ADMIN.NOTICIA.CONTENIDO_PARAM(noticia.slug))}>
                                        Asignar Contenido
                                    </Button>
                                </td> : <td className="p-2 max-w-48">{noticia.enlace_url}</td>}
                                <td className="p-2">
                                    <Typography as="a" href={Routes.ADMIN.NOTICIA.EDITAR_PARAM(noticia.slug)} variant="small" color="white">
                                        <FontAwesomeIcon icon={faPen} className="h-4 w-4 rounded-full bg-blue-500 p-2" />
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleDelete(noticia.slug!)}>
                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4 rounded-full bg-red-500 p-2" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {noticias?.data.length === 0 && (
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
            <CardFooter className="flex justify-center">
                <PaginationComponent pages={noticias?.last_page ?? 0}
                    currentPage={noticias?.current_page ?? 0} changePage={handlePageChange}/>
            </CardFooter>
        </Card>
        <DeleteConfirmModal isOpen={isDeleteModalOpen} onCancel={cancelDelete}
            onConfirm={confirmDelete} title="Eliminar Noticia"
            message="¿Está seguro que desea eliminar la noticia?" />
    </>);
}

export default NoticiasListPage;