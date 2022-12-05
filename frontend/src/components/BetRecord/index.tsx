import React from 'react';
import {SportsSoccer} from '@mui/icons-material';

import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

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
    eventName,
    eventDate,
    eventType,
    betName,
    betOdd,
    betAmount,
    betWinnings,
}: BetRecordProps) => {
    const intl = useIntl();
    const featureDate = intl.formatMessage({id: 'OnGoingBetRecord.Date'});
    const featureOdds = intl.formatMessage({id: 'OnGoingBetRecord.Odds'});
    const featureStake = intl.formatMessage({id: 'OnGoingBetRecord.Stake'});
    const featureWin = intl.formatMessage({id: 'BetRecord.winnings'});

    // FIXME: Hardcoded text in this component
    return (
        <div className="flex flex-row justify-between items-center px-4 gap-8 bg-WHITE rounded">
            <div className="flex flex-row justify-center items-center gap-4">
                <SportsSoccer />
                <div className="flex flex-col items-start p-0 gap-1">
                    <span className="text-EERIE_BLACK text-base font-semibold">
                        {betName}
                    </span>
                    <span className="text-LIGHT_GRAY text-xs">{eventName}</span>
                </div>
            </div>
            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{featureDate}</span>
                <span className="text-EERIE_BLACK text-base">{eventDate}</span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{featureOdds}</span>
                <span className="text-SPECIAL text-base font-semibold">
                    {betOdd}
                </span>
            </div>

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {featureStake}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {betAmount} €{' '}
                    {/* FIXME: Money currency is hardcoded and can vary */}
                </span>
            </div>

            {betWinnings > 0 && (
                <div className="h-full flex flex-col items-start w-20 p-4 gap-2 bg-RIGHT_GREEN text-WHITE">
                    <span className="text-xs">{featureWin}</span>
                    <span className="text-base font-semibold">
                        {betWinnings} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {betWinnings === 0 && (
                <div className="flex flex-col items-start w-20 p-4 gap-2 bg-IMPERIAL_RED text-WHITE">
                    <span className="text-xs">{featureWin}</span>
                    <span className="text-base">
                        {betWinnings} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
        </div>
    );
};
