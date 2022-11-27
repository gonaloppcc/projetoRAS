import React from 'react';
import {Navbar} from '@components/Navbar';
import {Competitions} from '@components/Competitions';
import {CompetitionProps} from '@components/CompetitionCard';
import {BettingSlip} from '@components/BettingSlip';

const MOCK_COMPETITIONS: CompetitionProps[] = [
    {
        name: 'Portugal - Primeira Liga',
        eventType: 'football',
        isFavorite: true,
    },
    {
        name: 'Portugal - Segunda Liga',
        eventType: 'football',
        isFavorite: false,
    },
    {
        name: 'EUA - NBA',
        eventType: 'basketball',
        isFavorite: false,
    },
];

export interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout = ({children}: PageLayoutProps) => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar />
            <div className="w-full h-full p-8 bg-CULTURED flex flex-row justify-center gap-8">
                <div className="hidden md:flex flex-row justify-start w-1/5">
                    <Competitions competitions={MOCK_COMPETITIONS} />
                </div>
                <div className="flex flex-row justify-center w-3/5">
                    {children}
                </div>
                <div className="hidden md:flex flex-row justify-center w-1/5">
                    <BettingSlip />
                </div>
            </div>
        </div>
    );
};
