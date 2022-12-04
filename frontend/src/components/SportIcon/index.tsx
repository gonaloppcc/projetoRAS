import React from 'react';
import {SportsBasketball, SportsSoccer} from '@mui/icons-material';

export interface SportIconProps {
    eventType: string; // TODO: Change to enum
}

export const SportIcon = ({eventType}: SportIconProps) => {
    switch (eventType) {
        case 'football':
            return <SportsSoccer />;

        case 'basketball':
            return <SportsBasketball />;

        default:
            return <SportsSoccer />;
    }
};
