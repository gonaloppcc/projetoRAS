import React from 'react';

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
            <div className="flex flex-row justify-between items-center p-0 gap-1">
                {/* TODO: Insert eventType icon here!! */}
                {name}
            </div>
            {isFavorite && <>{/* TODO: Insert Favorite icon here!! */}</>}
        </div>
    );
};
