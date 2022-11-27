import React from 'react';
import {SportsSoccer} from '@mui/icons-material';

export interface OnGoingBetRecordProps {
    eventName: string;
    eventDate: string;
    eventType: string; // FIXME Change to enum

    betName: string;
    betOdd: number;
    betAmount: number;
    betPossibleWinnings: number;
    cancelBetHandler: () => void;
}

export const OnGoingBetRecord = ({
    eventName,
    eventDate,
    eventType,
    betName,
    betOdd,
    betAmount,
    betPossibleWinnings,
    cancelBetHandler,
}: OnGoingBetRecordProps) => {
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
                <span className="text-SPECIAL text-base">{betOdd}</span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Valor apostado'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {betAmount} €
                </span>
            </div>
            <div className="flex flex-col items-start py-4 gap-2">
                <span className="text-LIGHT_GRAY text-xs">
                    {'Potenciais Ganhos'}
                </span>
                <span className="text-base font-semibold">
                    {betPossibleWinnings} €
                </span>
            </div>

            <div className="flex flex-col items-start py-4 gap-2">
                <button
                    onClick={cancelBetHandler}
                    className="bg-SPECIAL hover:bg-SPECIAL_DARK p-3 rounded font-semibold"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};
