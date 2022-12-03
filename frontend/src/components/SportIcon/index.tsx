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
        case 'football':
            return <SportsSoccer />;

        case 'basketball':
            return <SportsBasketball />;

        case 'baseball':
            return <SportsBaseball />;

        case 'tennis':
            return <SportsTennis />;

        default:
            return <></>;
    }
};
