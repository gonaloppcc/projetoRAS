import React from 'react';
import {MultipleBetBettingSlipInfo} from '@components/MultipleBetBettingSlipInfo';
import {BetType, useBettingSlip} from '@state/useBettingSlip';
import {MultipleBetCard} from '@components/MultipleBetCard';
import {Tabs} from '@components/Tabs';
import {SimpleBetCard} from '@components/SimpleBetCard';
import {SimpleBetBettingSlipInfo} from '@components/SimpleBetBettingSlipInfo';

import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

export const BettingSlip = () => {
    const intl = useIntl();
    const featureMybet = intl.formatMessage({id: 'BettingSlip.mybet'});
    const featureSingle = intl.formatMessage({id: 'BettingSlip.singles'});
    const featureMultiple = intl.formatMessage({id: 'BettingSlip.multiples'});

    const TABS = [
        {
            name: featureSingle,
        },
        {
            name: featureMultiple,
        },
    ];
    const {
        currency,
        bettingAmount,
        setBettingAmount,
        setBetAmount,
        betType,
        setBetType,
        bets,
        removeBet,
        submitReport,
    } = useBettingSlip();

    const getRemoveBetHandler = (id: string) => () => {
        removeBet(id);
    };

    return (
        <div className="w-full flex flex-col items-start p-0 gap-1 bg-WHITE rounded">
            <div className="w-full flex flex-col items-start p-4 gap-2 bg-WHITE shadow rounded-t">
                {featureMybet}
                <Tabs
                    tabs={TABS}
                    selectedTabIndex={betType}
                    setSelectedTabIndex={setBetType}
                />
            </div>
            {betType === BetType.Simple && (
                <>
                    <div className="w-full h-full flex flex-col items-start p-4 gap-2 overflow-y-auto">
                        {bets.map((bet) => (
                            <SimpleBetCard
                                key={bet.id}
                                {...bet}
                                bettingAmount={bet.bettingAmount as number}
                                removeBetHandler={getRemoveBetHandler(bet.id)}
                                setBettingAmount={(amount) =>
                                    setBetAmount(bet.id, amount)
                                }
                                currency={currency}
                            />
                        ))}
                    </div>
                    <SimpleBetBettingSlipInfo
                        amount={bets.reduce((acc, bet) => {
                            return acc + (bet.bettingAmount as number);
                        }, 0)}
                        possibleWinnings={bets.reduce((acc, bet) => {
                            return (
                                acc +
                                (bet.bettingAmount as number) * bet.odd.price
                            );
                        }, 0)}
                        placeBetOnClick={submitReport}
                        currency={currency}
                    />
                </>
            )}
            {betType === BetType.Multiple && (
                <>
                    <div className="w-full h-full flex flex-col items-start p-4 gap-2 overflow-y-auto">
                        {bets.map((bet) => (
                            <MultipleBetCard
                                key={bet.id}
                                {...bet}
                                removeBetHandler={getRemoveBetHandler(bet.id)}
                            />
                        ))}
                    </div>
                    <MultipleBetBettingSlipInfo
                        odd={bets.reduce((acc, bet) => acc * bet.odd.price, 1)}
                        placeBetOnClick={submitReport}
                        bettingAmount={
                            bettingAmount as number /* bettingAmount is always defined when the bet is Multiple */
                        }
                        setBettingAmount={setBettingAmount}
                        currency={currency}
                    />
                </>
            )}
        </div>
    );
};
