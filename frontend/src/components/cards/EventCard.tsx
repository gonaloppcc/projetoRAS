import React from 'react';
import {Card} from '@mui/material';
import {Box} from '@mui/system';
import {OddCard} from './OddCard';

interface CardEventProps {
    name: string;
    date: Date;
}

export const EventCard = ({name, date}: CardEventProps) => {
    // TODO: Improve the date format
    const dateString = date.toLocaleDateString('pt-PT', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card
            sx={{
                minWidth: '400px',
                minHeight: '80px',
                width: '100%',
                height: '10vh',
                msFilter: 'drop-shadow(0px 0px 5px #000000)',

                padding: '2vh',

                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <span
                    style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                    }}
                >
                    {name}
                </span>

                <span
                    style={{
                        fontSize: '0.8rem',
                        fontWeight: 400,
                    }}
                >
                    {dateString}
                </span>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '1vw',
                }}
            >
                <OddCard name={'Porto'} value={2.95} />
                <OddCard name={'Empate'} value={2.35} />
                <OddCard name={'Benfica'} value={2.05} />
            </Box>
        </Card>
    );
};
