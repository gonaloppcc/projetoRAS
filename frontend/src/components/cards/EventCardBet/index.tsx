import React from 'react';
import {Card} from '@mui/material';
import {Box} from '@mui/system';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {OddCard} from '../OddCard';
import {Event} from '../../../types/Event';
import {
    EVENT_CARD_LEFT_STYLE1,
    EVENT_CARD_LEFT_STYLE,
    EVENT_CARD_RIGHT_STYLE,
    EVENT_CARD_STYLE,
    EVENT_CARD_LOST,
    EVENT_CARD_WIN,
} from './styles';
import {PALETTE} from '../../../constants/Palette';
import Stack from '@mui/material/Stack';
import {Flex} from '../../Flex';

export type EventCardProps = Event;

export const EventCardBet = ({
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

    // -1 -> Away winner
    // 0 -> Tie
    // 1 -> Home winner
    const result = Math.floor(Math.random() * 3 - 1);
    const betMade = Math.floor(Math.random() * (1 + 1) - 1);

    function whichTeam() {
        if (result === 0) return 'Empate';
        if (result < 0) return awayTeam;
        return homeTeam;
    }

    const isWin = result === betMade;

    const finalScore = scores ? scores.replace('x', ' - ') : '';

    const betValue = 10;

    return (
        <Card sx={cardStyle}>
            <Flex>
                <Box sx={EVENT_CARD_LEFT_STYLE1}>
                    <SportsSoccerIcon />
                    <Flex flexDirection="column">
                        <span
                            style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                            }}
                        >
                            Resultado final: {whichTeam()}
                        </span>

                        <span
                            style={{
                                fontSize: '0.8rem',
                                fontWeight: 400,
                            }}
                        >
                            {name}
                        </span>
                    </Flex>
                </Box>
            </Flex>
            <Flex flexDirection="column">
                <span
                    style={{
                        fontSize: '0.8rem',
                        fontWeight: 400,
                    }}
                >
                    Valor apostado:
                </span>

                <span
                    style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                    }}
                >
                    {betValue}€
                </span>
            </Flex>
            <Flex
                flexDirection="column"
                background={isWin ? PALETTE.SPECIAL : PALETTE.IMPERIAL_RED}
            >
                {isWin && (
                    <Box sx={EVENT_CARD_WIN}>
                        <span
                            style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                            }}
                        >
                            Ganhou
                        </span>
                        <span>{betValue}</span>
                    </Box>
                )}

                {!isWin && (
                    <Box sx={EVENT_CARD_LOST}>
                        <span>Perdeu</span>
                        <span>{betValue}</span>
                    </Box>
                )}
            </Flex>
            <Flex>Estado: Terminado</Flex>
        </Card>
    );
};
