import React from 'react';
import {Bet, MultipleBet, SimpleBet} from '@domain/Bet';
import {OnGoingSimpleBetRecord} from '@components/OnGoingSimpleBetRecord';
import {OnGoingMultipleBetRecord} from '@components/OnGoingMultipleBetRecord';

export interface OnGoingBetRecordProps {
    bet: Bet;
    cancelBetHandler: () => void;
    open: boolean;
}

const isSimpleBet = (bet: Bet): bet is SimpleBet => {
    return 'odd' in bet;
};

const isMultipleBet = (bet: Bet): bet is MultipleBet => {
    return 'odds' in bet;
};

export const OnGoingBetRecord = ({
    bet,
    cancelBetHandler,
    open,
}: OnGoingBetRecordProps) => {
    console.log('bet', bet);
    return (
        <>
            {isSimpleBet(bet) && (
                <OnGoingSimpleBetRecord
                    {...(bet as SimpleBet)}
                    cancelBetHandler={cancelBetHandler}
                    open={open}
                />
            )}
            {isMultipleBet(bet) && (
                <OnGoingMultipleBetRecord
                    {...(bet as MultipleBet)}
                    cancelBetHandler={cancelBetHandler}
                    open={open}
                />
            )}
        </>
    );
};
