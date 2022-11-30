import React from 'react';
import {formatMoney} from '../../utils/formatters';

interface OddCardProps {
    name: string;
    price: number;
    placeOddHandler?: () => void;
    selected?: boolean;
}

export const OddCard = ({
    name,
    price,
    placeOddHandler,
    selected,
}: OddCardProps) => {
    return (
        <div
            onClick={placeOddHandler}
            className="flex flex-col justify-center items-center w-24 p-1 bg-SPECIAL hover:bg-SPECIAL_DARK cursor-pointer rounded backdrop-blur-sm active:translate-y-0.5"
        >
            <span className="font-sans font-thin text-xs text-center">
                {name}
            </span>
            <span className="font-semibold text-sm">{formatMoney(price)}</span>
        </div>
    );
};
