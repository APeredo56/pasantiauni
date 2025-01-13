import { Typography } from "@material-tailwind/react";

const FooterComponent = () => {
    return (<footer>
        <hr className="mt-8 border-blue-gray-100" />
        <Typography color="gray" className="text-center py-8">
            Formamos Agentes de Cambio con Calidad Certificada.
        </Typography>
    </footer>);
}

export default FooterComponent;