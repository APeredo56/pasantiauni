import { Typography } from "@material-tailwind/react";

const TextDivider = ({ text }: { text: string }) => {
    return (<Typography as="p" className="text-xl my-5 font-bold flex items-center text-center before:flex-grow before:border-t-2 before:border-black after:flex-grow after:border-t-2 after:border-black">
        {text}
    </Typography>);
}

export default TextDivider;