import React from 'react';
import {Bet, MultipleBet, SimpleBet} from '@domain/Bet';
import {OnGoingSimpleBetRecord} from '@components/OnGoingSimpleBetRecord';
import {OnGoingMultipleBetRecord} from '@components/OnGoingMultipleBetRecord';

export interface OnGoingBetRecordProps {
    bet: Bet;
    cancelBetHandler: () => void;
}

const isSimpleBet = (bet: Bet): bet is SimpleBet => {
    return 'Event' in bet;
};

const isMultipleBet = (bet: Bet): bet is MultipleBet => {
    return 'Odds' in bet;
};

export const OnGoingBetRecord = ({
    bet,
    cancelBetHandler,
}: OnGoingBetRecordProps) => {
    console.log('OnGoingBetRecord');
    return (
        <>
            {isSimpleBet(bet) && (
                <OnGoingSimpleBetRecord
                    {...(bet as SimpleBet)}
                    cancelBetHandler={cancelBetHandler}
                />
            )}
            {isMultipleBet(bet) && (
                <OnGoingMultipleBetRecord
                    {...(bet as MultipleBet)}
                    cancelBetHandler={cancelBetHandler}
                />
            )}
        </>
    );
};
