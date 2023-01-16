import React from 'react';
import {BetState} from '@state/useBettingSlip';
import {SportIcon} from '@components/SportIcon';
import {formatNumber} from '../../utils/formatters';
import {CloseButton} from '@components/CloseButton';

export interface MultipleBetCardProps extends Omit<BetState, 'bettingAmount'> {
    removeBetHandler?: () => void;
}

export const MultipleBetCard = ({
    id,
    eventId,
    eventName,
    eventType,
    odd: {partId, price},
    removeBetHandler,
}: MultipleBetCardProps) => {
    return (
        <div className="flex flex-row justify-between items-center px-2 py-2 min-w-min w-full h-20 border rounded bg-WHITE">
            <div className="flex flex-row justify-start items-center gap-2">
                <SportIcon eventType={eventType} />
                <div className="flex flex-col justify-start items-start">
                    <span className="font-semibold">{partId}</span>
                    <span className="font-sans font-normal font-extralight text-xs">
                        {eventName}
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-start gap-2 items-center">
                <span className="font-semibold">{formatNumber(price)}</span>
                <CloseButton onClick={removeBetHandler} />
            </div>
        </div>
    );
};
