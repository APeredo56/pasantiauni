import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { Noticia } from "../../../models/Noticia";
import { NoticiaService } from "../../../services/NoticiaService";
import { TipoNoticiaEnum } from "../../../models/enums/TipoNoticiaEnum";

type FormErrors = Partial<Record<keyof Noticia, boolean>>;

const NoticiaFormPage = () => {
    const [form, setForm] = useState<Noticia>({
        titulo: "",
        descripcion: "",
        tipo: TipoNoticiaEnum.UNSET,
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState<File>();
    const [requestError, setRequestError] = useState("");
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) fetchNoticia()
    }, [slug]);

    const fetchNoticia = () => {
        if (!slug) return
        NoticiaService.get(slug).then((noticia) => {
            setForm({
                titulo: noticia.titulo,
                descripcion: noticia.descripcion,
                tipo: noticia.tipo,
                enlace_url: noticia.enlace_url,
                icono_url: noticia.icono_url,
                slug: noticia.slug
            });
            setImage(noticia.icono_url ?? "");
        }).catch((error) => setRequestError(error.message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        if (formErrors[name as keyof Noticia]) {
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
            createNoticia();
        } else {
            updateNoticia();
        }
    }

    const validateForm = (form: Noticia): FormErrors => {
        const errors: FormErrors = {};
        if (form.titulo === "") errors.titulo = true;
        if (form.descripcion === "") errors.descripcion = true;
        if (form.tipo === TipoNoticiaEnum.UNSET) errors.tipo = true;
        if (form.tipo === TipoNoticiaEnum.ENLACE && form.enlace_url === "") errors.enlace_url = true;
        if (!slug && !imageFile) errors.icono = true;
        return errors;
    }

    const createNoticia = () => {
        NoticiaService.create(form)
            .then((noticia) => saveImage(noticia.slug!))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    const updateNoticia = () => {
        if (!slug) return
        NoticiaService.update(slug, form)
            .then(() => saveImage(form.slug!))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    useEffect(() => {
        if (form.tipo !== TipoNoticiaEnum.ENLACE) {
            setForm({ ...form, enlace_url: "" });
            setFormErrors({ ...formErrors, enlace_url: false });
        }
    }, [form.tipo]);

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
            navigate(Routes.ADMIN.NOTICIA.LISTAR);
            return;
        }
        NoticiaService.saveImage(cursoSlug, imageFile).then(() => {
            navigate(Routes.ADMIN.NOTICIA.LISTAR);
        }).catch(error => {
            setIsSending(false);
            setRequestError(error.message)
        });
    }

    return (<Card className="lg:w-160 mx-auto my-8">
        <form onSubmit={handleFormSubmit} noValidate>
            <CardHeader floated={false} className="mb-4" shadow={false}>
                <Typography variant="h3" color="blue">
                    {slug ? "Editar" : "Crear"} Noticia
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input type="text" label="Titulo" size="lg" name="titulo" id="titulo" required
                    value={form.titulo} onChange={(e) => handleInputChange(e)} error={formErrors.titulo} />

                <Textarea label="Descripción" size="lg" name="descripcion" id="descripcion" required
                    value={form.descripcion} onChange={(e) => handleInputChange(e)} error={formErrors.descripcion} />

                {<Select label="Tipo" value={form.tipo} error={formErrors.tipo}
                    onChange={(value) => handleInputChange({ target: { name: "tipo", value } } as React.ChangeEvent<HTMLInputElement>)}>
                    <Option value={TipoNoticiaEnum.UNSET}>{TipoNoticiaEnum.UNSET}</Option>
                    <Option value={TipoNoticiaEnum.ARTICULO}>{TipoNoticiaEnum.ARTICULO}</Option>
                    <Option value={TipoNoticiaEnum.ENLACE}>{TipoNoticiaEnum.ENLACE}</Option>
                </Select>}

                <Input type="file" label="Imagen" size="lg" name="imagen" id="imagen" error={formErrors.icono}
                    onChange={(e) => handleImageChange(e)} {...slug ? {} : { required: true }} />

                {image && <img
                    className="w-full object-cover object-center mx-auto rounded-lg" alt="Previsualizacion de la imagen"
                    src={imageFile ? image : import.meta.env.VITE_BASE_IMG_URL + image}
                />}

                {form.tipo === TipoNoticiaEnum.ENLACE &&
                    <Input type="text" label="Enlace de la noticia" size="lg" name="enlace_url" id="enlace_url" required
                        value={form.enlace_url} onChange={(e) => handleInputChange(e)} error={formErrors.enlace_url} />}

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

export default NoticiaFormPage;