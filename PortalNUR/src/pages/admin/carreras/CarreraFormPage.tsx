import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { AreaCursoEnum } from "../../../models/enums/AreaCursoEnum";
import { CarreraRequest } from "../../../models/requests/CarreraRequest";
import { CarreraService } from "../../../services/CarreraService";
import TextEditorComponent from "../../../components/common/TextEditorComponent";
import { CursoService } from "../../../services/CursoService";

type FormErrors = Partial<Record<keyof CarreraRequest, boolean>>;

const CarreraFormPage = () => {
    const [form, setForm] = useState<CarreraRequest>({
        nombre: "",
        objetivos: "",
        semestres: 0,
        caracteristicas: "",
        perfil_profesional: "",
        introduccion: "",
        campo_laboral: "",
        porque_estudiar: "",
        area: AreaCursoEnum.UNSET
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [requestError, setRequestError] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState<File>();
    const [isFetching, setIsFetching] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) fetchCarrera()
    }, [slug]);

    const fetchCarrera = () => {
        if (!slug) return
        CarreraService.get(slug).then((curso) => {
            setImage(curso.imagen_url ?? "");
            setForm({
                area: curso.area,
                campo_laboral: curso.carrera?.campo_laboral,
                caracteristicas: curso.carrera?.caracteristicas,
                introduccion: curso.carrera?.introduccion,
                nombre: curso.nombre,
                objetivos: curso.objetivos,
                perfil_profesional: curso.carrera?.perfil_profesional,
                porque_estudiar: curso.carrera?.porque_estudiar,
                semestres: curso.semestres
            } as CarreraRequest);
            setIsFetching(false);
        }).catch((error) => setRequestError(error.message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        if (formErrors[name as keyof CarreraRequest]) {
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
            createCarrera();
        } else {
            updateCarrera();
        }
    }

    const validateForm = (form: CarreraRequest): FormErrors => {
        const errors: FormErrors = {};
        if (form.nombre === "") errors.nombre = true;
        if (form.objetivos === "") errors.objetivos = true;
        if (form.semestres < 1 || form.semestres > 16) errors.semestres = true;
        if (form.caracteristicas === "") errors.caracteristicas = true;
        if (form.perfil_profesional === "") errors.perfil_profesional = true;
        if (form.introduccion === "") errors.introduccion = true;
        if (form.campo_laboral === "") errors.campo_laboral = true;
        if (form.porque_estudiar === "") errors.porque_estudiar = true;
        if (form.area === AreaCursoEnum.UNSET) errors.area = true;
        if (form.imagen_url === "") errors.imagen_url = true;
        return errors;
    }

    const createCarrera = () => {
        CarreraService.create(form).then((curso) => {
            saveImage(curso.slug);
        }).catch(error => {
            setIsSending(false);
            setRequestError(error.message)
        });
    }

    const updateCarrera = () => {
        if (!slug) return
        CarreraService.update(slug, form).then((curso) => {
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
        if (!imageFile) {
            navigate({ pathname: Routes.ADMIN.CURSO.LISTAR, search: "?tipo=carreras" });
            return;
        }
        CursoService.saveImage(cursoSlug, imageFile).then(() => {
            navigate({ pathname: Routes.ADMIN.CURSO.LISTAR, search: "?tipo=carreras" });
        }).catch(error => {
            setIsSending(false);
            setRequestError(error.message)
        });
    }

    return (<Card className="lg:w-160 mx-auto my-8">
        <form onSubmit={handleFormSubmit} noValidate>
            <CardHeader floated={false} className="mb-4" shadow={false}>
                <Typography variant="h3" color="blue">
                    {slug ? "Editar" : "Crear"} Carrera
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input type="text" label="Nombre" size="lg" name="nombre" id="nombre" required
                    value={form.nombre} onChange={(e) => handleInputChange(e)} error={formErrors.nombre} />

                <Input type="number" label="Semestres" size="lg" name="semestres" id="semestres" required
                    value={form.semestres != 0 ? form.semestres : ""}
                    onChange={(e) => handleInputChange(e)} error={formErrors.semestres} />

                <Textarea label="Introduccion" size="lg" name="introduccion" id="introduccion" required
                    value={form.introduccion} onChange={(e) => handleInputChange(e)} error={formErrors.introduccion} />

                <Textarea label="Objetivos" size="lg" name="objetivos" id="objetivos" required
                    value={form.objetivos} onChange={(e) => handleInputChange(e)} error={formErrors.objetivos} />

                <Textarea label="Caracteristicas" size="lg" name="caracteristicas" id="caracteristicas" required
                    value={form.caracteristicas} onChange={(e) => handleInputChange(e)} error={formErrors.caracteristicas} />

                <Textarea label="Por que estudiar" size="lg" name="porque_estudiar" id="porque_estudiar" required
                    value={form.porque_estudiar} onChange={(e) => handleInputChange(e)} error={formErrors.porque_estudiar} />

                <Typography variant={"h5"} as="h2" color="blue">Perfil profesional</Typography>
                <TextEditorComponent initialValue={form.perfil_profesional} name="perfil_profesional"
                    onChange={handleInputChange} error={formErrors.perfil_profesional}
                    isInitialValueLoaded={!isFetching} />

                <Typography variant={"h5"} as="h2" color="blue">Campo laboral</Typography>
                <TextEditorComponent initialValue={form.campo_laboral} name="campo_laboral"
                    onChange={handleInputChange} error={formErrors.campo_laboral}
                    isInitialValueLoaded={!isFetching} />

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

export default CarreraFormPage;