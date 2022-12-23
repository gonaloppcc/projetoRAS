import React from 'react';
import {formatNumber} from '../../utils/formatters';

export interface OddCardProps {
    Id: string;
    PartId: string;
    Price: number;
    placeOddHandler?: () => void;
    selected?: boolean;
}

export const OddCard = ({
    PartId,
    Price,
    placeOddHandler,
    selected,
}: OddCardProps) => {
    return (
        <div
            onClick={placeOddHandler}
            className="flex flex-col justify-center items-center w-24 p-1 bg-SPECIAL hover:bg-SPECIAL_DARK cursor-pointer rounded backdrop-blur-sm active:translate-y-0.5"
        >
            <span className="font-sans font-thin text-xs text-center">
                {PartId}
            </span>
            <span className="font-semibold text-sm">{formatNumber(Price)}</span>
        </div>
    );
};
