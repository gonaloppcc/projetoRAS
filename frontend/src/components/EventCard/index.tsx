import React from 'react';
import {OddCard} from '../OddCard';
import {useBettingSlip} from '@state/useBettingSlip';
import {Event} from '@domain/Event';
import {formatDate} from '../../utils/formatters';
import {Odd} from '@domain/Bet';
import {useRouter} from 'next/router';

export const EventCard = ({
    id,
    date,
    competition,
    participants,
    completed,
}: Event) => {
    const {addBet} = useBettingSlip();
    const router = useRouter();

    const awayName = participants.away.participant.participantName || '';
    const homeName = participants.home.participant.participantName || '';

    const eventName = `${homeName} - ${awayName}`;

    const eventType = competition;

    const odds = [
        {
            Id: participants.home.participant.id,
            PartId: homeName,
            Price: participants.home.participant.price,
        },
        {
            Id: participants.tie.id,
            PartId: 'Empate',
            Price: participants.tie.price,
        },
        {
            Id: participants.away.participant.id,
            PartId: awayName,
            Price: participants.away.participant.price,
        },
    ];

    const onClickHandler = async () => {
        await router.push(`/event/${id}`);
    };

    const addBetHandler = (odd: Odd) => {
        return () =>
            addBet({
                eventId: id,
                eventName,
                eventType,
                odd,
            });
    };

    // TODO: Improve the date format
    const dateString = formatDate(date);

    return (
        <div
            onClick={onClickHandler}
            className="flex flex-row justify-between items-center px-4 min-w-min w-full h-24 drop-shadow-sm rounded bg-WHITE gap-5 cursor-pointer"
        >
            <div className="flex flex-row items-center gap-1">
                {/* TODO: Add Promotion image here <div>Promotion image if needed</div>*/}
                <div className="flex flex-col justify-start items-start">
                    <span>{eventName}</span>
                    <span className="hidden lg:block font-sans font-normal font-extralight text-xs">
                        {dateString}
                    </span>
                </div>
            </div>
            <div className="h-full flex flex-row justify-end items-center gap-2">
                {odds.map((odd) => (
                    <OddCard
                        key={odd.Id}
                        {...odd}
                        placeOddHandler={addBetHandler(odd)}
                    />
                ))}
            </div>
        </div>
    );
};
