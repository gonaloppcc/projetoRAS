import React from 'react';

interface BetsProps {
    children?: React.ReactNode;
}

export const Bets = ({children}: BetsProps) => {
    return (
        <div className="h-full flex flex-col items-start p-2 gap-2 ">
            {children}
        </div>
    );
};
