import React from 'react';
import {MultiBetOdd, MultipleBet} from '@domain/Bet';
import {formatDate, formatNumber} from '../../utils/formatters';
import {getEvent} from 'services/backend/event';
import {useEvent} from '@hooks/useEvent';

export interface OnGoingMultipleBetRecordProps extends MultipleBet {
    cancelBetHandler: () => void;
}

export const OnGoingMultipleBetRecord = ({
    date,
    amount,
    cancelBetHandler,
    odds,
}: OnGoingMultipleBetRecordProps) => {
    // FIXME: Hardcoded text in this component
    //const betName = `Resultado Final: ${PartId ?? 'Empate'}`; // FIXME: Only valid to Participant Bets

    //const eventType = Sport.Name;

    const price = odds.reduce((acc, odd) => acc * odd.odd.price, 1);

    const betPossibleWinnings = amount * price;

    const dateFormatted = formatDate(date);

    const numberOfEvents = odds.length;

    //const awayName = Participants.Away.Participant.Part?.Name || '';
    //const homeName = Participants.Home.Participant.Part?.Name || '';

    //const eventName = `${homeName} - ${awayName}`;

    const getEventName = (odd: MultiBetOdd) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {isSuccess, event} = useEvent(odd.eventId);
        console.log(event);
        const awayName = isSuccess
            ? event.participants.away.participant.participantName
            : 'Away';
        const homeName = isSuccess
            ? event.participants.away.participant.participantName
            : 'Home';
        return `${homeName} - ${awayName}`;
    };

    return (
        <div className="w-full flex flex-col items-start">
            <div className="w-full flex flex-row justify-between items-center px-4 py-2 gap-8 bg-WHITE rounded">
                <div className="flex flex-row justify-center items-center gap-4">
                    <div className="flex flex-col items-start p-0 gap-1">
                        <span className="text-EERIE_BLACK text-base font-semibold">
                            {`Multiple Bet with ${numberOfEvents} events`}
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
                    <span className="text-SPECIAL text-base">
                        {formatNumber(price)}
                    </span>
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
            <div className="w-full flex flex-col gap-5 pr-10 bg-WHITE pb-2">
                {odds.map((odd) => (
                    <div
                        key={odd.eventId}
                        className="w-full flex  justify-between px-4  bg-WHITE rounded"
                    >
                        <div className="flex flex-row justify-center items-center gap-4">
                            <div className="flex flex-col items-start p-0 gap-1">
                                <span className="text-EERIE_BLACK text-base font-semibold">
                                    {getEventName(odd)}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row ">
                            <div className="flex flex-col p-0 gap-1 w-full ">
                                <span className="text-EERIE_BLACK text-base font-semibold">
                                    {odd.odd.price}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
