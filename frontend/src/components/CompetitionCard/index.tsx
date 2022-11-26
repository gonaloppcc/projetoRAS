import React from 'react';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export interface CompetitionProps {
    name: string;
    eventType: string; // TODO: Change to enum
    isFavorite: boolean;
}

export const CompetitionCard = ({
    name,
    eventType,
    isFavorite,
}: CompetitionProps) => {
    return (
        <div className="flex flex-row justify-between items-center w-full px-5 py-2.5 gap-1 bg-WHITE rounded cursor-pointer">
            <div className="flex flex-row justify-between items-center p-0 gap-2">
                {
                    eventType === 'football' && <SportsSoccerIcon />
                    /* TODO: Insert more events icons here!! */
                }
                {eventType === 'basketball' && <SportsBasketballIcon />}
                {name}
            </div>
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </div>
    );
};
