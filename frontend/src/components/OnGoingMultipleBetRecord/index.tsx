import React from 'react';
import {MultipleBet} from '@domain/Bet';
import {formatDate, formatNumber} from '../../utils/formatters';

export interface OnGoingMultipleBetRecordProps extends MultipleBet {
    cancelBetHandler: () => void;
}

export const OnGoingMultipleBetRecord = ({
    Date,
    Amount,
    cancelBetHandler,
    Odds,
}: OnGoingMultipleBetRecordProps) => {
    // FIXME: Hardcoded text in this component
    //const betName = `Resultado Final: ${PartId ?? 'Empate'}`; // FIXME: Only valid to Participant Bets

    //const eventType = Sport.Name;

    const price = Odds.reduce((acc, odd) => acc * odd.Odd.Price, 1);

    const betPossibleWinnings = Amount * price;

    const dateFormatted = formatDate(Date);

    const numberOfEvents = Odds.length;

    //const awayName = Participants.Away.Participant.Part?.Name || '';
    //const homeName = Participants.Home.Participant.Part?.Name || '';

    //const eventName = `${homeName} - ${awayName}`;

    return (
        <div className="w-full flex flex-col items-start">
            <div className="w-full flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded">
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
            <div className="w-full flex flex-col gap-5 pr-40 bg-WHITE">
                {Odds.map((odd) => (
                    <div
                        key={odd.Odd.Id}
                        className="w-full flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded"
                    >
                        <div className="flex flex-row justify-center items-center gap-4">
                            <div className="flex flex-col items-start p-0 gap-1">
                                <span className="text-EERIE_BLACK text-base font-semibold">
                                    {
                                        odd.Event.Participants.Away.Participant
                                            .Part?.Name
                                    }
                                    {' - '}
                                    {
                                        odd.Event.Participants.Home.Participant
                                            .Part?.Name
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <div className="flex flex-col items-start p-0 gap-1">
                                <span className="text-EERIE_BLACK text-base font-semibold">
                                    {odd.Odd.Price}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
