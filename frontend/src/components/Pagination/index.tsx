import React from 'react';
import classNames from 'classnames';

interface PaginationProps {
    currentPage: number;
    totalPages: number;

    onPageChange: (page: number) => void;
}

const RANGE = 2;

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const humanCurrentPage = currentPage + 1;

    const humanTotalPages = totalPages + 1;

    const humanOnPageChange = (page: number) => {
        onPageChange(page - 1);
    };

    const firstPageIndex =
        humanCurrentPage - RANGE < 1 ? 1 : humanCurrentPage - RANGE;

    const pages = Array.from({length: totalPages}, (_, i) => i).slice(
        firstPageIndex,
        firstPageIndex + RANGE * 2 + 1
    );

    const onPreviousPageHandler = () => {
        if (humanCurrentPage > 1) {
            humanOnPageChange(humanCurrentPage - 1);
        }
    };

    const onNextPageHandler = () => {
        if (humanCurrentPage < humanTotalPages) {
            humanOnPageChange(humanCurrentPage + 1);
        }
    };

    const changePageHandler = (page: number) => {
        humanOnPageChange(page);
    };

    return (
        <div className="w-full flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={onPreviousPageHandler}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                >
                    Previous
                </button>
                <button
                    onClick={onNextPageHandler}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={onPreviousPageHandler}
                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => changePageHandler(page)}
                                aria-current="page"
                                className={classNames({
                                    'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20':
                                        page === humanCurrentPage,
                                    'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20':
                                        page !== humanCurrentPage,
                                })}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={onNextPageHandler}
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};
