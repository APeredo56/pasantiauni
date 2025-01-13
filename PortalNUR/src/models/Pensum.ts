import { Materia } from "./Materia";

export type Semestre = {
    semestre: number,
    materias: Materia[];
}

export type Pensum = Semestre[];