import { Typography } from "@material-tailwind/react";

const MisionVisionPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/M-Y-V.jpg"
                alt="Misión y Visión"
            />
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h2" className="text-3xl mb-3 font-bold text-center">
                MISIÓN
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Contribuir a un proceso educativo que facilite la transformación individual y social
                por medio del desarrollo de las capacidades humanas, fomentando una coherencia dinámica
                entre las dimensiones intelectuales, espirituales y físicas para el establecimiento de
                una sociedad justa, pacífica y armoniosa
            </Typography>
        </section>
        <section className="max-w-[650px] mx-auto">
            <Typography as="h2" className="text-3xl mb-3 font-bold text-center">
                VISIÓN
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Se visualiza a la Universidad Nur como un modelo educativo digno de replicar, por ser 
                una institución educativa orientada al aprendizaje, al desarrollo de capacidades de 
                liderazgo moral y a la promoción de la paz y la unidad; por responder en forma genuina 
                a las necesidades de la sociedad a través de sus programas académicos y de integración 
                social; por fomento de la cultura de investigación y el uso racional de la tecnología 
                apropiada; por ofrecer oportunidades a los académicos, administrativos y estudiantes 
                para expresar sus iniciativas individuales y desarrollar su creatividad; por la 
                cooperación y la coordinación dinámica entre sus distintos componentes y por su auto 
                sostenibilidad y el reconocimiento de sus programas a nivel nacional e internacional.
            </Typography>
        </section>
    </>);
}

export default MisionVisionPage;