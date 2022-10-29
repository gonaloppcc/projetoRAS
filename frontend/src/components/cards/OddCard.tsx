import React from 'react';
import {Card} from '@mui/material';
import {PALETTE} from '../../constants/Palette';

export interface OddCardProps {
    name: string;
    value: number;
}

export const OddCard = ({name, value}: OddCardProps) => {
    return (
        <Card
            sx={{
                paddingY: '1vh',
                paddingX: '2vw',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: PALETTE.SPECIAL,
            }}
        >
            <span
                style={{
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                }}
            >
                {name}
            </span>
            <span
                style={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
            >
                {value}
            </span>
        </Card>
    );
};
