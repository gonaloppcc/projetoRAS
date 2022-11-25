import React from 'react';

export interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout = ({children}: PageLayoutProps) => {
    return <div className="w-screen h-screen">{children}</div>;
};
