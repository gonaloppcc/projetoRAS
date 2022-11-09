import React from 'react';
import {Card} from '../Card';
import {Button} from '../Button';
import {Row} from '../Row';

interface ReportFooterSingleBetProps {
    bettingAmount: number;
    winningAmount: number;
    betHandler: () => void;
    changeBettingAmount?: (amount: number) => void;
}

export const ReportFooterSingleBet = ({
    bettingAmount,
    winningAmount,
    betHandler,
    changeBettingAmount,
}: ReportFooterSingleBetProps) => {
    return (
        <Card style={{flexDirection: 'column', width: '100%', gap: '2vh'}}>
            <Row>
                <span>Montante Total:</span>
                <span>{bettingAmount} €</span>
            </Row>
            <Row>
                <span>Total de Ganhos:</span>
                <span>{winningAmount} €</span>
            </Row>
            <Button onClick={betHandler}>APOSTAR</Button>
        </Card>
    );
};
