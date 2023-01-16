import React from 'react';
import {BetState} from '@state/useBettingSlip';
import {SportIcon} from '@components/SportIcon';
import {formatNumber} from '../../utils/formatters';
import {CloseButton} from '@components/CloseButton';
import {Input} from '@components/Input';

export interface SimpleBetCardProps extends BetState {
    bettingAmount: number;
    removeBetHandler?: () => void;
    setBettingAmount: (amount: number) => void;
    currency?: string;
}

export const SimpleBetCard = ({
    eventName,
    eventType,
    bettingAmount,
    setBettingAmount,
    odd: {partId, price},
    removeBetHandler,
    currency,
}: SimpleBetCardProps) => {
    const bettingAmountAsString = String(bettingAmount);

    const setBettingAmountHandler = (amount: string) => {
        setBettingAmount(Number(amount));
    };

    return (
        <div className="flex flex-col justify-start items-start gap-2 px-2 py-2 min-w-min w-full h-28 border rounded bg-WHITE">
            <div className="w-full flex flex-row justify-between items-center gap-2">
                <div className="w-full flex flex-row gap-2 items-center">
                    <SportIcon eventType={eventType} />
                    <div className="flex flex-col justify-start items-start">
                        <span className="font-semibold">{partId}</span>
                        <span className="font-sans font-normal font-extralight text-xs">
                            {eventName}
                        </span>
                    </div>
                </div>
                <CloseButton onClick={removeBetHandler} />
            </div>
            <div className="w-full flex flex-row justify-between items-center gap-4">
                <div className="flex flex-col">
                    <span>{'Odd' /* FIXME: Hardcoded text for now! */}</span>
                    <span className="font-semibold">{formatNumber(price)}</span>
                </div>
                <Input
                    value={bettingAmountAsString}
                    onChange={setBettingAmountHandler}
                    suffix={currency}
                />
                <div className="flex flex-col">
                    <span>{'Ganhos' /* FIXME: Hardcoded text for now! */}</span>
                    <span className="font-semibold">
                        {formatNumber(bettingAmount * price)}
                    </span>
                </div>
            </div>
        </div>
    );
};
