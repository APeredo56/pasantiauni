import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { AreaCursoEnum } from "../../../models/enums/AreaCursoEnum";
import { CursoService } from "../../../services/CursoService";
import { MaestriaRequest } from "../../../models/requests/MaestriaRequest";
import { MaestriaService } from "../../../services/MaestriaService";

type FormErrors = Partial<Record<keyof MaestriaRequest, boolean>>;

const MaestriaFormPage = () => {
    const [form, setForm] = useState<MaestriaRequest>({
        nombre: "",
        objetivos: "",
        semestres: 0,
        publico_objetivo: "",
        area: AreaCursoEnum.UNSET
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [requestError, setRequestError] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState<File>();
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) fetchMaestria()
    }, [slug]);

    const fetchMaestria = () => {
        if (!slug) return
        MaestriaService.get(slug).then((curso) => {
            setImage(curso.imagen_url ?? "");
            setForm({
                area: curso.area,
                nombre: curso.nombre,
                objetivos: curso.objetivos,
                publico_objetivo: curso.maestria?.publico_objetivo,
                semestres: curso.semestres
            } as MaestriaRequest);
        }).catch((error) => setRequestError(error.message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        if (formErrors[name as keyof MaestriaRequest]) {
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

        if (!slug) {
            createMaestria();
        } else {
            updateMaestria();
        }
    }

    const validateForm = (form: MaestriaRequest): FormErrors => {
        const errors: FormErrors = {};
        if (form.nombre === "") errors.nombre = true;
        if (form.objetivos === "") errors.objetivos = true;
        if (form.semestres < 1 || form.semestres > 16) errors.semestres = true;
        if (form.publico_objetivo === "") errors.publico_objetivo = true;
        if (form.area === AreaCursoEnum.UNSET) errors.area = true;
        if (form.imagen_url === "") errors.imagen_url = true;
        return errors;
    }

    const createMaestria = () => {
        MaestriaService.create(form).then((curso) => {
            saveImage(curso.slug);
        }).catch(error => {
            setIsSending(false);
            setRequestError(error.message)
        });
    }

    const updateMaestria = () => {
        if (!slug) return
        MaestriaService.update(slug, form).then((curso) => {
            saveImage(curso.slug);
        }).catch(error => {
            setIsSending(false);
            setRequestError(error.message)
        });
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const image = event.target.files[0];
        setImageFile(image);
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        }
        reader.readAsDataURL(image);
    };

    const saveImage = (cursoSlug: string) => {
        if (!imageFile){
            navigate({ pathname: Routes.ADMIN.CURSO.LISTAR, search: "?tipo=maestrias" });
            return;
        }
        CursoService.saveImage(cursoSlug, imageFile).then(() => {
            navigate({ pathname: Routes.ADMIN.CURSO.LISTAR, search: "?tipo=maestrias" });
        }).catch(error => {
            setIsSending(false);
            setRequestError(error.message)
        });
    }

    return (<Card className="lg:w-160 mx-auto my-8">
        <form onSubmit={handleFormSubmit} noValidate>
            <CardHeader floated={false} className="mb-4" shadow={false}>
                <Typography variant="h3" color="blue">
                    {slug ? "Editar" : "Crear"} Maestría
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input type="text" label="Nombre" size="lg" name="nombre" id="nombre" required
                    value={form.nombre} onChange={(e) => handleInputChange(e)} error={formErrors.nombre} />

                <Input type="number" label="Semestres" size="lg" name="semestres" id="semestres" required
                    value={form.semestres != 0 ? form.semestres : ""} max={10}
                    onChange={(e) => handleInputChange(e)} error={formErrors.semestres} />

                <Textarea label="Objetivos" size="lg" name="objetivos" id="objetivos" required
                    value={form.objetivos} onChange={(e) => handleInputChange(e)} error={formErrors.objetivos} />

                <Textarea label="Público objetivo" size="lg" name="publico_objetivo" id="publico_objetivo" required
                    value={form.publico_objetivo} onChange={(e) => handleInputChange(e)} error={formErrors.publico_objetivo} />

                <Select label="Área" value={form.area} error={formErrors.area}
                    onChange={(value) => handleInputChange({ target: { name: "area", value } } as React.ChangeEvent<HTMLInputElement>)}>
                    <Option value={AreaCursoEnum.UNSET}>{AreaCursoEnum.UNSET}</Option>
                    <Option value={AreaCursoEnum.ADMINISTRATIVAS}>{AreaCursoEnum.ADMINISTRATIVAS}</Option>
                    <Option value={AreaCursoEnum.JURIDICAS}>{AreaCursoEnum.JURIDICAS}</Option>
                    <Option value={AreaCursoEnum.SALUD}>{AreaCursoEnum.SALUD}</Option>
                    <Option value={AreaCursoEnum.SOCIALES}>{AreaCursoEnum.SOCIALES}</Option>
                    <Option value={AreaCursoEnum.TECNOLOGICAS}>{AreaCursoEnum.TECNOLOGICAS}</Option>
                </Select>

                <Input type="file" label="Imagen" size="lg" name="imagen" id="imagen"
                    onChange={(e) => handleImageChange(e)} {...slug ? {} : { required: true }} />
                {image && <img
                    className="w-full object-cover object-center mx-auto rounded-lg" alt="Previsualizacion de la imagen"
                    src={imageFile ? image : import.meta.env.VITE_BASE_IMG_URL + image}
                />}
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

export default MaestriaFormPage;