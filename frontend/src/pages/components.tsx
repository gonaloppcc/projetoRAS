import React from 'react';
import {Report} from '../components/Report';
import {Box} from '@mui/system';
import {BetCard} from '../components/cards/BetCard';

const Components = () => {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: '2vw',
            }}
        >
            <Report>
                <BetCard
                    odd={{name: 'Resultado Final: Varzim', price: 1.54}}
                    event={'Varzim vs Sporting'}
                />
                <BetCard
                    odd={{name: 'Resultado Final: Varzim', price: 1.54}}
                    event={'Varzim vs Sporting'}
                />
                <BetCard
                    odd={{name: 'Resultado Final: Varzim', price: 1.54}}
                    event={'Varzim vs Sporting'}
                />
            </Report>
        </Box>
    );
};

export default Components;
