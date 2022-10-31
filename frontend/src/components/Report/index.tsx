import React from 'react';
import {Card, Tab, Tabs} from '@mui/material';
import {REPORT_STYLES} from './styles';
import {Flex} from '../Flex';
import {ReportFooterSingleBet} from '../ReportFooterSingleBet';
import {BetCard} from '../cards/BetCard';
import {BetType, useReport} from '../../hooks/useReport';
import {ReportFooterMultipleBet} from '../ReportFooterMultipleBet';

interface ReportProps {}

export const Report = ({}: ReportProps) => {
    const {bets, removeBet, betType, setBetType, submitReport} = useReport();

    const multipleBetOdd = bets.reduce((acc, bet) => {
        return acc * bet.odd.price;
    }, 1);

    const getRemoveBetHandler = (id: string) => () => {
        removeBet(id);
    };

    const submitBetHandler = () => {
        // TODO: Implement this
        submitReport();

        console.log('Report is submitted');
    };

    const changeTabHandler = (
        event: React.SyntheticEvent,
        newBetType: BetType
    ) => {
        setBetType(newBetType);
    };

    return (
        <Card sx={REPORT_STYLES}>
            <h2>Boletim</h2>
            <Tabs value={betType} onChange={changeTabHandler}>
                <Tab value="Simple" label="Simples" />
                <Tab value="Multiple" label="Múltipla" />
            </Tabs>
            <Flex flexDirection="column" gap="2vh">
                {bets.map((bet) => (
                    <BetCard
                        key={bet.id}
                        odd={bet.odd}
                        event={bet.eventName}
                        removeHandler={getRemoveBetHandler(bet.id)}
                    />
                ))}
            </Flex>
            {betType === 'Simple' && (
                <ReportFooterSingleBet
                    bettingAmount={20}
                    winningAmount={30}
                    betHandler={submitBetHandler}
                />
            )}
            {betType === 'Multiple' && (
                <ReportFooterMultipleBet
                    bettingAmount={20}
                    winningAmount={multipleBetOdd * 20}
                    betHandler={submitBetHandler}
                />
            )}
        </Card>
    );
};
