import React from 'react';
import {MultipleBetBettingSlipInfo} from '@components/MultipleBetBettingSlipInfo';
import {BetType, useBettingSlip} from '@state/useBettingSlip';
import {MultipleBetCard} from '@components/MultipleBetCard';
import {Tabs} from '@components/Tabs';
import {SimpleBetCard} from '@components/SimpleBetCard';
import {SimpleBetBettingSlipInfo} from '@components/SimpleBetBettingSlipInfo';

const TABS = [
    {
        name: 'Simples',
    },
    {
        name: 'Múltipla',
    },
];

export const BettingSlip = () => {
    const {
        bettingAmount,
        setBettingAmount,
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
                {'BOLETIM' /* FIXME Text hardcoded for now!! */}
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
                                removeBetHandler={getRemoveBetHandler(bet.id)}
                            />
                        ))}
                    </div>
                    <SimpleBetBettingSlipInfo
                        amount={5}
                        possibleWinnings={20}
                        placeBetOnClick={submitReport}
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
                    />
                </>
            )}
        </div>
    );
};
