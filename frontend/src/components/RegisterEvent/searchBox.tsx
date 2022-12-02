import {PrimaryButton} from '@components/Button';
import React, {useEffect, useState} from 'react';

// Depois meter isto genérico, recebe uma lista de coisas, e vai filtrando

export interface SearchBoxProps {
    title: string;
    content: [string];
    currentSearch: string;
    changeCurrentSearch: (value: string) => void;
    selected: boolean;
    changeSelected: (value: boolean) => void;
    maybeError: string;
}

export const SearchBox = ({
    content,
    title,
    currentSearch,
    changeCurrentSearch,
    selected,
    changeSelected,
    maybeError,
}: SearchBoxProps) => {
    const [validEntries, setValidEntries] = useState<[string]>(content);

    const maxSearchBox: number = 3;

    const changeSearchBar = (e) => {
        const {name, value} = e.target;
        changeCurrentSearch(value);
        const possibilities = content.filter((name) => name.includes(value));
        // If there was an option selected, it won't be any more.
        // Because the user uses the search bar again.
        if (selected) changeSelected(false);
        setValidEntries(possibilities);
    };

    const lineChoosen = (e) => {
        const selected = e.target.innerHTML;
        changeCurrentSearch(selected);
        changeSelected(true);
    };

    const clicou = () => {
        if (currentSearch.length == 0) {
            setValidEntries(content);
        }
        changeSelected(false);
    };

    return (
        <div className="flex justify-center p-4 px-3 py-10">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
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
                            onClick={() => clicou()}
                            // FIXME
                            placeholder={`Procura ${title.toLowerCase()}`}
                        ></input>
                    </div>
                    <div className="py-3 text-sm overflow-auto max-h-28">
                        {!selected &&
                            validEntries.map((line) => (
                                <div
                                    key={line}
                                    className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                                    onClick={lineChoosen}
                                >
                                    {line}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="text-red-500 font-semibold">{maybeError}</div>
            </div>
        </div>
    );
};
