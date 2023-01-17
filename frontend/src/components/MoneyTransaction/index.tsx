import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {formatDate} from '../../utils/formatters';

export enum TransactionType {
    Deposit = 'Depósito',
    WITHDRAW = 'Retiro',
    BET_WIN = 'Aposta Ganha',
    BET_LOSS = 'Aposta Perdida',
    BetCancelled = 'Aposta Cancelada',

    BetMade = 'Aposta Feita',
}

export interface MoneyTransactionProps {
    id: string;
    date: string;
    type: string;
    value: number;

    balanceAfter: number;
}

const OPERATION_STYLES =
    'h-full flex flex-col items-start w-40 p-4 text-WHITE gap-2 text-WHITE';

export const MoneyTransaction = ({
    type,
    date,
    value,
    balanceAfter,
}: MoneyTransactionProps) => {
    // FIXME: Hardcoded text in this component

    const transactionType =
        TransactionType[type as keyof typeof TransactionType];

    const isValuePositive = value > 0;

    return (
        <div className="flex flex-row justify-between items-center px-4 gap-0 bg-WHITE rounded">
            <div className="flex flex-row justify-left items-center w-28 gap-2">
                <AttachMoneyIcon />
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {transactionType}
                </span>
            </div>
            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Data'}</span>
                <span className="text-EERIE_BLACK text-base">
                    {formatDate(date)}
                </span>
            </div>

            {isValuePositive && (
                <div className={`${OPERATION_STYLES} bg-RIGHT_GREEN`}>
                    <span className="text-xs">Operação</span>
                    <span className="text-base font-semibold">
                        + {value} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {!isValuePositive && (
                <div className={`${OPERATION_STYLES} bg-IMPERIAL_RED`}>
                    <span className="text-xs">Operação</span>
                    <span className="text-base font-semibold">
                        {`- ${Math.abs(value)} €`}
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Saldo após movimento'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {balanceAfter} €
                    {/* FIXME: Money currency is hardcoded and can vary */}
                </span>
            </div>
        </div>
    );
};
