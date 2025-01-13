import { Outlet } from "react-router-dom";
import TopNabvarComponent from "../components/common/TopNavbarComponent";
import FooterComponent from "../components/common/FooterComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const MainLayout = () => {
    return (
        <>
            <TopNabvarComponent />
            <a href="/" className="flex rounded-full w-fit mx-auto p-3 my-5 bg-link text-white text-sm">
                IR A SEDE LA PAZ
            </a>
            <main className="max-w-screen-2xl 2xl:mx-auto w-full px-8 sm:px-12 md:px-16 lg:px-24 flex-1">
                <Outlet />
            </main>
            <a href="https://notas2.nur.edu/adminSite/pagos.html" className="absolute bottom-32 left-8">
                <img src="/icons/tarjeta-Pago-Virtual50X50.png" alt="Enlace Pagos" className="w-[50px]" />
            </a>
            <a href="/" className="absolute bottom-8 left-8">
                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-white bg-[#25d366] w-[50px] h-[50px] rounded-full p-2 !box-border" />
            </a>
            <FooterComponent />
        </>
    );
}

export default MainLayout;