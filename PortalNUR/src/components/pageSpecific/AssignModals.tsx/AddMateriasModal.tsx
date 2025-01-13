import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Semestre } from '../../../models/Pensum';
import { useEffect, useState } from "react";
import { Materia } from '../../../models/Materia';
import { MateriaService } from "../../../services/MateriaService";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBarComponent from "../../common/SearchBarComponent";

type Props = {
    isOpen: boolean,
    onCancel: () => void,
    onConfirm: (selectedMaterias: Materia[]) => void,
    semester: Semestre | undefined
}

const AddMateriasModal = ({ isOpen, onCancel, onConfirm, semester }: Props) => {
    const [availableMaterias, setAvailableMaterias] = useState<Materia[]>([]);
    const [selectedMaterias, setSelectedMaterias] = useState<Materia[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setSelectedMaterias([]);
            setSearchTerm("");
            setAvailableMaterias([]);
            return;
        }
        fetchMaterias();
    }, [isOpen]);

    const fetchMaterias = () => {
        MateriaService.list().then((materias) => {
            setAvailableMaterias(filterMaterias(materias));
        });
    }

    const filterMaterias = (materias: Materia[]) => {
        if (!semester) return materias;
        return materias.filter((materia) => {
            return !semester.materias.some((m) => m.id === materia.id);
        });
    }

    const handleAddMateria = (materia: Materia) => {
        setSelectedMaterias([...selectedMaterias, materia]);
    }

    const handleRemoveMateria = (materia: Materia) => {
        setSelectedMaterias(selectedMaterias.filter((m) => m.id !== materia.id));
    }

    return (<Dialog open={isOpen} handler={onCancel} className="border">
        <DialogHeader className="text-blue-500 border-0 border-b">Asignar Materias a Semestre #{semester?.semestre}</DialogHeader>
        <DialogBody className="text-black max-h-[40vh] overflow-y-auto scroll-container">
            <SearchBarComponent setSearchTerm={setSearchTerm} containerClassNames="mx-auto" />
            {availableMaterias.map((materia) => (
                materia.nombre.includes(searchTerm) &&
                <div key={materia.id} className="mb-3 border-b-2 border-blue-500 flex items-center justify-between">
                    <p className="text-gray-500">
                        {materia.nombre}
                    </p>
                    {selectedMaterias.some((selectedMateria) => selectedMateria.id === materia.id) ?
                        <Button variant="text" color="white" onClick={() => handleRemoveMateria(materia)} className="p-0">
                            <FontAwesomeIcon color="red" icon={faX} className="h-4 w-4 p-2 m-0" />
                        </Button> :
                        <Button variant="text" color="white" onClick={() => { handleAddMateria(materia) }} className="p-0">
                            <FontAwesomeIcon color="blue" icon={faPlus} className="h-4 w-4 p-2 m-0" />
                        </Button>}
                </div>
            ))}
        </DialogBody>
        <DialogFooter className="border-0 border-t">
            <Button variant="outlined" onClick={onCancel} className="mr-1">
                <span>Cancelar</span>
            </Button>
            <Button color="blue" onClick={() => onConfirm(selectedMaterias)}>
                <span>Confirmar</span>
            </Button>
        </DialogFooter>
    </Dialog>);
}

export default AddMateriasModal;