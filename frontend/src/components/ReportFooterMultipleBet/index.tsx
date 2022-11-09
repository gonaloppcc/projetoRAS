import React from 'react';
import {Card} from '../Card';
import {Button} from '../Button';
import {Row} from '../Row';
import {Input} from '../Input';

interface ReportFooterMultipleBetProps {
    bettingAmount: number;
    winningAmount: number;
    betHandler: () => void;
    changeBettingAmount?: (amount: number) => void;
}

export const ReportFooterMultipleBet = ({
    bettingAmount,
    winningAmount,
    betHandler,
    changeBettingAmount,
}: ReportFooterMultipleBetProps) => {
    const bettingAmountFormatted = `${bettingAmount}`;

    return (
        <Card style={{flexDirection: 'column', width: '100%', gap: '2vh'}}>
            <Row>
                <span>Montante Apostado:</span>
                <Input
                    value={bettingAmountFormatted}
                    onChange={(value) =>
                        changeBettingAmount
                            ? changeBettingAmount(+value ?? 0)
                            : null
                    }
                />
                €
            </Row>
            <Row>
                <span>Total de Ganhos:</span>
                <span>{winningAmount} €</span>
            </Row>
            <Button onClick={betHandler}>APOSTAR</Button>
        </Card>
    );
};
