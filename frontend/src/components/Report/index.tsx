import React, {useState} from 'react';
import {Card, Tab, Tabs} from '@mui/material';
import {Box} from '@mui/system';
import {BETS_CONTAINER_STYLES, REPORT_STYLES} from './styles';

interface ReportProps {
    children: React.ReactNode;
}

export const Report = ({children: bets}: ReportProps) => {
    const [betType, setBetType] = useState<number>(0);

    const ChangeTabHandler = (
        event: React.SyntheticEvent,
        newBetType: number
    ) => {
        setBetType(newBetType);
    };
    return (
        <Card sx={REPORT_STYLES}>
            <h2>Boletim</h2>
            <Tabs value={betType} onChange={ChangeTabHandler}>
                <Tab value={0} label="Simples" />
                <Tab value={1} label="Múltipla" />
            </Tabs>
            <Box sx={BETS_CONTAINER_STYLES}>{bets}</Box>
        </Card>
    );
};
