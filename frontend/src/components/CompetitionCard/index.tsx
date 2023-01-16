import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {SportIcon} from '@components/SportIcon';
import {useRouter} from 'next/router';

export interface CompetitionProps {
    name: string;
    sportId: string; // TODO: Change to enum
    isFavorite?: boolean;
}

export const CompetitionCard = ({
    name,
    sportId: sportName,
    isFavorite,
}: CompetitionProps) => {
    const router = useRouter();

    const onClickHandler = async () => {
        await router.push(`/competition/${name}`);
    };

    return (
        <div
            onClick={onClickHandler}
            className="flex flex-row justify-between items-center w-full px-5 py-2.5 gap-1 bg-WHITE rounded cursor-pointer"
        >
            <div className="flex flex-row justify-between items-center p-0 gap-2">
                <SportIcon eventType={sportName} />
                {name}
            </div>
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </div>
    );
};
