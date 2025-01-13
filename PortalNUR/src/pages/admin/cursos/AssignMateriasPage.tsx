import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Materia } from '../../../models/Materia';
import { CursoService } from "../../../services/CursoService";
import { Pensum } from "../../../models/Pensum";
import { Button, Typography } from "@material-tailwind/react";
import { Curso } from "../../../models/Curso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import AddMateriasModal from "../../../components/pageSpecific/AssignModals.tsx/AddMateriasModal";
import { Routes } from "../../../routes/CONSTANTS";

const AssignMateriasPage = () => {
    const [curso, setCurso] = useState<Curso | null>(null);
    const [pensum, setPensum] = useState<Pensum>([]);
    const [selectedSemesterNumber, setSelectedSemesterNumber] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [responseError, setResponseError] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const selectedSemester = pensum.find((sem) => sem.semestre === selectedSemesterNumber) ??
        { semestre: selectedSemesterNumber, materias: [] };

    useEffect(() => {
        fetchCurso();
        fetchPensum();
    }, []);

    const fetchCurso = () => {
        if (!slug) return;
        CursoService.get(slug)
            .then((curso) => setCurso(curso))
            .catch((error) => console.log(error));
    }

    const fetchPensum = () => {
        if (!slug) return;
        CursoService.getPensum(slug)
            .then((response) => setPensum(response))
            .catch((error) => console.log(error));
    }

    const handleAddMaterias = (semesterNumber: number) => {
        setSelectedSemesterNumber(semesterNumber);
        setIsModalOpen(true);
    }

    const handleAddMateriasConfirm = (selectedMaterias: Materia[]) => {
        const newPensum = [...pensum];
        const semesterIndex = newPensum.findIndex((sem) => sem.semestre === selectedSemesterNumber);
        if (semesterIndex != -1) {
            newPensum[semesterIndex].materias = [...newPensum[semesterIndex].materias, ...selectedMaterias];
        } else {
            newPensum.push({ semestre: selectedSemesterNumber, materias: selectedMaterias });
        }
        setPensum(newPensum);
        setIsModalOpen(false);
    }

    const handleRemoveMateria = (materia: Materia, semester: number) => {
        const newPensum = [...pensum];
        const semesterIndex = newPensum.findIndex((sem) => sem.semestre === semester);
        if (semesterIndex != -1) {
            newPensum[semesterIndex].materias = newPensum[semesterIndex].materias.filter((m) => m.id !== materia.id);
            setPensum(newPensum);
        }
    }

    const handleSaveChanges = () => {
        if (!slug) return;
        setIsSaving(true);
        const promises = pensum.map((sem) => {
            return CursoService.assignMaterias(slug, {
                semestre: sem.semestre,
                materias_id: sem.materias.map((m) => m.id!)?? []
            });
        });
        Promise.all(promises)
            .then(() => {
                setIsSaving(false);
                navigate(Routes.ADMIN.DASHBOARD);
            })
            .catch((error) => {
                setIsSaving(false);
                setResponseError(error.message);
                console.log(error);
            });
    }

    return (<>
        <div className="mb-3 lg:mb-0 lg:flex items-center justify-between">
            <Typography as="h1" className="capitalize py-5 text-blue-500 font-bold text-2xl">
                {curso?.nombre ?? "Cargando..."}
            </Typography>
            <Button color="blue" onClick={handleSaveChanges} className="p-3" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
        </div>
        {responseError && <Typography as="p" className="text-red-500">{responseError}</Typography>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(curso?.semestres ?? 0)].map((_, index) => {
                const semester = index + 1;
                const materias = pensum.find((sem) => sem.semestre === semester)?.materias || [];
                return (
                    <div key={semester} className="p-5 shadow-lg rounded-md flex flex-col">
                        <Typography as="h2" className="text-blue-500 font-bold text-xl mb-3">
                            Semestre {semester}
                        </Typography>
                        {materias.map((materia: Materia) => (
                            <div key={materia.nombre} className="mb-3 border-b-2 border-blue-500 flex items-center justify-between">
                                <Typography as="p" className="text-gray-500">
                                    {materia.nombre}
                                </Typography>
                                <Button variant="text" color="white" onClick={() => { handleRemoveMateria(materia, semester) }} className="p-0">
                                    <FontAwesomeIcon color="red" icon={faX} className="h-4 w-4 p-2 m-0" />
                                </Button>
                            </div>
                        ))}
                        <Button color="blue" onClick={() => handleAddMaterias(semester)}
                            className="mt-auto p-2 normal-case" fullWidth>
                            Agregar Materias
                        </Button>
                    </div>
                );
            })}
        </div>
        <AddMateriasModal isOpen={isModalOpen} onCancel={() => setIsModalOpen(false)}
            onConfirm={handleAddMateriasConfirm} semester={selectedSemester} />
    </>);
}

export default AssignMateriasPage;