import { faAddressBook, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";

const AutoridadesPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/Autoridades-Ejecutivas-1100x906-1.jpg"
                alt="Autoridades Ejecutivas"
            />
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                AUTORIDADES EJECUTIVAS
            </Typography>
            <Typography as="p" className="text-md mb-3" color="blue-gray">
                Las autoridades del Órgano Ejecutivo de la Universidad Nur están conformadas por:
            </Typography>
            <Typography as="p" className="text-md mb-3" color="blue-gray">
                El Rector como máxima autoridad ejecutiva y los Vicerrectores como principales apoyos a la gestión del Rector.
            </Typography>
            <Typography as="p" className="text-md mb-3" color="blue-gray">
                El Rector es el representante de la Universidad y es la máxima Autoridad Ejecutiva designado por la Junta Fiduciaria, previa aprobación de la Asamblea General de Fundadores.
            </Typography>
            <Typography as="p" className="text-md mb-3" color="blue-gray">
                El Rector y los Vicerrectores conforman el Consejo Directivo, conjunto tienen la misión principal de conducir la gestión institucional y académica de la Universidad, enmarcada en los lineamientos y políticas emitidas por los fundadores, las políticas de gestión emanadas por la Junta Fiduciaria, el marco normativo y legal del país, entre los elementos más importantes.
            </Typography>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">
            <figure className="text-center">
                <img
                    className="mx-auto w-full object-cover object-center mb-1"
                    src="/images/about/Rector350x250.jpg"
                    alt="Rector"
                />
                <figcaption className="text-xl font-bold">Rector:</figcaption>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faAddressBook} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">William Shoaie</Typography>
                </div>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">rectorado@nur.edu</Typography>
                </div>
            </figure>
            <figure className="text-center">
                <img
                    className="mx-auto w-full object-cover object-center mb-1"
                    src="/images/about/Vicerrector-Academico-350X250.jpg"
                    alt="Vicerrector Académico"
                />
                <figcaption className="text-xl font-bold">Vicerrector Académico:</figcaption>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faAddressBook} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">Gustavo Ortega</Typography>
                </div>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">vr_academico@nur.edu</Typography>
                </div>
            </figure>
            <figure className="text-center">
                <img
                    className="mx-auto w-full object-cover object-center mb-1"
                    src="/images/about/Vicerrector-Financiero-350X250.jpg"
                    alt="Vicerrector Financiero"
                />
                <figcaption className="text-xl font-bold">Vicerrector Financiero:</figcaption>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faAddressBook} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">Abbas Rezvani</Typography>
                </div>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">arezvani@nur.edu</Typography>
                </div>
            </figure>
        </section>
        <section>
            <figure className="text-center max-w-96 mx-auto">
                <img
                    className="mx-auto w-full object-cover object-center mb-1"
                    src="/images/about/Director-La-Paz.jpeg"
                    alt="Director La Paz"
                />
                <figcaption className="text-xl font-bold">Director La Paz:</figcaption>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faAddressBook} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">Lic. Augusto Costas Morelli</Typography>
                </div>
                <div className='flex justify-center'>
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 me-3 text-primary" />
                    <Typography as="p">acostas@nur.edu</Typography>
                </div>
            </figure>
        </section>
    </>);
}

export default AutoridadesPage;