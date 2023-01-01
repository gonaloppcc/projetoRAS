import React from 'react';
import {SportIcon} from '@components/SportIcon';
import {SimpleBet} from '@domain/Bet';
import {formatDate, formatNumber} from '../../utils/formatters';

export interface OnGoingSimpleBetRecordProps extends SimpleBet {
    cancelBetHandler: () => void;
}

export const OnGoingSimpleBetRecord = ({
    oddId: {partId, price},
    event: {
        id: eventId,
        participants,
        competition: {sport},
    },
    date,
    amount,
    cancelBetHandler,
}: OnGoingSimpleBetRecordProps) => {
    console.log('OnGoingSimpleBetRecord');
    // FIXME: Hardcoded text in this component
    const betName = `Resultado Final: ${partId ?? 'Empate'}`; // FIXME: Only valid to Participant Bets

    const sportId = 'Football'; // FIXME: Sport is not being returned by the API

    const betPossibleWinnings = amount * price;

    const dateFormatted = formatDate(date);

    const homeName = participants.home.participant.participantName || '';
    const awayName = participants.away.participant.participantName || '';

    const eventName = `${homeName} - ${awayName}`;

    return (
        <div className="flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded">
            <div className="flex flex-row justify-center items-center gap-4">
                <SportIcon eventType={sportId} />
                <div className="flex flex-col items-start p-0 gap-1">
                    <span className="text-EERIE_BLACK text-base font-semibold">
                        {betName}
                    </span>
                    <span className="text-LIGHT_GRAY text-xs">{eventName}</span>
                </div>
            </div>
            <div className="hidden xl:flex flex-col items-start p-0 gap-2 ">
                <span className="text-LIGHT_GRAY text-sm">{'Data'}</span>
                <span className="text-EERIE_BLACK text-base">
                    {dateFormatted}
                </span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Cota'}</span>
                <span className="text-SPECIAL text-base">{price}</span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Valor apostado'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {formatNumber(amount)} €
                </span>
            </div>
            <div className="flex flex-col items-start py-4 gap-2">
                <span className="text-LIGHT_GRAY text-xs">
                    {'Potenciais Ganhos'}
                </span>
                <span className="text-base font-semibold">
                    {formatNumber(betPossibleWinnings)} €
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
