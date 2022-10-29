import React from 'react';
import {Card} from '@mui/material';
import {Box} from '@mui/system';
import {OddCard} from '../OddCard';
import {Event} from '../../../types/Event';
import {
    EVENT_CARD_LEFT_STYLE,
    EVENT_CARD_RIGHT_STYLE,
    EVENT_CARD_STYLE,
} from './styles';
import {PALETTE} from '../../../constants/Palette';

export type EventCardProps = Event;

export const EventCard = ({
    homeTeam,
    awayTeam,
    commenceTime,
    bookmakers,
    completed,
    scores,
}: EventCardProps) => {
    // TODO: Improve the date format
    const dateString = new Date(commenceTime).toLocaleDateString('pt-PT', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const odds = bookmakers[0].markets[0].outcomes;

    const name = `${homeTeam} - ${awayTeam}`;

    const isLive = scores != null && !completed;

    const isLiveStyle = isLive
        ? {background: PALETTE.RICH_BLACK, color: PALETTE.WHITE}
        : undefined;

    const cardStyle = {
        ...EVENT_CARD_STYLE,
        ...isLiveStyle,
    };

    const finalScore = scores ? scores.replace('x', ' - ') : '';

    return (
        <Card sx={cardStyle}>
            <Box sx={EVENT_CARD_LEFT_STYLE}>
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

            <Box sx={EVENT_CARD_RIGHT_STYLE}>
                {!completed &&
                    odds.map((odd) => <OddCard key={odd.name} {...odd} />)}

                {completed && `Resultado Final: ${finalScore}`}
            </Box>
        </Card>
    );
};
