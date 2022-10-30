import React from 'react';
import {Card} from '@mui/material';
import {ODD_CARD_STYLE} from './styles';
import {Odd} from '../../../types/Event';

export interface OddCardProps extends Odd {
    selected?: boolean;
    onClick?: () => void;
}

export const OddCard = ({name, price, onClick, selected}: OddCardProps) => {
    const priceFormatted = price.toFixed(2);

    // TODO: Implement selected behavior
    return (
        <Card sx={ODD_CARD_STYLE} onClick={onClick}>
            <span
                style={{
                    // TODO: This should be in a separate file
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                }}
            >
                {name}
            </span>
            <span
                style={{
                    // TODO: This should be in a separate file
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
            >
                {priceFormatted}
            </span>
        </Card>
    );
};
