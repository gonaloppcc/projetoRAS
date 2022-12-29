import React from 'react';

export interface PossibilitiesProps {
    possibilities: string[];
    setChosenPossibility: (value: string) => void;
}

export const Possibilities = ({
    possibilities,
    setChosenPossibility,
}: PossibilitiesProps) => {
    const onClick = (possibility: string) => {
        return () => setChosenPossibility(possibility);
    };

    return (
        <div>
            {possibilities.map((possibility) => (
                <div
                    key={possibility}
                    className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                    onClick={onClick(possibility)}
                >
                    {possibility}
                </div>
            ))}
        </div>
    );
};
