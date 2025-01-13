import { Carousel } from "@material-tailwind/react";

const HomeCarouselComponent = () => {
    return (<Carousel className="rounded-xl" loop autoplay autoplayDelay={5000}>
        <a href="/" className="h-full w-full">
            <img
                src="/images/inicio/ESTUDIA-PSICOLOGIA-1080X750.jpg"
                alt="Estudia psicología"
                className="w-full aspect-video mx-auto pointer-events-none"
            />
        </a>
        <a href="/" className="h-full w-full">
            <img
                src="/images/inicio/ESTUDIA-NUTRICION-1080x750-1.jpg"
                alt="Estudia nutrición"
                className="w-full aspect-video mx-auto"
            />
        </a>
        <a href="/" className="h-full w-full">
            <img
                src="/images/inicio/tamano-1060X600-3.jpg"
                alt="Estudia psicopedagogía"
                className="w-full aspect-video mx-auto"
            />
        </a>
        <a href="/" className="h-full w-full">
            <img
                src="/images/inicio/tamano-1060X600-7.jpg"
                alt="Estudia fisioterapia"
                className="w-full aspect-video mx-auto"
            />
        </a>
    </Carousel>);
}

export default HomeCarouselComponent;