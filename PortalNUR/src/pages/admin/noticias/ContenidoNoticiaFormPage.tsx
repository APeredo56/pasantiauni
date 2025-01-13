import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../../routes/CONSTANTS";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Typography } from "@material-tailwind/react";
import { Noticia } from "../../../models/Noticia";
import { NoticiaService } from "../../../services/NoticiaService";
import { ContenidoNoticia } from "../../../models/ContenidoNoticia";
import { TipoContenidoEnum } from "../../../models/enums/TipoContenidoEnum";
import TextEditorComponent from "../../../components/common/TextEditorComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmModal from "../../../components/common/DeleteConfirmModal";

type FormContenidoErrors = Partial<Record<keyof ContenidoNoticia, boolean>>;

const ContenidoNoticiaFormPage = () => {
    const [noticia, setNoticia] = useState<Noticia>();
    const [contenidos, setContenidos] = useState<ContenidoNoticia[]>([{
        tipo: TipoContenidoEnum.UNSET,
    }]);
    const [formErrors, setFormErrors] = useState<FormContenidoErrors[]>([{}]);
    const [contenidoImages, setContenidoImages] = useState<Map<number, string>>(new Map());
    const [requestError, setRequestError] = useState("");
    const [isFetching, setIsFetching] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);

    useEffect(() => {
        if (slug) fetchNoticia()
    }, [slug]);

    const fetchNoticia = () => {
        if (!slug) return
        NoticiaService.get(slug).then((noticia) => {
            setNoticia(noticia);
            if (noticia.contenidos && noticia.contenidos.length > 0) {
                setContenidos(noticia.contenidos);
                setFormErrors(new Array(noticia.contenidos.length).fill({}));
            }
            setIsFetching(false);
        }).catch((error) => setRequestError(error.message));
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const errors = validateForm(contenidos);
        setFormErrors(errors);
        if (errors.some(err => Object.values(err).some(v => v))) return;
        setIsSending(true);

        const promises = contenidos.map((contenido) => {
            if (contenido.id) {
                return NoticiaService.updateContenido(contenido.id, contenido).then(() => {
                    if (contenido.tipo === TipoContenidoEnum.IMAGEN) {
                        return saveImageContenido(contenido);
                    }
                });
            } else {
                contenido.noticia_id = noticia?.id;
                return NoticiaService.createContenido(contenido).then((newContenido) => {
                    if (contenido.tipo === TipoContenidoEnum.IMAGEN) {
                        contenido.id = newContenido.id;
                        return saveImageContenido(contenido);
                    }
                });;
            }
        });

        Promise.all(promises).then(() => {
            setIsSending(false);
            navigate(Routes.ADMIN.NOTICIA.LISTAR);
        }).catch((error) => {
            setIsSending(false);
            setRequestError(error.message);
        });
    }

    const saveImageContenido = (contenido: ContenidoNoticia) => {
        if (!contenido.imageFile) return;
        return NoticiaService.saveImageContenido(contenido.id!, contenido.imageFile);
    }

    const validateForm = (form: ContenidoNoticia[]): FormContenidoErrors[] => {
        const errors: FormContenidoErrors[] = [];
        form.forEach((contenido, index) => {
            errors[index] = {};
            if (contenido.tipo != TipoContenidoEnum.IMAGEN && !contenido.contenido) {
                errors[index].contenido = true;
            }
            if (contenido.tipo === TipoContenidoEnum.UNSET) {
                errors[index].tipo = true;
            }
            if (contenido.tipo === TipoContenidoEnum.IMAGEN && !contenido.imageFile && !contenido.id) {
                errors[index].imageFile = true;
            }
        });
        console.log(errors);
        return errors;
    }

    const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const image = event.target.files[0];
        contenidos[index].imageFile = image;
        const reader = new FileReader();
        reader.onload = () => {
            contenidoImages.set(index, reader.result as string);
            setContenidoImages(new Map(contenidoImages));
        }
        reader.readAsDataURL(image);
    };

    const addNewContenido = () => {
        setContenidos([...contenidos, {
            tipo: TipoContenidoEnum.UNSET,
        }]);
        setFormErrors((prevFormErrors) => [
            ...prevFormErrors,
            { tipo: false, contenido: false },
        ]);
    }

    const handleContenidoChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const newContenidos = [...contenidos];
        newContenidos[index] = { ...newContenidos[index], [name]: value };
        setContenidos(newContenidos);
    }

    const handleIndexedChange = (index: number) => {
        return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target;
            const newContenidos = [...contenidos];
            newContenidos[index] = { ...newContenidos[index], [name]: value };
            setContenidos(newContenidos);
        };
    };

    const handleDelete = (index: number) => {
        setIsDeleteModalOpen(true);
        setDeleteIndex(index);
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDeleteIndex(0);
    }

    const confirmDelete = () => {
        if (contenidos[deleteIndex].id) {
            NoticiaService.deleteContenido(contenidos[deleteIndex].id).then(() => {
                removeContenido(deleteIndex);
            }).catch((error) => setRequestError(error.message));
        } else {
            removeContenido(deleteIndex);
        }
    }

    const removeContenido = (index: number) => {
        const newContenidos = [...contenidos];
        newContenidos.splice(index, 1);
        setContenidos(newContenidos);
        const newFormErrors = [...formErrors];
        newFormErrors.splice(index, 1);
        setFormErrors(newFormErrors);
        setIsDeleteModalOpen(false);
        setDeleteIndex(0);
    }


    return (<>
        <Card className="lg:w-160 mx-auto my-8">
            <form onSubmit={handleFormSubmit} noValidate>
                <CardHeader floated={false} className="mb-4" shadow={false}>
                    <Typography variant="h3" color="blue">
                        {noticia?.titulo ?? "Cargando..."}
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    {contenidos.map((contenido, index) => (
                        <div key={"cont-" + index} className="flex flex-col gap-4 border border-blue-500 p-4 rounded-lg my-3">
                            <div className="flex justify-between items-center">
                                <Typography as="h2" color="blue" className="font-bold text-lg">Elemento {index + 1}</Typography>
                                <Button variant="text" color="white" onClick={() => handleDelete(index)} className="p-0">
                                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4 rounded-full bg-red-500 p-2" />
                                </Button>
                            </div>
                            {!contenido.id && <Select label="Tipo de Contenido" value={contenido.tipo} error={formErrors[index].tipo}
                                onChange={(value) => handleContenidoChange(index, { target: { name: "tipo", value } } as React.ChangeEvent<HTMLInputElement>)}>
                                <Option value={TipoContenidoEnum.UNSET}>{TipoContenidoEnum.UNSET}</Option>
                                <Option value={TipoContenidoEnum.TEXTO}>{TipoContenidoEnum.TEXTO}</Option>
                                <Option value={TipoContenidoEnum.IMAGEN}>{TipoContenidoEnum.IMAGEN}</Option>
                            </Select>}
                            {contenido.tipo === TipoContenidoEnum.TEXTO &&
                                <TextEditorComponent initialValue={contenido.contenido ?? ""} name="contenido"
                                    isInitialValueLoaded={!isFetching} onChange={handleIndexedChange(index)}
                                    error={formErrors[index].contenido} />}
                            {contenido.tipo === TipoContenidoEnum.IMAGEN &&
                                <Input type="file" label="Imagen" size="lg" name="imagen" id="imagen"
                                    onChange={(e) => handleImageChange(index, e)} error={formErrors[index].imageFile} />}
                            {contenido.tipo === TipoContenidoEnum.IMAGEN && (contenido.contenido || contenidoImages.has(index))
                                && <img
                                    className="w-full object-cover object-center mx-auto rounded-lg" alt="Previsualizacion de la imagen"
                                    src={contenidoImages.has(index) ? contenidoImages.get(index) : import.meta.env.VITE_BASE_IMG_URL + contenido.contenido}
                                />}
                        </div>
                    ))}
                    <Button color="blue" variant="outlined" size="sm" onClick={() => addNewContenido()}>
                        Añadir Contenido
                    </Button>
                    {requestError && <Typography color="red">{requestError}</Typography>}
                </CardBody>
                <CardFooter className="pt-0">
                    <Button color="blue" fullWidth type="submit" disabled={isSending}>
                        {isSending ? "Guardando..." : "Guardar"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
        <DeleteConfirmModal isOpen={isDeleteModalOpen} onCancel={cancelDelete}
            onConfirm={confirmDelete} title="Eliminar Elemento"
            message="¿Está seguro que desea eliminar el elemento?" />
    </>);
}

export default ContenidoNoticiaFormPage;