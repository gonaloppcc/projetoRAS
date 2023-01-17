import React from 'react';
import {Navbar} from '@components/Navbar';
import {Competitions} from '@components/Competitions';
import {BettingSlip} from '@components/BettingSlip';
import {useCompetitions} from '@hooks/useCompetitions';

export interface PageLayoutProps {
    children: React.ReactNode;
}

const MAIN_SPORT = 'Football';

export const PageLayout = ({children}: PageLayoutProps) => {
    const {isSuccess, isLoading, competitions, error, isError, refetch} =
        useCompetitions(MAIN_SPORT);

    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar />
            <div className="w-full h-full p-8 bg-CULTURED flex flex-row justify-center gap-8">
                <div className="hidden md:flex flex-row justify-start w-3/12">
                    {isSuccess && <Competitions competitions={competitions} />}
                    {isError && (
                        <div>Aconteceu um erro ao carregar as competitions</div>
                    )}
                </div>
                <div className="h-full flex flex-row justify-center w-6/12">
                    {children}
                </div>
                <div className="hidden md:flex flex-row justify-center w-3/12 h-full">
                    <BettingSlip />
                </div>
            </div>
        </div>
    );
};
