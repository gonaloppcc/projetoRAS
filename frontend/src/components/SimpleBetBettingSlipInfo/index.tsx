import React from 'react';
import {formatNumber} from '../../utils/formatters';
import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

interface BettingSlipInfoProps {
    amount: number;
    possibleWinnings: number;
    placeBetOnClick: () => void;
    currency?: string;
}

export const SimpleBetBettingSlipInfo = ({
    amount,
    possibleWinnings,
    placeBetOnClick,
    currency = '€',
}: BettingSlipInfoProps) => {
    const intl = useIntl();
    const featureStake = intl.formatMessage({id: 'OnGoingBetRecord.Stake'});
    const featureWinnings = intl.formatMessage({id: 'OnGoingBetRecord.Possible.Winnings'});
    const featureBetnow = intl.formatMessage({id: 'BettingSlipInfo.Bet.now'});
    return (
        <div className="w-full flex flex-col items-start p-2 gap-2 bg-WHITE shadow rounded">
            <div className="w-full flex flex-row justify-between items-start p-0">
                <span>
                    {featureStake /* FIXME Text hardcoded for now!! */}
                </span>
                <span>{`${formatNumber(amount)}  ${currency}`}</span>
            </div>
            <div className="w-full flex flex-row justify-between items-start p-0 font-semibold text-lg">
                <span>
                    {featureWinnings /* FIXME Text hardcoded for now!! */}
                </span>
                <span>{`${formatNumber(possibleWinnings)} ${currency}`}</span>
            </div>
            <button
                className="w-full py-1.5 bg-IMPERIAL_RED rounded-xl shadow-2xl text-WHITE"
                onClick={placeBetOnClick}
            >
                {featureBetnow /* FIXME Text hardcoded for now!! */}
            </button>
        </div>
    );
};
