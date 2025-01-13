import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

type Props = {
    pages: number;
    currentPage: number;
    changePage: (page: number) => void;
}

const PaginationComponent = ({ pages, currentPage, changePage }: Props) => {
    const [maxVisible, setMaxVisible] = useState(5);

    useEffect(() => {
        const updateMaxVisible = () => {
            const width = window.innerWidth;
            if (width < 640) setMaxVisible(3);
            else if (width < 768) setMaxVisible(5);
            else if (width < 1024) setMaxVisible(7);
            else if (width < 1280) setMaxVisible(9);
            else setMaxVisible(11);
        };

        updateMaxVisible();
        window.addEventListener("resize", updateMaxVisible);

        return () => window.removeEventListener("resize", updateMaxVisible);
    }, []);

    const getVisiblePages = () => {
        const visiblePages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(pages, startPage + maxVisible - 1);

        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center gap-2">
            <Button variant="text" className="p-0" onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faArrowLeft} className="h-6 w-6 text-blue-500" />
            </Button>
            <div className="flex gap-2 hidden sm:flex">
                {visiblePages[0] > 1 && (
                    <>
                        <button
                            className={`rounded-full px-3 py-1 ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => changePage(1)}
                        >
                            1
                        </button>
                        {visiblePages[0] > 2 && <span className="px-2">...</span>}
                    </>
                )}
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        className={`rounded-full px-3 py-1 ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => changePage(page)}
                    >
                        {page}
                    </button>
                ))}
                {visiblePages[visiblePages.length - 1] < pages && (
                    <>
                        {visiblePages[visiblePages.length - 1] < pages - 1 && (
                            <span className="px-2">...</span>
                        )}
                        <button
                            className={`rounded-full px-3 py-1 ${currentPage === pages ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            onClick={() => changePage(pages)}
                        >
                            {pages}
                        </button>
                    </>
                )}
            </div>
            <Typography variant="paragraph" className="sm:hidden">
                Página <span className="font-bold">{currentPage}</span> de <span className="font-bold">{pages}</span>
            </Typography>
            <Button variant="text" className="p-0" onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === pages}>
                <FontAwesomeIcon icon={faArrowRight} className="h-6 w-6 text-blue-500" />
            </Button>
        </div>

    );
}

export default PaginationComponent;