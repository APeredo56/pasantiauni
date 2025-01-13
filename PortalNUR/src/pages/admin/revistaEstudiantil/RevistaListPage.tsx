import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import { RevistaEstudiantil } from "../../../models/RevistaEstudiantil";
import { RevistaEstudiantilService } from "../../../services/RevistaEstudiantilService";

const TABLE_HEAD = ["Titulo", "Subtitulo", "", " "];

const RevistaListPage = () => {
    const [revistas, setRevistas] = useState<RevistaEstudiantil[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteSlug, setDeleteSlug] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchMaterias();
    }, []);

    const fetchMaterias = () => {
        RevistaEstudiantilService.list().then((revistas) => {
            setRevistas(revistas);
        });
    }

    const handleDelete = (slug: string) => {
        setIsDeleteModalOpen(true);
        setDeleteSlug(slug);
    }

    const confirmDelete = () => {
        RevistaEstudiantilService.delete(deleteSlug).then(() => {
            setIsDeleteModalOpen(false);
            setDeleteSlug("");
            fetchMaterias();
        });
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteSlug("");
    }

    return (<>
        <Card className="w-full my-8  max-h-[75vh]">
            <CardHeader className="rounded-none p-4 m-0 flex flex-col justify-between md:flex-row md:items-center"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">Gestionar Revistas</Typography>
                <Button color="blue" onClick={() => navigate(Routes.ADMIN.REVISTA.CREAR)}>
                    Agregar
                </Button>
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
                        {revistas.map((revista) => (
                            <tr key={revista.id} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {revista.titulo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {revista.subtitulo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography as="a" href={Routes.ADMIN.REVISTA.EDITAR_PARAM(revista.slug)} variant="small" color="white">
                                        <FontAwesomeIcon icon={faPen} className="h-4 w-4 rounded-full bg-blue-500 p-2" />
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleDelete(revista.slug!)}>
                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4 rounded-full bg-red-500 p-2" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
        <DeleteConfirmModal isOpen={isDeleteModalOpen} onCancel={cancelDelete}
            onConfirm={confirmDelete} title="Eliminar Revista"
            message="¿Está seguro que desea eliminar la revista?" />
    </>);
}

export default RevistaListPage;