import React from 'react';
import {BettingSlipInfo} from '@components/BettingSlipInfo';
import {useBettingSlip} from '@state/useBettingSlip';
import {BetCard} from '@components/BetCard';
import {Tabs} from '@components/Tabs';

const TABS = [
    {
        name: 'Simples',
    },
    {
        name: 'Múltipla',
    },
];

export const BettingSlip = () => {
    const {betType, setBetType, bets, removeBet, submitReport} =
        useBettingSlip();

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
            <div className="w-full h-full flex flex-col items-start p-4 gap-2 overflow-y-auto">
                {bets.map((bet) => (
                    <BetCard
                        key={bet.id}
                        {...bet}
                        removeBetHandler={getRemoveBetHandler(bet.id)}
                    />
                ))}
            </div>
            <BettingSlipInfo
                amount={5}
                possibleWinnings={20}
                placeBetOnClick={submitReport}
            />
        </div>
    );
};
