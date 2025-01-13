import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react";
import { Contacto } from "../../../models/Contacto";
import { ContactoService } from "../../../services/ContactoService";

type FormErrors = Partial<Record<keyof Contacto, boolean>>;

const ContactoFormPage = () => {
    const [form, setForm] = useState<Contacto>({
        nombre: "",
        correo: "",
        celular: "",
        fijo: ""
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [requestError, setRequestError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchContacto()
    }, [id]);

    const fetchContacto = () => {
        if (!id) return
        ContactoService.get(parseInt(id)).then((contacto) => {
            setForm({
                nombre: contacto.nombre,
                correo: contacto.correo,
                celular: contacto.celular,
                fijo: contacto.fijo
            });
        }).catch((error) => setRequestError(error.message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        if (formErrors[name as keyof Contacto]) {
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
            createContacto();
        } else {
            updateContacto();
        }
    }

    const validateForm = (form: Contacto): FormErrors => {
        const errors: FormErrors = {};
        if (form.nombre === "") errors.nombre = true;
        if (form.correo === "") errors.correo = true;
        if (form.celular === "") errors.celular = true;
        if (form.fijo === "") errors.fijo = true;
        return errors;
    }

    const createContacto = () => {
        ContactoService.create(form)
            .then(() => navigate(Routes.ADMIN.CONTACTO.LISTAR))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    const updateContacto = () => {
        if (!id) return
        ContactoService.update(parseInt(id), form)
            .then(() => navigate(Routes.ADMIN.CONTACTO.LISTAR))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    return (<Card className="lg:w-160 mx-auto my-8">
        <form onSubmit={handleFormSubmit} noValidate>
            <CardHeader floated={false} className="mb-4" shadow={false}>
                <Typography variant="h3" color="blue">
                    {id ? "Editar" : "Crear"} Contacto
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input type="text" label="Nombre" size="lg" name="nombre" id="nombre" required
                    value={form.nombre} onChange={(e) => handleInputChange(e)} error={formErrors.nombre} />
                
                <Input type="email" label="Correo" size="lg" name="correo" id="correo" required
                    value={form.correo} onChange={(e) => handleInputChange(e)} error={formErrors.correo} />
                
                <Input type="number" label="Celular" size="lg" name="celular" id="celular" required
                    value={form.celular} onChange={(e) => handleInputChange(e)} error={formErrors.celular} />
                
                <Input type="number" label="Fijo" size="lg" name="fijo" id="fijo" required
                    value={form.fijo} onChange={(e) => handleInputChange(e)} error={formErrors.fijo} />

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

export default ContactoFormPage;