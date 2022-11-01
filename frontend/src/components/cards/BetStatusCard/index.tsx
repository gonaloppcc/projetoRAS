import React from 'react';
import {Card} from '@mui/material';
import {Box} from '@mui/system';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {Event} from '../../../types/Event';
import {
    EVENT_CARD_LOST,
    EVENT_CARD_STYLE,
    EVENT_CARD_WIN,
    EVENT_CARD_WINNINGS_STYLE,
} from './styles';
import {PALETTE} from '../../../constants/PALETTE';
import {Flex} from '../../Flex';

export type BetStatusCardProps = Event;

interface BetStatusColumnProps {
    label: string;
    value: string | number;
}

const BetStatusColumn = ({label, value}: BetStatusColumnProps) => {
    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
        >
            <span
                style={{
                    fontSize: '1rem',
                    fontWeight: 'normal',
                }}
            >
                {label}
            </span>

            <span
                style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                }}
            >
                {value}
            </span>
        </Flex>
    );
};

interface WinningsColumnProps {
    win: boolean;
    winningsValue: number;
}

const WinningsColumn = ({win, winningsValue}: WinningsColumnProps) => {
    const winStyle = win ? EVENT_CARD_WIN : EVENT_CARD_LOST;

    return (
        <Box
            sx={{
                ...EVENT_CARD_WINNINGS_STYLE,
                ...winStyle,
            }}
        >
            <span>Ganhos</span>
            <span
                style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                }}
            >
                {winningsValue} €
            </span>
        </Box>
    );
};

export const BetStatusCard = ({
    homeTeam,
    awayTeam,
    bookmakers,
    completed,
    scores,
}: BetStatusCardProps) => {
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
    const betMade = Math.floor(Math.random() * 3 - 1);

    const isWin = result === betMade;

    const getEventWinner = () => {
        if (result === 0) return 'Empate';
        if (result < 0) return awayTeam;
        return homeTeam;
    };

    const betValue = 10;

    return (
        <Card sx={cardStyle}>
            <Flex alignItems="center" gap="1vw">
                <SportsSoccerIcon />
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <span
                        style={{
                            fontSize: '1rem',
                            fontWeight: 700,
                        }}
                    >
                        Resultado final: {getEventWinner()}
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
            </Flex>
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
            >
                <span
                    style={{
                        fontSize: '1rem',
                        fontWeight: 'normal',
                    }}
                >
                    Cota:
                </span>

                <span
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: PALETTE.SPECIAL,
                    }}
                >
                    {bookmakers[0].markets[0].outcomes[0].price}
                </span>
            </Flex>

            <BetStatusColumn
                label={'Valor apostado:'}
                value={`${betValue} €`}
            />
            <WinningsColumn win={isWin} winningsValue={0} />
            <BetStatusColumn label="Estado:" value="Terminado" />
        </Card>
    );
};
