import React from 'react';
import {CompetitionCard, CompetitionProps} from '@components/CompetitionCard';

export interface CompetitionsProps {
    competitions: CompetitionProps[];
}

export const Competitions = ({competitions}: CompetitionsProps) => {
    return (
        <div className="flex flex-col items-start max-w-lg p-0">
            <div className="p-2.5 bg-WHITE w-full">
                {'TOP COMPETITIONS' /* FIXME: Hardcoded for now!! */}
            </div>
            <div className="w-full flex flex-col items-center p-0 gap-0.5">
                {competitions.map((props) => (
                    <CompetitionCard key={props.name} {...props} />
                ))}
            </div>
        </div>
    );
};
