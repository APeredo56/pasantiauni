import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { TipoCertificacionEnum } from "../../../models/enums/TipoCertificacionEnum";
import { CertificacionService } from "../../../services/CertificacionService";

type Props = {
    isOpen: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    certificacionId: number,
    carrera_id: number
}

const AssignCertificacionModal = ({ isOpen, onCancel, onConfirm, certificacionId, carrera_id }: Props) => {
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState<TipoCertificacionEnum>(TipoCertificacionEnum.UNSET);
    const [tituloError, setTituloError] = useState(false);
    const [tipoError, setTipoError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            handleClose();
            return;
        }
        if (certificacionId > 0) fetchCertificacion();
    }, [isOpen]);

    const fetchCertificacion = () => {
        CertificacionService.get(certificacionId).then((certificacion) => {
            setTitulo(certificacion.titulo);
            setTipo(certificacion.tipo);
        });
    }

    const handleClose = () => {
        setTitulo("");
        setTipo(TipoCertificacionEnum.UNSET);
        setTituloError(false);
        setTipoError(false);
        setIsSaving(false);
    }

    const handleConfirm = () => {
        if (!titulo) {
            setTituloError(true);
            return;
        }
        if (tipo === TipoCertificacionEnum.UNSET) {
            setTipoError(true);
            return;
        }
        setIsSaving(true);
        if (certificacionId > 0) {
            CertificacionService.update(certificacionId, { titulo, tipo, carrera_id }).then(() => {
                setIsSaving(false);
                onConfirm();
            });
        } else {
            CertificacionService.create({ id: certificacionId, titulo, tipo, carrera_id }).then(() => {
                setIsSaving(false);
                onConfirm();
            });
        }
    }

    return (<Dialog open={isOpen} handler={onCancel} className="border">
        <DialogHeader className="text-blue-500 border-0 border-b">
            {certificacionId > 0 ? 'Editar' : "Crear"} Certificación
        </DialogHeader>
        <DialogBody className="gap-5 flex flex-col">
            <Input type="text" label="Título" size="md" id="certificacion" placeholder="Ingrese el título de la certificación"
                value={titulo} onChange={(e) => setTitulo(e.target.value)} error={tituloError} />

            <Select label="Tipo" value={tipo} error={tipoError}
                onChange={(value) => setTipo(value as TipoCertificacionEnum)}>
                <Option value={TipoCertificacionEnum.UNSET}>{TipoCertificacionEnum.UNSET}</Option>
                <Option value={TipoCertificacionEnum.INTERMEDIA}>{TipoCertificacionEnum.INTERMEDIA}</Option>
                <Option value={TipoCertificacionEnum.MENCION}>{TipoCertificacionEnum.MENCION}</Option>
            </Select>
        </DialogBody>
        <DialogFooter className="border-0 border-t">
            <Button variant="outlined" onClick={onCancel} className="mr-1">
                Cancelar
            </Button>
            <Button color="blue" onClick={handleConfirm} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar"}
            </Button>
        </DialogFooter>
    </Dialog>);
}

export default AssignCertificacionModal;