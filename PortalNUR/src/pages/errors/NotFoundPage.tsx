import { Typography } from "@material-tailwind/react";

const NotFoundPage = () => {
    return (<>
        <Typography as="h1" className="text-3xl font-bold text-center mb-3">
            Página no encontrada
        </Typography>
        <Typography as="p" className="text-md text-center mb-auto" color="blue-gray">
            La página a la que intenta acceder no esta disponible.
        </Typography>
    </>);
}

export default NotFoundPage;