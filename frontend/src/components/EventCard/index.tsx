import React from 'react';
import {OddCard} from '../OddCard';
import {useBettingSlip} from '@state/useBettingSlip';
import {Event} from '@domain/Event';
import {formatDate} from '../../utils/formatters';
import {Odd} from '@domain/Bet';
import {useRouter} from 'next/router';

export const EventCard = ({
    Id,
    Date: date,
    Competition,
    Participants,
    Completed,
}: Event) => {
    const {addBet} = useBettingSlip();
    const router = useRouter();

    const awayName = Participants.Away.Participant.Part?.Name || '';
    const homeName = Participants.Home.Participant.Part?.Name || '';

    const eventName = `${homeName} - ${awayName}`;

    const eventType = Competition.Sport.Name;

    const odds = [
        {
            Id: Participants.Home.Participant.Id,
            PartId: homeName,
            Price: Participants.Home.Participant.Price,
        },
        {
            Id: Participants.Tie?.Id, // FIXME: This is not correct, the Id should be the Tie Odd Id
            PartId: 'Empate',
            Price: Participants.Tie?.Price, // FIME: Hardcoded for now
        },
        {
            Id: Participants.Away.Participant.Id,
            PartId: awayName,
            Price: Participants.Away.Participant.Price,
        },
    ];

    const onClickHandler = async () => {
        await router.push(`/event/${Id}`);
    };

    const addBetHandler = (odd: Odd) => {
        return () =>
            addBet({
                eventId: Id,
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
            className="flex flex-row justify-between items-center px-4 min-w-min w-full h-20 drop-shadow-sm rounded bg-WHITE gap-5 cursor-pointer"
        >
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
                        key={odd.Id}
                        {...odd}
                        placeOddHandler={addBetHandler(odd)}
                    />
                ))}
            </div>
        </div>
    );
};
