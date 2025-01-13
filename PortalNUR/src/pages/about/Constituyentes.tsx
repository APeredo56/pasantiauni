import { Typography } from "@material-tailwind/react";

const ConstituyentesPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/CONSTITUYENTES.jpg"
                alt="Constituyentes"
            />
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                CONSTITUYENTE
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La Asamblea General de Constituyentes, está conformada por los Constituyentes quienes son sucesores de los Fundadores y representan la autoridad máxima de la Universidad Nur cómo Órgano de Decisión.  Con el fin de garantizar la vigencia de los Principios de Fundación durante la vida Institucional de la Universidad Nur y lograr su permanencia, se estableció la Asamblea General de Constituyentes a través del nombramiento oportuno de nuevos miembros, conformada por personas que tengan los mismos Principios Universales que los establecidos en la fundación.
            </Typography>
            <Typography as="p" className="text-md text-justify mb-3" color="blue-gray">
                La Asamblea General de Constituyentes, está conformada por 19 personas, se reúne en forma Ordinaria cada dos años y medio y extraordinariamente cuando sea necesario tratar asuntos generales y específicos relacionados con la continuidad y el progreso de la Universidad, asegurando así el funcionamiento se desarrolle en cumplimiento al Acta de Fundación, los Principios Universales,  filosofía, la misión y las disposiciones legales vigentes; asimismo, asegurar la vigencia de la Junta Fiduciaria, a quien se otorga el fideicomiso legal que le corresponde.            </Typography>
        </section>
        <section className="max-w-[650px] mx-auto">
            <ul className="shadow-md bg-gray-100 p-5 mb-5 border border-gray-200 divide-y divide-blue-gray-200">
                <li>
                    <Typography as="h2" className="font-bold text-xl mb-3" color="blue">
                        CONSTITUYENTES
                    </Typography>
                </li>
                <Typography as="li">Carmen Rosa Wichtendahl de Naraghi</Typography>
                <Typography as="li">Rosario Teresa Méndez Raya</Typography>
                <Typography as="li">John Scott Kepner</Typography>
                <Typography as="li">Sabino Ortega Sadiq</Typography>
                <Typography as="li">Claudio Limachi Calle</Typography>
                <Typography as="li">Crystal Baker Shoaie</Typography>
                <Typography as="li">Reynaldo Hurtado Choque</Typography>
                <Typography as="li">Ridvan Kepner Sanchez</Typography>
                <Typography as="li">Zulma Teresa Velarde Heredia</Typography>
                <Typography as="li">Augusto Esteban Costas Morelli</Typography>
                <Typography as="li">Aldo Roberto Herrera Arandia</Typography>
                <Typography as="li">Casto Limachi Kally</Typography>
                <Typography as="li">Grisel Ruth Oreggia Crisci</Typography>
                <Typography as="li">Griselda Luz Torrico Cerrogrande</Typography>
                <Typography as="li">Luis Enrique Quiroz Téllez</Typography>
                <Typography as="li">Nelson Rojas Rodríguez</Typography>
                <Typography as="li">Norha Esther Justiniano Rodríguez</Typography>
                <Typography as="li">Nadim Ouladi Nikravan</Typography>
                <Typography as="li">Patricia Fabiana Méndez Raya</Typography>
            </ul>
        </section>
    </>);
}

export default ConstituyentesPage;