import React from 'react';
import {OddCard} from '../OddCard';
import {useBettingSlip} from '@state/useBettingSlip';
import {Event} from '../../domain/Event';

interface Odd {
    name: string;
    price: number;
}

export interface EventCardProps {
    eventId: string;
    eventName: string;
    eventType: string;
    commenceTime: string;
    odds: Odd[];
}

export const EventCard = ({
    Id,
    Date: date,
    Competition,
    Participants,
    Completed,
}: Event) => {
    const {addBet} = useBettingSlip();

    const awayName = Participants.Away.Participant.Part.Name;
    const homeName = Participants.Home.Participant.Part.Name;

    const eventName = `${homeName} - ${awayName}`;

    const eventType = Competition.Sport.Name;

    const odds = [
        {
            name: homeName,
            price: Participants.Home.Participant.Price,
        },
        {
            name: 'Empate',
            price: 2.57, // FIME: Hardcoded for now
        },
        {
            name: awayName,
            price: Participants.Away.Participant.Price,
        },
    ];

    console.log({odds});

    const addBetHandler = (odd: Odd) => {
        return () => addBet({eventType, eventId: Id, eventName, odd});
    };

    // TODO: Improve the date format
    const dateString = new Date(date).toLocaleDateString('pt-PT', {
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
