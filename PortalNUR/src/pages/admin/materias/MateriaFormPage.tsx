import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react";
import { Materia } from "../../../models/Materia";
import { MateriaService } from "../../../services/MateriaService";

type FormErrors = Partial<Record<keyof Materia, boolean>>;

const MateriaFormPage = () => {
    const [form, setForm] = useState<Materia>({
        nombre: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [requestError, setRequestError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchMateria()
    }, [id]);

    const fetchMateria = () => {
        if (!id) return
        MateriaService.get(parseInt(id)).then((materia) => {
            setForm({ nombre: materia.nombre });
        }).catch((error) => setRequestError(error.message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        if (formErrors[name as keyof Materia]) {
            setFormErrors({ ...formErrors, [name]: false });
        }
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const errors = validateForm(form);
        setFormErrors(errors);
        if (Object.values(errors).some(err => err)) return;
        setIsSending(true);

        if (!id) {
            createMateria();
        } else {
            updateMateria();
        }
    }

    const validateForm = (form: Materia): FormErrors => {
        const errors: FormErrors = {};
        if (form.nombre === "") errors.nombre = true;
        return errors;
    }

    const createMateria = () => {
        MateriaService.create(form)
            .then(() => navigate(Routes.ADMIN.MATERIA.LISTAR))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    const updateMateria = () => {
        if (!id) return
        MateriaService.update(parseInt(id), form)
            .then(() => navigate(Routes.ADMIN.MATERIA.LISTAR))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    return (<Card className="lg:w-160 mx-auto my-8">
        <form onSubmit={handleFormSubmit} noValidate>
            <CardHeader floated={false} className="mb-4" shadow={false}>
                <Typography variant="h3" color="blue">
                    {id ? "Editar" : "Crear"} Materia
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input type="text" label="Nombre" size="lg" name="nombre" id="nombre" required
                    value={form.nombre} onChange={(e) => handleInputChange(e)} error={formErrors.nombre} />
                {requestError && <Typography color="red">{requestError}</Typography>}
            </CardBody>
            <CardFooter className="pt-0">
                <Button color="blue" fullWidth type="submit" disabled={isSending}>
                    {isSending ? "Guardando..." : "Guardar"}
                </Button>
            </CardFooter>
        </form>
    </Card>);
}

export default MateriaFormPage;