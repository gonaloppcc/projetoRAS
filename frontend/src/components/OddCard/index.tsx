import React from 'react';
import {formatNumber} from '../../utils/formatters';

export interface OddCardProps {
    id: string;
    partId: string;
    price: number;
    placeOddHandler?: () => void;
    selected?: boolean;
}

export const OddCard = ({
    partId,
    price,
    placeOddHandler,
    selected,
}: OddCardProps) => {
    const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();

        if (placeOddHandler) {
            placeOddHandler();
        }
    };

    return (
        <div
            onClick={onClickHandler}
            className="flex flex-col justify-center items-center w-24 p-1 bg-SPECIAL hover:bg-SPECIAL_DARK cursor-pointer rounded backdrop-blur-sm active:translate-y-0.5"
        >
            <span className="font-sans font-thin text-xs text-center">
                {partId}
            </span>
            <span className="font-semibold text-sm">{formatNumber(price)}</span>
        </div>
    );
};
