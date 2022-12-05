import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {SportIcon} from '@components/SportIcon';
import {Sport} from '@domain/Event';

export interface CompetitionProps {
    Name: string;
    Sport: Sport; // TODO: Change to enum
    isFavorite?: boolean;
}

export const CompetitionCard = ({
    Name,
    Sport: {Name: sportName},
    isFavorite,
}: CompetitionProps) => {
    return (
        <div className="flex flex-row justify-between items-center w-full px-5 py-2.5 gap-1 bg-WHITE rounded cursor-pointer">
            <div className="flex flex-row justify-between items-center p-0 gap-2">
                <SportIcon eventType={sportName} />
                {Name}
            </div>
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </div>
    );
};
