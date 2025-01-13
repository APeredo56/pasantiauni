export const semesterToText = (semester: number) => {
    switch (semester) {
        case 1:
            return "Primer Semestre";
        case 2:
            return "Segundo Semestre";
        case 3:
            return "Tercer Semestre";
        case 4:
            return "Cuarto Semestre";
        case 5:
            return "Quinto Semestre";
        case 6:
            return "Sexto Semestre";
        case 7:
            return "Séptimo Semestre";
        case 8:
            return "Octavo Semestre";
        case 9:
            return "Noveno Semestre";
        case 10:
            return "Décimo Semestre";
        default:
            return "";
    }
}