import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBarComponent from "../../common/SearchBarComponent";
import { Contacto } from "../../../models/Contacto";
import { ContactoService } from "../../../services/ContactoService";

type Props = {
    isOpen: boolean,
    onCancel: () => void,
    onConfirm: (assignedContacto: Contacto, cargo: string) => void,
    assignedContactos: Contacto[]
}

const AssignContactoModal = ({ isOpen, onCancel, onConfirm, assignedContactos }: Props) => {
    const [availableContactos, setAvailableContactos] = useState<Contacto[]>([]);
    const [selectedContactoId, setSelectedContactoId] = useState(0);
    const [cargo, setCargo] = useState("");
    const [cargoError, setCargoError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const selectedContacto = availableContactos.find((contacto) => contacto.id === selectedContactoId);

    useEffect(() => {
        if (!isOpen) {
            handleClose();
            return;
        }
        fetchContactos();
    }, [isOpen]);

    const fetchContactos = () => {
        ContactoService.list().then((contactos) => {
            setAvailableContactos(filterContactos(contactos));
        });
    }

    const filterContactos = (contactos: Contacto[]) => {
        return contactos.filter((contacto) => {
            return !assignedContactos.some((c) => c.id === contacto.id);
        });
    }

    const handleClose = () => {
        setSelectedContactoId(0);
        setSearchTerm("");
        setAvailableContactos([]);
        setCargo("");
        setCargoError(false); 
        setIsSaving(false);
    }

    const handleConfirm = () => {
        if (!selectedContacto) return;
        if (!cargo) {
            setCargoError(true);
            return;
        }
        setIsSaving(true);
        onConfirm(selectedContacto, cargo);
    }

    return (<Dialog open={isOpen} handler={onCancel} className="border">
        <DialogHeader className="text-blue-500 border-0 border-b">Asignar Contactos</DialogHeader>
        <DialogBody>
            <Input type="text" label="Cargo" size="md" id="cargo" placeholder="Ingrese el cargo del contacto"
                value={cargo} onChange={(e) => setCargo(e.target.value)} error={cargoError} />
            <hr className="my-4" />
            <SearchBarComponent setSearchTerm={setSearchTerm} containerClassNames="mx-auto mb-4" />
            <div className="max-h-[40vh] overflow-y-auto scroll-container">
                {availableContactos.map((contacto) => (
                    (contacto.nombre.toLowerCase().includes(searchTerm) ||
                        contacto.correo.toLowerCase().includes(searchTerm) ||
                        contacto.celular.toString().includes(searchTerm) ||
                        contacto.fijo.toString().includes(searchTerm)) &&
                    <div key={contacto.id} className="mb-3 border-b-2 border-blue-500 flex items-center justify-between">
                        <p className="text-gray-500">
                            {contacto.nombre} | {contacto.correo} | {contacto.celular} | {contacto.fijo}
                        </p>
                        {selectedContactoId === contacto.id ?
                            <Button variant="text" color="white" onClick={() => setSelectedContactoId(0)} className="p-0">
                                <FontAwesomeIcon color="red" icon={faX} className="h-4 w-4 p-2 m-0" />
                            </Button> :
                            <Button variant="text" color="white" onClick={() => setSelectedContactoId(contacto.id!)} className="p-0">
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
            <Button color="blue" onClick={handleConfirm} disabled={!selectedContacto || isSaving}>
                {isSaving ? "Guardando..." : "Confirmar"}
            </Button>
        </DialogFooter>
    </Dialog>);
}

export default AssignContactoModal;