import React from 'react';
import {Possibilities} from '@components/Possibilities';

// Depois meter isto genérico, recebe uma lista de coisas, e vai filtrando

export interface SearchBoxProps {
    title: string;
    allResults: string[];
    currentSearch: string;
    changeCurrentSearch: (value: string) => void;
    selected: boolean;
    changeSelected: (value: boolean) => void;
    error?: string;
}

const MAX_SEARCH_RESULTS = 3;

export const SearchBox = ({
    allResults,
    title,
    currentSearch,
    changeCurrentSearch,
    selected,
    changeSelected,
    error,
}: SearchBoxProps) => {
    const possibilities = allResults.filter((name) =>
        name.includes(currentSearch)
    );

    const changeSearchBar: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target;
        changeCurrentSearch(value);
        // If there was an option selected, it won't be anymore.
        // Because the user uses the search bar again.
        if (selected) changeSelected(false);
    };

    const lineChoosen = (value: string) => {
        changeCurrentSearch(value);
        changeSelected(true);
    };

    return (
        <div className="flex justify-center p-4 px-3 py-10">
            <div className="w-full max-w-md">
                <div className="bg-CULTURED border-2 rounded-lg px-3 py-2 mb-4">
                    <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                        {title}
                    </div>
                    <div className="flex items-center bg-gray-200 rounded-md">
                        <div className="pl-2">
                            <svg
                                className="fill-current text-gray-500 w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className="heroicon-ui"
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                />
                            </svg>
                        </div>
                        <input
                            className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                            id="search"
                            type="text"
                            value={currentSearch}
                            onChange={changeSearchBar}
                            // FIXME
                            placeholder={`Procura ${title.toLowerCase()}`}
                        ></input>
                    </div>
                    <div className="py-3 text-sm overflow-auto max-h-28">
                        {!selected && (
                            <Possibilities
                                possibilities={possibilities}
                                setChosenPossibility={lineChoosen}
                            />
                        )}
                    </div>
                </div>
                <div className="text-red-500 font-semibold">{error}</div>
            </div>
        </div>
    );
};
