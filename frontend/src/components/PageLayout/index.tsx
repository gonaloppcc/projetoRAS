import React from 'react';
import {Navbar} from '@components/Navbar';

export interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout = ({children}: PageLayoutProps) => {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="w-full h-full p-8 bg-CULTURED flex flex-row justify-center gap-8">
                <div className="hidden md:flex flex-row justify-center w-1/4"></div>
                <div className="flex flex-row justify-center w-1/2">
                    {children}
                </div>
                <div className="hidden md:flex flex-row justify-center w-1/4 "></div>
            </div>
        </div>
    );
};
