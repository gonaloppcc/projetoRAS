import React from 'react';
import {SportIcon} from '@components/SportIcon';
import {SimpleBet} from '@domain/Bet';
import {formatDate, formatNumber} from '../../utils/formatters';
import {useEvent} from '@hooks/useEvent';

export interface OnGoingSimpleBetRecordProps extends SimpleBet {
    cancelBetHandler: () => void;
    open: boolean;
}

export const OnGoingSimpleBetRecord = ({
    odd: {participantName, price},
    eventId,
    date,
    amount,
    cancelBetHandler,
    open,
}: OnGoingSimpleBetRecordProps) => {
    console.log('OnGoingSimpleBetRecord');
    console.log(open);
    // FIXME: Hardcoded text in this component
    const betName = `Resultado Final: ${participantName ?? 'Empate'}`; // FIXME: Only valid to Participant Bets

    const sportId = 'Football'; // FIXME: Sport is not being returned by the API

    const betPossibleWinnings = amount * price;

    const dateFormatted = formatDate(date);

    const {isSuccess, event} = useEvent(eventId);
    const homeName = isSuccess
        ? event.participants.home.participant.participantName
        : 'Home team'; // participants.home.participant.participantName || '';
    const awayName = isSuccess
        ? event.participants.away.participant.participantName
        : 'Aqay team'; //participants.away.participant.participantName || '';

    const eventName = `${homeName} - ${awayName}`;

    return (
        <div className="flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded">
            <div className="flex flex-row justify-center items-center gap-4">
                <SportIcon eventType={sportId} />
                <div className="flex flex-col items-start p-0 gap-1">
                    <span className="text-EERIE_BLACK text-base font-semibold">
                        {betName}
                    </span>
                    <span className="text-MEDIUM_GRAY text-xs">
                        {eventName}
                    </span>
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
            {open && (
                <div className="flex flex-col items-start py-4 gap-2">
                    <button
                        onClick={cancelBetHandler}
                        className="bg-SPECIAL hover:bg-SPECIAL_DARK p-3 rounded font-semibold"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};
