import { useEffect, useState } from "react";
import { CarreraService } from "../../../services/CarreraService";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Curso } from "../../../models/Curso";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";
import SearchBarComponent from "../../../components/common/SearchBarComponent";
import { Certificacion } from "../../../models/Certificacion";
import { CertificacionService } from "../../../services/CertificacionService";
import AssignCertificacionModal from "../../../components/pageSpecific/AssignModals.tsx/AssignCertificacionModal";

const TABLE_HEAD = ["Título", "Tipo", "", " "];

const AssignCertificacionesPage = () => {
    const [carreras, setCarreras] = useState<Curso[]>([]);
    const [certificaciones, setCertificaciones] = useState<Certificacion[]>([]);
    const [selectedCarrera, setSelectedCarrera] = useState<Curso>();
    const [searchCarreraResults, setSearchCarreraResults] = useState<Curso[]>([]);
    const [searchCertificacionResults, setSearchCertificacionResults] = useState<Certificacion[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        setSearchTerm("");
        setSearchCertificacionResults([]);
        fetchCarreras();
    }, []);

    const fetchCarreras = () => {
        CarreraService.list().then((carreras) => {
            setCarreras(carreras);
            setSearchCarreraResults(carreras);
        });
    }

    useEffect(() => {
        setSearchTerm("");
        setSearchCertificacionResults([]);
        fetchCertificaciones();
    }, [selectedCarrera]);

    const fetchCertificaciones = () => {
        if (!selectedCarrera) return;
        CarreraService.get(selectedCarrera.slug).then((curso) => {
            setCertificaciones(curso.carrera?.certificaciones || []);
            setSearchCertificacionResults(curso.carrera?.certificaciones || []);
        });
    }

    useEffect(() => {
        if (searchTerm === "") {
            setSearchCertificacionResults(certificaciones);
            setSearchCarreraResults(carreras);
            return;
        }

        if (!selectedCarrera) {
            const results = carreras.filter((curso) =>
                curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                curso.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                curso.semestres.toString().includes(searchTerm.toLowerCase())
            );
            setSearchCarreraResults(results);
        } else {
            const results = certificaciones.filter((certificacion) =>
                certificacion.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchCertificacionResults(results);
        }
    }, [carreras, certificaciones, searchTerm, selectedCarrera]);

    const confirmAssign = () => {
        fetchCertificaciones();
        setIsAssignModalOpen(false);
    }

    const handleDelete = (id: number) => {
        setIsDeleteModalOpen(true);
        setDeleteId(id);
    }

    const confirmDelete = () => {
        CertificacionService.delete(deleteId).then(() => {
            setIsDeleteModalOpen(false);
            setDeleteId(0);
            fetchCertificaciones();
        });
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(0);
    }

    const handleEdit = (id: number) => {
        setSelectedId(id);
        setIsAssignModalOpen(true);
    }

    return (<>
        <Card className="w-full my-8  max-h-[75vh]">
            <CardHeader className="rounded-none p-4 m-0 flex flex-col justify-between md:flex-row md:items-center"
                floated={false} shadow={false}>
                <Typography color="blue" as="h1" className="text-xl font-bold">
                    Gestionar Certificaciones {selectedCarrera && `de ${selectedCarrera.nombre}`}
                </Typography>
                <div className="flex flex-wrap sm:flex-nowrap w-full shrink-0 gap-2 md:w-max">
                    <SearchBarComponent setSearchTerm={setSearchTerm} />
                    {selectedCarrera && <Button color="blue" onClick={() => { setIsAssignModalOpen(true)}}>
                        Agregar
                    </Button>}
                </div>
            </CardHeader>
            <CardBody className="p-0 overflow-y-auto scroll-container">
                {!selectedCarrera && <>
                    <Typography color="blue" as="h2" className="text-lg font-bold text-center">
                        Seleccione una carrera
                    </Typography>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                        Nombre
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchCarreraResults.map((curso) => (
                                <tr key={curso.id} className="even:bg-blue-gray-50/50">
                                    <td className="p-2">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {curso.nombre}
                                        </Typography>
                                    </td>
                                    <td className="p-2">
                                        <Button color="blue" className="normal-case rounded-full p-2"
                                            onClick={() => setSelectedCarrera(curso)}>
                                            Seleccionar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>}

                {selectedCarrera && <table className="w-full min-w-max table-auto text-left">
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
                        {searchCertificacionResults.map((certificacion) => (
                            <tr key={certificacion.id} className="even:bg-blue-gray-50/50">
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {certificacion.titulo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {certificacion.tipo}
                                    </Typography>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleEdit(certificacion.id!)}>
                                        <FontAwesomeIcon icon={faPen} className="h-4 w-4 rounded-full bg-blue-500 p-2" />
                                    </Button>
                                </td>
                                <td className="p-2">
                                    <Button variant="text" color="white" onClick={() => handleDelete(certificacion.id!)}>
                                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4 rounded-full bg-red-500 p-2" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {searchCertificacionResults.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4">
                                    <Typography color="blue-gray" className="font-normal">
                                        No se encontraron resultados
                                    </Typography>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>}
            </CardBody>
        </Card>

        <AssignCertificacionModal isOpen={isAssignModalOpen} onCancel={() => setIsAssignModalOpen(false)}
            onConfirm={confirmAssign} certificacionId={selectedId} carrera_id={selectedCarrera?.carrera?.id ?? 0} />

        <DeleteConfirmModal isOpen={isDeleteModalOpen} onCancel={cancelDelete}
            onConfirm={confirmDelete} title={"Eliminar Certificación"}
            message="¿Está seguro que desea eliminar la certificación?" />
    </>);
}

export default AssignCertificacionesPage;