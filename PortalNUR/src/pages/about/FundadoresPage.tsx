import { Typography } from "@material-tailwind/react";

const FundadoresPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/FUNDADORES.jpg"
                alt="Fundadores"
            />
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                FUNDADORES
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La Universidad Núr fue fundada, por un grupo de personas visionarias en el ámbito de la Educación Superior: los Fundadores, quienes llevaron adelante el proyecto hasta el establecimiento e inicio de funcionamiento de esta Casa Superior de Estudios, de acuerdo al Acta de Fundación, suscrita el 23 de Mayo de 1982 y ratificada el año 1996, que determina como base filosófica los Principios Universales de la Fe Bahá’í y como base legal una institución sin fines de lucro de acuerdo al Código Civil.
            </Typography>
        </section>
        <section className="max-w-[650px] mx-auto">
            <ul className="shadow-md bg-gray-100 p-5 mb-5 border border-gray-200 divide-y divide-blue-gray-200">
                <li>
                    <Typography as="h2" className="font-bold text-xl mb-3" color="blue">
                        Los Fundadores de la Universidad Nur son:
                    </Typography>
                </li>
                <Typography as="li">Eloy Anello</Typography>
                <Typography as="li">Mas’ud Khamsi</Typography>
                <Typography as="li">Andrés Jachakollo</Typography>
                <Typography as="li">Caroline Richardson</Typography>
                <Typography as="li">William King Baker</Typography>
                <Typography as="li">Athos Costas Barselini</Typography>
                <Typography as="li">John Scott Kepner</Typography>
                <Typography as="li">Jeremy Martin</Typography>
                <Typography as="li">Rosario Teresa Méndez Raya de Ries</Typography>
                <Typography as="li">Sabino Sadiq Ortega</Typography>
                <Typography as="li">Carmen Rosa Wichtendalh de Naraghi</Typography>
                <Typography as="li">Francisco R. Anello</Typography>
                <Typography as="li">Paul Albert Lang</Typography>
            </ul>
        </section>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                Los Fundadores con el fin de garantizar la vigencia de los Principios de Fundación durante toda la vida institucional de la Universidad Núr y hacerlos permanentes; establecieron decisiones que garantizan por siempre la existencia de la Asamblea General de Fundadores con los mismos Principios, a través del nombramiento oportuno de los “Miembros de la Asamblea General de Fundadores” y los “Sucesivos Miembros de la Asamblea General de Fundadores”, como una responsabilidad permanente. Asimismo elige a la Junta Fiduciaria a quién se otorga el fideicomiso legal que le corresponde durante la gestión que dura cinco años.
            </Typography>
        </section>
    </>);
}

export default FundadoresPage;