import React from 'react';
import {formatNumber} from '../../utils/formatters';
import {Input} from '@components/Input';
import {FormattedMessage, useIntl} from 'react-intl';

interface MultipleBettingSlipInfoProps {
    odd: number;
    placeBetOnClick: () => void;
    bettingAmount: number;
    setBettingAmount: (amount: number) => void;
    currency?: string;
}

export const MultipleBetBettingSlipInfo = ({
    odd,
    placeBetOnClick,
    bettingAmount,
    setBettingAmount,
    currency = '€',
}: MultipleBettingSlipInfoProps) => {
    const bettingAmountAsString = String(bettingAmount);

    const setBettingAmountHandler = (amount: string) => {
        setBettingAmount(Number(amount));
    };

    const intl = useIntl();
    const featureOdds = intl.formatMessage({id: 'OnGoingBetRecord.Odds'});
    const featureWinnings = intl.formatMessage({id: 'BetRecord.winnings'});
    const featureBetnow = intl.formatMessage({id: 'BettingSlipInfo.Bet.now'});
    const featureStake = intl.formatMessage({id: 'OnGoingBetRecord.Stake'});

    return (
        <div className="w-full flex flex-col items-start p-2 gap-2 bg-WHITE shadow rounded">
            <div className="w-full flex flex-row justify-between items-start p-0">
                <div className="flex flex-row justify-center items-center gap-2">
                    <span>{featureOdds /* FIXME Text hardcoded for now!! */}</span>
                    <span className="bg-SPECIAL p-2 text-EERIE_BLACK rounded font-semibold">
                        {formatNumber(odd)}
                    </span>
                </div>
                <div>
                    <Input
                        type="number"
                        placeholder={
                            featureStake /* FIXME Text hardcoded for now!! */
                        }
                        value={bettingAmountAsString}
                        onChange={setBettingAmountHandler}
                        suffix={currency}
                    />
                </div>
            </div>
            <div className="w-full flex flex-row justify-between items-start p-0 font-semibold text-lg">
                <span>
                    {featureWinnings /* FIXME Text hardcoded for now!! */}
                </span>
                <span>{`${formatNumber(
                    odd * bettingAmount
                )} ${currency}`}</span>
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
