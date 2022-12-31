import React from 'react';
import {SportIcon} from '@components/SportIcon';
import {SimpleBet} from '@domain/Bet';
import {formatDate, formatNumber} from '../../utils/formatters';

export interface OnGoingSimpleBetRecordProps extends SimpleBet {
    cancelBetHandler: () => void;
}

export const OnGoingSimpleBetRecord = ({
    Odd: {PartId, Price},
    Event: {
        id: eventId,
        participants,
        competition: {sport},
    },
    Date,
    Amount,
    cancelBetHandler,
}: OnGoingSimpleBetRecordProps) => {
    // FIXME: Hardcoded text in this component
    const betName = `Resultado Final: ${PartId ?? 'Empate'}`; // FIXME: Only valid to Participant Bets

    const eventType = sport.name;

    const betPossibleWinnings = Amount * Price;

    const dateFormatted = formatDate(Date);

    const awayName = participants.away.participant.Part?.Name || '';
    const homeName = participants.home.participant.Part?.Name || '';

    const eventName = `${homeName} - ${awayName}`;

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
            <div className="hidden xl:flex flex-col items-start p-0 gap-2 ">
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
                    {formatNumber(Amount)} €
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
