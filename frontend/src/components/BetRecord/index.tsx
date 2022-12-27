import React from 'react';
import {formatDate} from '../../utils/formatters';
import {SportIcon} from '@components/SportIcon';
import {Bet} from '@domain/Bet';

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
    Id,
    Odd: {Id: OddId, PartId, Price},
    Event: {Participants},
    Date,
    Closed,
    BetterId,
    Amount,
}: Bet) => {
    // FIXME: Hardcoded text in this component
    const betName = `Resultado Final: ${PartId}`;

    const eventType = 'Football';

    const awayName = Participants.Away.Participant.Part?.Name || '';
    const homeName = Participants.Home.Participant.Part?.Name || '';

    const eventName = `${homeName} - ${awayName}`;

    const betWinnings = Amount * Price; // FIXME: This is not correct, the better could lose the bet

    const cancelBetHandler = () => {
        // FIXME: These bets are already closed, so we should not be able to cancel them
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
                <span className="text-SPECIAL text-base font-semibold">
                    {Price}
                </span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Valor apostado'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {Amount} €{' '}
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
