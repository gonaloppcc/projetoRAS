import React from 'react';
import {OddCard} from '../OddCard';
import {useBettingSlip} from '@state/useBettingSlip';
import {Event} from '@domain/Event';
import {formatDate} from '../../utils/formatters';
import {Odd} from '@domain/Bet';
import {useRouter} from 'next/router';
import classNames from 'classnames';

export const EventCard = ({
    id,
    date,
    competition,
    participants,
    completed,
}: Event) => {
    const {addBet} = useBettingSlip();
    const router = useRouter();

    const homeName = participants.home.participant.participantName || '';
    const awayName = participants.away.participant.participantName || '';

    const eventName = `${homeName} - ${awayName}`;

    const sportId = 'Football'; // FIXME: Event type is not available in the API

    const score = `Partida terminada: ${participants.home.score} - ${participants.away.score}`;

    const odds = [
        {
            id: participants.home.participant.id,
            partId: homeName,
            price: participants.home.participant.price,
        },
        {
            id: participants.tie.id,
            partId: 'Empate',
            price: participants.tie.price,
        },
        {
            id: participants.away.participant.id,
            partId: awayName,
            price: participants.away.participant.price,
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
                eventType: sportId,
                odd,
            });
    };

    // TODO: Improve the date format
    const dateString = formatDate(date);

    return (
        <div
            onClick={onClickHandler}
            className={classNames({
                'flex flex-row justify-between items-center px-4 min-w-min w-full h-24 drop-shadow-sm rounded bg-WHITE gap-5 cursor-pointer':
                    true,
                'opacity-50': completed,
            })}
        >
            <div className="w-full flex flex-row items-center gap-1">
                {/* TODO: Add Promotion image here <div>Promotion image if needed</div>*/}
                <div className="flex flex-col justify-start items-start">
                    <span>{eventName}</span>
                    <span className="hidden lg:block font-sans font-normal font-extralight text-xs">
                        {dateString}
                    </span>
                </div>
            </div>
            <div className="w-full h-full flex flex-row justify-end items-center gap-2">
                {!completed &&
                    odds.map((odd) => (
                        <OddCard
                            key={odd.id}
                            {...odd}
                            placeOddHandler={addBetHandler(odd)}
                        />
                    ))}
                {completed && (
                    <div className="w-full flex flex-row justify-center">
                        {score}
                    </div>
                )}
            </div>
        </div>
    );
};
