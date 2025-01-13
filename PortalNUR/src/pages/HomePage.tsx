import HomeCarouselComponent from "../components/pageSpecific/HomePage/HomeCarouselComponent";
import HomeServicesComponent from "../components/pageSpecific/HomePage/HomeServicesComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

const HomePage = () => {
    return (<>
        <section className="flex flex-col pb-8 gap-8">
            <HomeCarouselComponent />
        </section>

        <section className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <HomeServicesComponent />
        </section>
        
        <section className="py-8 grid lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-10 pb-10">
                <Typography as={"h3"} className="text-lg font-bold text-center">
                    Visita nuestros canales
                </Typography>
                <ul className="flex gap-5 justify-center">
                    <li><a href="https://www.facebook.com/UniversidadNURoficial/"
                        className="bg-primary-variant text-white p-3 rounded-full">
                        <FontAwesomeIcon icon={faFacebookF} className="aspect-square" />
                    </a></li>
                    <li><a href="https://www.youtube.com/channel/UCg7_S3COOpvKoMxnf7qKmBw"
                        className="bg-primary-variant text-white p-3 rounded-full">
                        <FontAwesomeIcon icon={faYoutube} className="aspect-square" />
                    </a></li>
                    <li><a href="https://www.instagram.com/universidadnur/"
                        className="bg-primary-variant text-white p-3 rounded-full">
                        <FontAwesomeIcon icon={faInstagram} className="aspect-square" />
                    </a></li>
                </ul>
            </div>
            <iframe className="border-0 aspect-video w-full" src="https://www.youtube.com/embed/13-ITkqz9NY?si=IJF8ZZ7gDyFhWncG" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </section>

        <section className="py-8 flex gap-10 justify-center flex-wrap">
            <Card className="w-full sm:w-96 lg:w-72 xl:w-96  text-center">
                <CardHeader floated={false} shadow={false} color="transparent">
                    <Typography as={"h3"} color="black" className="font-bold text-xl uppercase">
                        Sede Santa Cruz
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Typography as={"h4"} color="black" className="font-bold text-lg">
                        Horario de Atención
                    </Typography>
                    <Typography color="black">Lunes – Viernes: 08:00 -12:00 y 15:00 – 19:00 Hrs.</Typography>
                    <Typography color="black">Sádado: 08:00 – 12:00 Hrs.</Typography>

                    <Typography as={"h4"} color="black" className="font-bold text-lg mt-4">
                        Ubicación
                    </Typography>
                    <iframe title="Ubicación Santa Cruz" className="border-0 max-w-full h-48 mx-auto" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d486408.4292530832!2d-63.185553!3d-17.741536000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7e6d7434001%3A0xee836099e41634dc!2sUniversidad%20NUR!5e0!3m2!1ses-419!2sus!4v1731644224261!5m2!1ses-419!2sus" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <Typography color="black">Av. Cristo Redentor #100</Typography>
                    <Typography color="black">Teléfono: 3363939 int. 555</Typography>
                    <Typography color="black">Email: info@nur.edu</Typography>
                </CardBody>
            </Card>

            <Card className="w-full sm:w-96 lg:w-72 xl:w-96  text-center">
                <CardHeader floated={false} shadow={false} color="transparent">
                    <Typography as={"h3"} color="black" className="font-bold text-xl uppercase">
                        Sede La Paz
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Typography as={"h4"} color="black" className="font-bold text-lg">
                        Horario de Atención
                    </Typography>
                    <Typography color="black">Lunes – Viernes: 09:00 -13:00 y 14:00 – 20:00 Hrs.</Typography>
                    <Typography color="black">Sábado: 09:00 – 18:00 Hrs.</Typography>

                    <Typography as={"h4"} color="black" className="font-bold text-lg mt-4">
                        Ubicación
                    </Typography>
                    <iframe title="Ubicación Santa Cruz" className="border-0 max-w-full h-48 mx-auto" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30603.796019561294!2d-68.14701504118182!3d-16.50212559317113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f208847c433db%3A0x15b9134130fcd101!2sUniversidad%20NUR%20La%20Paz!5e0!3m2!1ses-419!2sus!4v1731645402635!5m2!1ses-419!2sus" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <Typography color="black">Plaza España Esq. Méndez Arcos #710</Typography>
                    <Typography color="black">Teléfono: (2) 121700</Typography>
                    <Typography color="black">Email: marketinglpz@nur.edu</Typography>
                </CardBody>

            </Card>
        </section>
    </>);
}

export default HomePage;