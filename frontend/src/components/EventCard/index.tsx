import React from 'react';
import {OddCard} from '../OddCard';

interface Odd {
    name: string;
    price: number;
}

export interface EventCardProps {
    eventName: string;
    date: string;
    odds: Odd[];
}

export const EventCard = (props: EventCardProps) => {
    return (
        <div className="flex flex-row justify-between items-center px-4 py-2 min-w-min w-full h-18 drop-shadow-sm rounded bg-WHITE gap-5">
            <div className="flex flex-row items-center gap-1">
                {/* TODO: Add Promotion image here <div>Promotion image if needed</div>*/}
                <div className="flex flex-col justify-start items-start">
                    <span>{props.eventName}</span>
                    <span className="font-sans font-normal font-extralight text-xs">
                        {props.date}
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
                {props.odds.map((odd) => (
                    <OddCard key={odd.name} {...odd} />
                ))}
            </div>
        </div>
    );
};
