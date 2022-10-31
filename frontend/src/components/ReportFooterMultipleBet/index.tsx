import React from 'react';
import {Card} from '../Card';
import {Button} from '../Button';
import {Row} from '../Row';

interface ReportFooterMultipleBetProps {
    bettingAmount: number;
    winningAmount: number;
    betHandler: () => void;
}

export const ReportFooterMultipleBet = ({
    bettingAmount,
    winningAmount,
    betHandler,
}: ReportFooterMultipleBetProps) => {
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
