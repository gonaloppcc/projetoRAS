import {useState} from 'react';

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const currentPageHandler = (page: number) => {
        if (page >= 0) {
            setCurrentPage(page);
        }
    };

    return {
        currentPage,
        setCurrentPage: currentPageHandler,
    };
};
