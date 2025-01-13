import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import SearchBarComponent from "../../../components/common/SearchBarComponent";
import { Contacto } from "../../../models/Contacto";
import { CursoService } from "../../../services/CursoService";
import { Curso } from "../../../models/Curso";
import AssignContactoModal from '../../../components/pageSpecific/AssignModals.tsx/AssignContactoModal';

const TABLE_HEAD = ["Nombre", "Correo", "Celular", "Fijo", "Cargo", " "];

const AssignContactosPage = () => {
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [curso, setCurso] = useState<Curso | null>(null);
    const [searchResults, setSearchResults] = useState<Contacto[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
    const [unassignId, setUnassignId] = useState(0);
    const { slug } = useParams();

    useEffect(() => {
        fetchCurso();
    }, []);

    const fetchCurso = () => {
        if (!slug) return;
        CursoService.get(slug).then((curso) => {
            setCurso(curso);
            setContactos(curso.contactos ?? []);
            setSearchResults(curso.contactos ?? []);
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

    const handleUnassign = (id: number) => {
        setIsUnassignModalOpen(true);
        setUnassignId(id);
    }

    const confirmUnassign = () => {
        if (!slug) return;
        CursoService.unassignContacto(slug, unassignId).then(() => {
            fetchCurso();
            setIsUnassignModalOpen(false);
            setUnassignId(0);
        });
    }

    const cancelUnassign = () => {
        setIsUnassignModalOpen(false);
        setUnassignId(0);
    }

    const confirmAssign = (assignedContacto: Contacto, cargo: string) => {
        if (!slug) return;
        CursoService.assignContacto(slug, assignedContacto.id!, cargo).then(() => {
            fetchCurso();
            setIsAssignModalOpen(false);
        });
    }

    return (<>
        <Card className="w-full my-8  max-h-[75vh]">
            <CardHeader className="p-4 m-0 flex flex-col justify-between md:flex-row md:items-center rounded-none"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">Gestionar Contactos para {curso?.nombre}</Typography>
                <div className="flex flex-wrap sm:flex-nowrap w-full shrink-0 gap-2 md:w-max">
                    <SearchBarComponent setSearchTerm={setSearchTerm} />
                    <Button color="blue" onClick={() => setIsAssignModalOpen(true)}>
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
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {contacto.cargo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleUnassign(contacto.id!)}>
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
        <DeleteConfirmModal isOpen={isUnassignModalOpen} onCancel={cancelUnassign}
            onConfirm={confirmUnassign} title="Desasignar Contacto"
            message="¿Está seguro que desea desasignar el contacto?" />
        <AssignContactoModal isOpen={isAssignModalOpen} onCancel={() => setIsAssignModalOpen(false)}
            onConfirm={confirmAssign} assignedContactos={contactos} />
    </>);
}

export default AssignContactosPage;