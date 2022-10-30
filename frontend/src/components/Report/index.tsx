import React, {useState} from 'react';
import {Card, Tab, Tabs} from '@mui/material';
import {REPORT_STYLES} from './styles';
import {Flex} from '../Flex';

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
            <Flex flexDirection="column" gap="2vh">
                {bets}
            </Flex>
        </Card>
    );
};
