import React from 'react';
import {Tabs as MuiTabs} from '@mui/material';

interface TabsProps {
    children: React.ReactNode;
}

export const Tabs = ({children}: TabsProps) => {
    return (
        <MuiTabs value={0} sx={{borderColor: 'red', color: 'red'}}>
            {children}
        </MuiTabs>
    );
};
