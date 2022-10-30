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
EVENT_CARD_LOST ,
EVENT_CARD_WIN 
} from './styles';
import {PALETTE} from '../../../constants/Palette';
import Stack from '@mui/material/Stack';


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
    const result = Math.floor(Math.random() * (1 + 1) - 1);
    const betMade = Math.floor(Math.random() * (1 + 1) - 1);
    
    function whichTeam(){
        if (result === 0)    return "Empate";
        if (result < 0) return awayTeam;
        return homeTeam;
        
    }

    const userWin = result === betMade

    const finalScore = scores ? scores.replace('x', ' - ') : '';

    const bet_value = 10;

    return (
        <Card sx={cardStyle}>
           <Stack direction="row" spacing={2}>
            <span
                     style={{
                        alignContent: 'center',
                        marginRight: '2%',
                    }}
            
            >
                <SportsSoccerIcon />
</span>
            <Box sx={EVENT_CARD_LEFT_STYLE1}>
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
            </Box>
            <Box sx={EVENT_CARD_LEFT_STYLE}>
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
                    {bet_value}€
                </span>
            </Box>
                {userWin &&
            <Box sx={EVENT_CARD_WIN}>
                    <h1>Ganhou</h1>
                    <h3>{bet_value}</h3>
            </Box>
                    }
                
                {!userWin &&
            <Box sx={EVENT_CARD_LOST}>
                    <h1>Perdeu</h1>
                    <h3>{bet_value}</h3>
            </Box>
                    }
<Box sx={EVENT_CARD_RIGHT_STYLE}>
                Estado: Terminado
            </Box>
            </Stack> 
        </Card>
    );
};
