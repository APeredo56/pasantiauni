import { Typography } from "@material-tailwind/react";

const FilosofiaPage = () => {
    return (<>
        <header>
            <img
                className="mx-auto w-full object-cover object-center mb-5"
                src="/images/about/FILOSOFIA-EDUCATIVA.jpg"
                alt="Filosofía Educativa"
            />
            <Typography as="h1" className="text-3xl mb-3 font-bold text-center">
                FILOSOFÍA EDUCATIVA
            </Typography>
        </header>
        <section className="mb-5 max-w-[650px] mx-auto">
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Núr se define como una institución de Educación Superior que promueve el desarrollo
                en nuestro país.
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Núr define al desarrollo como el proceso dinámico y participativo por medio del
                cual se satisfacen las necesidades fundamentales del ser humano y por ende de la sociedad.
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Este proceso se logra a través de la plena expresión de las capacidades de cada persona
                (por medio de la educación) al servicio de su propia comunidad y de acuerdo con su
                medio ambiente, enmarcado en principios y valores universales. Las necesidades que
                debe satisfacer se refieren a todas, es decir no solo a las necesidades básicas humanas,
                tales como la seguridad, el refugio, la alimentación y la salud, sino también a las
                necesidades emocionales, intelectuales y espirituales, tales como el afecto, la
                participación, la comprensión, la creatividad, la libertad, la trascendencia, etc.
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                La Universidad Núr cree que la educación – formal, no formal, e informal – es, sin duda
                alguna, la manera más efectiva de forjar los valores, las actitudes, el comportamiento
                y las habilidades que harán posible que las personas funcionen eficazmente en una
                sociedad mundial integrada.
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                La educación es un proceso continuo y creativo, cuyo propósito es el de desarrollar
                las capacidades latentes en la realidad de cada ser humano y de coordinar su expresión
                para la superación y el progreso de la sociedad.
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Sobre la base de los conceptos mencionados, Núr estructura todas sus propuestas
                académicas en pregrado y postgrado. Toma como cimientos estructurales a sus principios
                filosóficos descritos en el inciso C de esta sección en el presente documento. Esta
                postura educativa, tiene por objetivo replantear el rol clásico de la Universidad en
                la sociedad y la incorporación de elementos esenciales usualmente ignorados como es la
                formación integral del futuro profesional como ser: el desarrollo del espíritu de
                servicio al bien común, la promoción de la cultura de Paz como base del desarrollo de
                los pueblos hacia una ciudadanía mundial.
            </Typography>
            <Typography as="p" className="text-md text-justify" color="blue-gray">
                Por esta razón Núr plantea una estructura base de sus ofertas curriculares que 
                contemplan materias de desarrollo, servicio a la comunidad, fortalecimiento del 
                liderazgo moral, además de las materias disciplinares propias de cada carrera. Estos 
                conceptos son tomados de la Comunidad Internacional Bahá’í y se levantan sobre el pensar 
                de Manfred Max Neef.
            </Typography>
        </section>
    </>);
}

export default FilosofiaPage;