import React from 'react';
import {Card} from '@mui/material';
import {Odd} from '../../../types/Event';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {Box} from '@mui/system';
import {PALETTE} from '../../../constants/Palette';

export interface BetCardProps {
    odd: Odd;
    event: string;
}

export const BetCard = ({odd: {name, price}, event}: BetCardProps) => {
    const priceFormatted = price.toFixed(2);

    return (
        <Card
            sx={{
                padding: '2vh',
                maxHeight: '100px',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '5vw',
                borderStyle: 'solid',
                borderColor: PALETTE.FADE_BLACK,
                borderWidth: '1px',
                boxShadow: 'none',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1vw',
                }}
            >
                <SportsSoccerIcon />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                >
                    <span style={{fontWeight: 700}}>{name}</span>
                    <span style={{fontWeight: 300, fontSize: '14px'}}>
                        {event}
                    </span>
                </Box>
            </Box>
            <span>{priceFormatted}</span>
        </Card>
    );
};
