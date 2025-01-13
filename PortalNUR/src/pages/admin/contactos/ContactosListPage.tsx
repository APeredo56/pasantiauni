import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import SearchBarComponent from "../../../components/common/SearchBarComponent";
import { Contacto } from "../../../models/Contacto";
import { ContactoService } from "../../../services/ContactoService";

const TABLE_HEAD = ["Nombre", "Correo", "Celular", "Fijo", "Departamentos", "", " "];

const ContactosListPage = () => {
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [searchResults, setSearchResults] = useState<Contacto[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchTerm("");
        fetchContactos();
    }, []);

    const fetchContactos = () => {
        ContactoService.list().then((contactos) => {
            setContactos(contactos);
            setSearchResults(contactos);
        });
    }

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults(contactos);
            return;
        }
        const results = contactos.filter((contacto) =>
            contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contacto.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contacto.celular.toString().includes(searchTerm.toLowerCase()) ||
            contacto.fijo.toString().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [contactos, searchTerm]);

    const handleDelete = (id: number) => {
        setIsDeleteModalOpen(true);
        setDeleteId(id);
    }

    const confirmDelete = () => {
        ContactoService.delete(deleteId).then(() => {
            setIsDeleteModalOpen(false);
            setDeleteId(0);
            fetchContactos();
        });
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(0);
    }

    return (<>
        <Card className="w-full my-8  max-h-[75vh]">
            <CardHeader className="rounded-none p-4 m-0 flex flex-col justify-between md:flex-row md:items-center"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">Gestionar Contactos</Typography>
                <div className="flex flex-wrap sm:flex-nowrap w-full shrink-0 gap-2 md:w-max">
                    <SearchBarComponent setSearchTerm={setSearchTerm} />
                    <Button color="blue" onClick={() => navigate(Routes.ADMIN.CONTACTO.CREAR)}>
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
                        {searchResults.map((contacto) => (
                            <tr key={contacto.id} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contacto.nombre}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contacto.correo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contacto.celular}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contacto.fijo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button color="blue" className="normal-case rounded-full p-2"
                                        onClick={() => navigate(Routes.ADMIN.CONTACTO.ASIGNAR_DEPARTAMENTO_PARAM(contacto.id))}>
                                        Asignar Departamentos
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Typography as="a" href={Routes.ADMIN.CONTACTO.EDITAR_PARAM(contacto.id)} variant="small" color="white">
                                        <FontAwesomeIcon icon={faPen} className="h-4 w-4 rounded-full bg-blue-500 p-2" />
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleDelete(contacto.id!)}>
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
            onConfirm={confirmDelete} title="Eliminar Contacto"
            message="¿Está seguro que desea eliminar el contacto?" />
    </>);
}

export default ContactosListPage;