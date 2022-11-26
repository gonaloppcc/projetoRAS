import React from 'react';

interface OddCardProps {
    name: string;
    price: number;
    onClick?: () => void;
    selected?: boolean;
}

export const OddCard = ({name, price, onClick, selected}: OddCardProps) => {
    return (
        <div className="flex flex-col justify-center items-center w-20 h-full px-1 bg-SPECIAL_DARK cursor-pointer rounded backdrop-blur-sm">
            <span className="font-sans font-thin text-xs text-center">
                {name}
            </span>
            <span className="font-semibold text-sm">{price}</span>
        </div>
    );
};
