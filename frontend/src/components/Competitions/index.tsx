import React from 'react';
import {CompetitionCard, CompetitionProps} from '@components/CompetitionCard';

import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

export interface CompetitionsProps {
    competitions: CompetitionProps[];
}

export const Competitions = ({competitions}: CompetitionsProps) => {
    const intl = useIntl();
    const featureTopComp = intl.formatMessage({id: 'competitions.top.competitions'});
    return (
        <div className="flex flex-col items-start w-full p-0 rounded">
            <div className="p-2.5 bg-WHITE w-full rounded">
                {featureTopComp /* FIXME: Hardcoded for now!! */}
            </div>
            <div className="w-full flex flex-col items-center p-0 gap-0.5">
                {competitions.map((props) => (
                    <CompetitionCard key={props.name} {...props} />
                ))}
            </div>
        </div>
    );
};
