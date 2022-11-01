import React from 'react';
import {PALETTE} from '../../constants/PALETTE';

interface BalanceProps {
    money: number; // Money in euros at least for now
}

export const Balance = ({money}: BalanceProps) => {
    return (
        <div
            style={{
                background: PALETTE.IMPERIAL_RED,
                padding: '1vh',
                borderRadius: '5%',
                fontWeight: 700,
            }}
        >
            {money}€
        </div>
    );
};
