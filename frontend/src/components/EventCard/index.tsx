import React from 'react';
import {OddCard} from '../OddCard';
import {useBettingSlip} from '@state/useBettingSlip';

interface Odd {
    name: string;
    price: number;
}

export interface EventCardProps {
    eventId: string;
    eventName: string;
    commenceTime: string;
    odds: Odd[];
}

export const EventCard = ({
    eventId,
    eventName,
    commenceTime,
    odds,
}: EventCardProps) => {
    const {addBet} = useBettingSlip();

    const addBetHandler = (odd: Odd) => {
        return () => addBet({eventId, eventName, odd});
    };

    // TODO: Improve the date format
    const dateString = new Date(commenceTime).toLocaleDateString('pt-PT', {
        minute: 'numeric',
        hour: 'numeric',
        weekday: 'long',
    });
    return (
        <div className="flex flex-row justify-between items-center px-4 min-w-min w-full h-20 drop-shadow-sm rounded bg-WHITE gap-5">
            <div className="flex flex-row items-center gap-1">
                {/* TODO: Add Promotion image here <div>Promotion image if needed</div>*/}
                <div className="flex flex-col justify-start items-start">
                    <span>{eventName}</span>
                    <span className="font-sans font-normal font-extralight text-xs">
                        {dateString}
                    </span>
                </div>
            </div>
            <div className="h-full flex flex-row justify-end items-center gap-2">
                {odds.map((odd) => (
                    <OddCard
                        key={odd.name}
                        {...odd}
                        placeOddHandler={addBetHandler(odd)}
                    />
                ))}
            </div>
        </div>
    );
};
