import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Departamento } from "../../../models/Departamento";
import { DepartamentoService } from "../../../services/DepartamentoService";

type Props = {
    isOpen: boolean,
    onCancel: () => void,
    onConfirm: (assignedDepartamento: Departamento, cargo: string) => void,
    assignedDepartamentos: Departamento[]
}

const AssignDepartamentoModal = ({ isOpen, onCancel, onConfirm, assignedDepartamentos }: Props) => {
    const [availableDepartamentos, setAvailableDepartamentos] = useState<Departamento[]>([]);
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState(0);
    const [cargo, setCargo] = useState("");
    const [cargoError, setCargoError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const selectedDepartamento = availableDepartamentos.find((departamento) => departamento.id === selectedDepartamentoId);

    useEffect(() => {
        if (!isOpen) {
            handleClose();
            return;
        }
        fetchDepartamentos();
    }, [isOpen]);

    const fetchDepartamentos = () => {
        DepartamentoService.list().then((departamento) => {
            setAvailableDepartamentos(filterDepartamentos(departamento));
        });
    }

    const filterDepartamentos = (departamentos: Departamento[]) => {
        return departamentos.filter((contacto) => {
            return !assignedDepartamentos.some((c) => c.id === contacto.id);
        });
    }

    const handleClose = () => {
        setSelectedDepartamentoId(0);
        setAvailableDepartamentos([]);
        setCargo("");
        setCargoError(false); 
        setIsSaving(false);
    }

    const handleConfirm = () => {
        if (!selectedDepartamento) return;
        if (!cargo) {
            setCargoError(true);
            return;
        }
        setIsSaving(true);
        onConfirm(selectedDepartamento, cargo);
    }

    return (<Dialog open={isOpen} handler={onCancel} className="border">
        <DialogHeader className="text-blue-500 border-0 border-b">Asignar Contactos</DialogHeader>
        <DialogBody>
            <Input type="text" label="Cargo" size="md" id="cargo" placeholder="Ingrese el cargo del contacto"
                value={cargo} onChange={(e) => setCargo(e.target.value)} error={cargoError} />
            <hr className="my-4" />
            <div className="max-h-[40vh] overflow-y-auto scroll-container">
                {availableDepartamentos.map((departamento) => (
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
            <Button variant="outlined" onClick={onCancel} className="mr-1">
                Cancelar
            </Button>
            <Button color="blue" onClick={handleConfirm} disabled={!selectedDepartamento || isSaving}>
                {isSaving ? "Guardando..." : "Confirmar"}
            </Button>
        </DialogFooter>
    </Dialog>);
}

export default AssignDepartamentoModal;