import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Modulo } from "../../../models/Modulo";
import { ModuloService } from "../../../services/ModuloService";
import { Departamento } from "../../../models/Departamento";
import { DepartamentoService } from "../../../services/DepartamentoService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const ModulosListPage = () => {
    const [modulos, setModulos] = useState<Modulo[]>([]);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedModuloId, setSelectedModuloId] = useState<number>(0);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<number>(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchModulos();
        fetchDepartamentos();
    }, []);

    const fetchModulos = () => {
        ModuloService.list()
            .then(modulos => setModulos(modulos))
            .catch(error => console.error(error));
    }

    const fetchDepartamentos = () => {
        DepartamentoService.list()
            .then(departamentos => setDepartamentos(departamentos))
            .catch(error => console.error(error));
    }

    const handleAssignClick = (moduloId: number) => {
        setSelectedModuloId(moduloId);
        setAssignModalOpen(true);
    }

    const handleClose = () => {
        setSelectedModuloId(0);
        setSelectedDepartamentoId(0);
        setAssignModalOpen(false);
        setIsSaving(false);
    }

    const handleConfirm = () => {
        if (!selectedDepartamentoId) return;
        ModuloService.assignDepartamento(selectedModuloId, selectedDepartamentoId)
            .then(() => {
                fetchModulos();
                handleClose();
            })
            .catch(error => console.error(error));
    }

    return (<>
        <Typography color="blue" as="h1" className="text-xl font-bold my-5">Gestionar Módulos</Typography>
        <div className="flex gap-5 flex-wrap justify-center">
            {modulos.map(modulo => (
                <Card key={modulo.id} className="w-64 p-4 flex flex-col justify-between">
                    <Typography color="blue" as="h2" className="text-lg font-bold mb-5">{modulo.nombre}</Typography>
                    <div className="mb-5">
                        <Typography as="p" className="text-gray-500">Departamento Asignado:</Typography>
                        <Typography as="p" className="text-gray-500">{modulo.departamentos?.map(departamento => departamento.nombre).join(", ")}</Typography>
                    </div>
                    <Button onClick={() => handleAssignClick(modulo.id)} color="blue">Asignar Departamento</Button>
                </Card>
            ))}
        </div>

        <Dialog open={isAssignModalOpen} handler={setAssignModalOpen} className="border">
            <DialogHeader className="text-blue-500 border-0 border-b">Asignar Departamento</DialogHeader>
            <DialogBody>
                <div className="max-h-[40vh] overflow-y-auto scroll-container">
                    {departamentos.map((departamento) => (
                        <div key={departamento.id} className="mb-3 border-b-2 border-blue-500 flex items-center justify-between">
                            <p className="text-gray-500">
                                {departamento.nombre}
                            </p>
                            {selectedDepartamentoId === departamento.id ?
                                <Button variant="text" color="white" onClick={() => setSelectedDepartamentoId(0)} className="p-0">
                                    <FontAwesomeIcon color="red" icon={faX} className="h-4 w-4 p-2 m-0" />
                                </Button> :
                                <Button variant="text" color="white" onClick={() => setSelectedDepartamentoId(departamento.id!)} className="p-0">
                                    <FontAwesomeIcon color="blue" icon={faPlus} className="h-4 w-4 p-2 m-0" />
                                </Button>}
                        </div>
                    ))}
                </div>
            </DialogBody>
            <DialogFooter className="border-0 border-t">
                <Button variant="outlined" onClick={() => handleClose()} className="mr-1">
                    Cancelar
                </Button>
                <Button color="blue" onClick={handleConfirm} disabled={!selectedDepartamentoId || isSaving}>
                    {isSaving ? "Guardando..." : "Confirmar"}
                </Button>
            </DialogFooter>
        </Dialog>
    </>);
}

export default ModulosListPage;