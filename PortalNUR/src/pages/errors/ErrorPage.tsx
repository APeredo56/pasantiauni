import { Typography } from "@material-tailwind/react";
import TopNabvarComponent from "../../components/common/TopNavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import FooterComponent from "../../components/common/FooterComponent";

const ErrorPage = () => {
    return (<>
        <TopNabvarComponent />
        <a href="/" className="flex rounded-full w-fit mx-auto p-3 my-5 bg-link text-white text-sm">
            IR A SEDE LA PAZ
        </a>
        <Typography as="h1" className="text-3xl font-bold text-center mb-3">
            Error
        </Typography>
        <Typography as="p" className="text-md text-center mb-auto" color="blue-gray">
            Ocurrió un error inesperado.
        </Typography>
        <a href="https://notas2.nur.edu/adminSite/pagos.html" className="absolute bottom-32 left-8">
            <img src="/icons/tarjeta-Pago-Virtual50X50.png" alt="Enlace Pagos" className="w-[50px]" />
        </a>
        <a href="/" className="absolute bottom-8 left-8">
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-white bg-[#25d366] w-[50px] h-[50px] rounded-full p-2 !box-border" />
        </a>
        <FooterComponent />
    </>);
}

export default ErrorPage;