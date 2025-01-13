import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import { Contacto } from "../../../models/Contacto";
import { Departamento } from "../../../models/Departamento";
import { ContactoService } from "../../../services/ContactoService";
import AssignDepartamentoModal from "../../../components/pageSpecific/AssignModals.tsx/AssignDepartamentoModal";

const TABLE_HEAD = ["Nombre", "Cargo", " "];

const AssignDepartamentosPage = () => {
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [contacto, setContacto] = useState<Contacto | null>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isUnassignModalOpen, setIsUnassignModalOpen] = useState(false);
    const [unassignId, setUnassignId] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        fetchContacto();
    }, []);

    const fetchContacto = () => {
        if (!id) return;
        ContactoService.get(parseInt(id)).then((contacto) => {
            setContacto(contacto);
            setDepartamentos(contacto.departamentos ?? []);
        });
    }

    const handleUnassign = (id: number) => {
        setIsUnassignModalOpen(true);
        setUnassignId(id);
    }

    const confirmUnassign = () => {
        if (!id) return;
        ContactoService.unassignDepartamento(parseInt(id), unassignId).then(() => {
            fetchContacto();
            setIsUnassignModalOpen(false);
            setUnassignId(0);
        });
    }

    const cancelUnassign = () => {
        setIsUnassignModalOpen(false);
        setUnassignId(0);
    }

    const confirmAssign = (assignedDepartamento: Departamento, cargo: string) => {
        if (!id) return;
        ContactoService.assignDepartamento(parseInt(id), assignedDepartamento.id!, cargo).then(() => {
            fetchContacto();
            setIsAssignModalOpen(false);
        });
    }

    return (<>
        <Card className="w-full my-8  max-h-[75vh]">
            <CardHeader className="p-4 m-0 flex flex-col justify-between md:flex-row md:items-center rounded-none"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">Gestionar Departamentos para {contacto?.nombre}</Typography>
                <Button color="blue" onClick={() => setIsAssignModalOpen(true)}>
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
                        {departamentos.map((departamento) => (
                            <tr key={departamento.id} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {departamento.nombre}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {departamento.cargo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleUnassign(departamento.id!)}>
                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4 rounded-full bg-red-500 p-2" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
        <DeleteConfirmModal isOpen={isUnassignModalOpen} onCancel={cancelUnassign}
            onConfirm={confirmUnassign} title="Desasignar Departamento"
            message="¿Está seguro que desea desasignar el departamento?" />
        <AssignDepartamentoModal isOpen={isAssignModalOpen} onCancel={() => setIsAssignModalOpen(false)}
            onConfirm={confirmAssign} assignedDepartamentos={departamentos} />
    </>);
}

export default AssignDepartamentosPage;