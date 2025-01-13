import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from "@material-tailwind/react";
import { RevistaEstudiantil } from "../../../models/RevistaEstudiantil";
import { RevistaEstudiantilService } from "../../../services/RevistaEstudiantilService";

type FormErrors = Partial<Record<keyof RevistaEstudiantil, boolean>>;

const RevistaFormPage = () => {
    const [form, setForm] = useState<RevistaEstudiantil>({
        titulo: "",
        subtitulo: "",
        introduccion: "",
        descripcion: "",

    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [requestError, setRequestError] = useState("");

    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState<File>();
    const [autores, setAutores] = useState("");
    const [autoresFile, setAutoresFile] = useState<File>();
    const [pdf, setPdf] = useState("");
    const [pdfFile, setPdfFile] = useState<File>();

    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) fetchRevista()
    }, [slug]);

    const fetchRevista = () => {
        if (!slug) return
        RevistaEstudiantilService.get(slug).then((revista) => {
            setForm({
                titulo: revista.titulo,
                introduccion: revista.introduccion,
                subtitulo: revista.subtitulo,
                descripcion: revista.descripcion
            });
            setImage(revista.icono_url ?? "");
            setAutores(revista.autores_url ?? "");
            setPdf(revista.pdf_url ?? "");
        }).catch((error) => setRequestError(error.message));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        if (formErrors[name as keyof RevistaEstudiantil]) {
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
            createRevista();
        } else {
            updateRevista();
        }
    }

    const validateForm = (form: RevistaEstudiantil): FormErrors => {
        const errors: FormErrors = {};
        if (form.titulo === "") errors.titulo = true;
        if (form.introduccion === "") errors.introduccion = true;
        if (form.descripcion === "") errors.descripcion = true;
        if (form.subtitulo === "") errors.subtitulo = true;
        if (!slug && !imageFile) errors.icono_url = true;
        if (!slug && !autoresFile) errors.autores_url = true;
        if (!slug && !pdfFile) errors.pdf_url = true;
        return errors;
    }

    const createRevista = () => {
        RevistaEstudiantilService.create(form)
            .then((revista) => saveFiles(revista.slug!))
            .catch(error => {
                setIsSending(false);
                setRequestError(error.message)
            });
    }

    const updateRevista = () => {
        if (!slug) return
        RevistaEstudiantilService.update(slug, form)
            .then((revista) => saveFiles(revista.slug!))
            .catch(error => {
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

    const handleAutoresImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const image = event.target.files[0];
        setAutoresFile(image);
        const reader = new FileReader();
        reader.onload = () => {
            setAutores(reader.result as string);
        }
        reader.readAsDataURL(image);
    };

    const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const pdf = event.target.files[0];
        setPdfFile(pdf);
        const reader = new FileReader();
        reader.onload = () => {
            setPdf(reader.result as string);
        }
        reader.readAsDataURL(pdf);
    };

    const saveFiles = (cursoSlug: string) => {
        const promises = [];
        if (imageFile) promises.push(RevistaEstudiantilService.saveImage(cursoSlug, imageFile));
        if (autoresFile) promises.push(RevistaEstudiantilService.saveAutores(cursoSlug, autoresFile));
        if (pdfFile) promises.push(RevistaEstudiantilService.savePdf(cursoSlug, pdfFile));
        
        Promise.all(promises).then(() => navigate(Routes.ADMIN.REVISTA.LISTAR)).catch((error) => {
            setIsSending(false);
            setRequestError(error.message);
        });
    }

    return (<Card className="lg:w-160 mx-auto my-8">
        <form onSubmit={handleFormSubmit} noValidate>
            <CardHeader floated={false} className="mb-4" shadow={false}>
                <Typography variant="h3" color="blue">
                    {slug ? "Editar" : "Crear"} Revista
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input type="text" label="Titulo" size="lg" name="titulo" id="titulo" required
                    value={form.titulo} onChange={(e) => handleInputChange(e)} error={formErrors.titulo} />

                <Textarea label="Introducción" size="lg" name="introduccion" id="introduccion" required
                    value={form.introduccion} onChange={(e) => handleInputChange(e)} error={formErrors.introduccion} />

                <Input type="text" label="Subtitulo" size="lg" name="subtitulo" id="subtitulo" required
                    value={form.subtitulo} onChange={(e) => handleInputChange(e)} error={formErrors.subtitulo} />

                <Textarea label="Descripción" size="lg" name="descripcion" id="descripcion" required
                    value={form.descripcion} onChange={(e) => handleInputChange(e)} error={formErrors.descripcion} />

                <Input type="file" accept="image/*" label="Imagen" size="lg" name="imagen" id="imagen" error={formErrors.icono_url}
                    onChange={(e) => handleImageChange(e)} {...slug ? {} : { required: true }} />

                {image && <img
                    className="w-full object-cover object-center mx-auto rounded-lg" alt="Previsualizacion de la imagen"
                    src={imageFile ? image : import.meta.env.VITE_BASE_IMG_URL + image}
                />}

                <Input type="file" accept="image/*" label="Imagen de los Autores" size="lg" name="autores" id="autores" error={formErrors.icono_url}
                    onChange={(e) => handleAutoresImageChange(e)} {...slug ? {} : { required: true }} />

                {autores && <img
                    className="w-full object-cover object-center mx-auto rounded-lg" alt="Previsualizacion de la imagen"
                    src={autoresFile ? autores : import.meta.env.VITE_BASE_IMG_URL + image}
                />}

                <Input type="file" accept="application/pdf" label="PDF" size="lg" name="pdf" id="pdf" error={formErrors.pdf_url}
                    onChange={(e) => handlePdfChange(e)} {...slug ? {} : { required: true }} />

                {pdf &&
                    <object data={pdfFile ? pdf : import.meta.env.VITE_BASE_IMG_URL + pdf}
                        className="w-full aspect-[2/3]" type="application/pdf">
                        <p>Su navegador no soporta la visualización de pdfs.</p>
                    </object>}

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

export default RevistaFormPage;