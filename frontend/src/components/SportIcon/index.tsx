import React from 'react';
import {
    SportsBaseball,
    SportsBasketball,
    SportsSoccer,
    SportsTennis,
} from '@mui/icons-material';

export interface SportIconProps {
    eventType: string; // TODO: Change to enum
}

export const SportIcon = ({eventType}: SportIconProps) => {
    switch (eventType) {
        case 'Football':
            return <SportsSoccer />;

        case 'Basketball':
            return <SportsBasketball />;

        case 'Baseball':
            return <SportsBaseball />;

        case 'Tennis':
            return <SportsTennis />;

        default:
            return <></>;
    }
};
