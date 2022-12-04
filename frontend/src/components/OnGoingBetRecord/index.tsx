import React from 'react';
import {SportIcon} from '@components/SportIcon';
import {Bet} from '@domain/Bet';
import {formatDate} from '../../utils/formatters';

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
    Id,
    Odd: {Id: OddId, PartId, Price},
    EventId,
    Date,
    Closed,
    BetterId,
    Amount,
}: Bet) => {
    // FIXME: Hardcoded text in this component
    const betName = `Resultado Final: ${PartId}`; // FIXME: Only valid to Participant Bets

    const eventType = 'Football'; // FIXME: Event type is hardcoded

    const eventName = 'FC Porto vs. Benfica';

    const betPossibleWinnings = Amount * Price;

    const cancelBetHandler = () => {
        console.log('Aposta cancelada');
    };

    const dateFormatted = formatDate(Date);

    return (
        <div className="flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded">
            <div className="flex flex-row justify-center items-center gap-4">
                <SportIcon eventType={eventType} />
                <div className="flex flex-col items-start p-0 gap-1">
                    <span className="text-EERIE_BLACK text-base font-semibold">
                        {betName}
                    </span>
                    <span className="text-LIGHT_GRAY text-xs">{eventName}</span>
                </div>
            </div>
            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Data'}</span>
                <span className="text-EERIE_BLACK text-base">
                    {dateFormatted}
                </span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Cota'}</span>
                <span className="text-SPECIAL text-base">{Price}</span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Valor apostado'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {Amount} €
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
