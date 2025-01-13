import { Typography } from "@material-tailwind/react";

const PoliticaPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/POLITICA-DE-CALIDAD.jpg"
                alt="Política de Calidad"
            />
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                POLÍTICA DE CALIDAD
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La UNIVERSIDAD NUR es una organización de educación orientada al aseguramiento de la formación integral de sus estudiantes. Comprometida con la mejora continua y el cumplimiento de los requisitos aplicables; con calidad académica en todos sus programas, cuenta con profesionales altamente calificados y es eficiente en su gestión.
            </Typography>
        </section>
    </>);
}

export default PoliticaPage;