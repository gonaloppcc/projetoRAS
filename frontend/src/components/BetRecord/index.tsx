import React from 'react';
import {SportsSoccer} from '@mui/icons-material';

export interface BetRecordProps {
    eventName: string;
    eventDate: string;
    eventType: string; // FIXME Change to enum

    betName: string;
    betOdd: number;
    betAmount: number;
    betWinnings: number;
}

export const BetRecord = ({
    eventName,
    eventDate,
    eventType,
    betName,
    betOdd,
    betAmount,
    betWinnings,
}: BetRecordProps) => {
    // FIXME: Hardcoded text in this component
    return (
        <div className="flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded">
            <div className="flex flex-row justify-center items-center gap-4">
                <SportsSoccer />
                <div className="flex flex-col items-start p-0 gap-1">
                    <span className="text-EERIE_BLACK text-base font-semibold">
                        {betName}
                    </span>
                    <span className="text-LIGHT_GRAY text-xs">{eventName}</span>
                </div>
            </div>
            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Data'}</span>
                <span className="text-EERIE_BLACK text-base">{eventDate}</span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Cota'}</span>
                <span className="text-SPECIAL text-base font-semibold">
                    {betOdd}
                </span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Valor apostado'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {betAmount} €{' '}
                    {/* FIXME: Money currency is hardcoded and can vary */}
                </span>
            </div>

            {betWinnings > 0 && (
                <div className="h-full flex flex-col items-start w-20 p-4 gap-2 bg-RIGHT_GREEN text-WHITE">
                    <span className="text-xs">{'Ganhos'}</span>
                    <span className="text-base font-semibold">
                        {betWinnings} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {betWinnings === 0 && (
                <div className="flex flex-col items-start w-20 p-4 gap-2 bg-IMPERIAL_RED text-WHITE">
                    <span className="text-xs">{'Ganhos'}</span>
                    <span className="text-base">
                        {betWinnings} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
        </div>
    );
};
