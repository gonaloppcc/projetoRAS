import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export enum OperationType {
    DEPOSIT = 'Depósito',
    WITHDRAW = 'Retiro',
    BET_WIN = 'Aposta Ganha',
    BET_LOSS = 'Aposta Perdida',
}

export interface MoneyOperationProps {
    operationDate: string;
    operationType: OperationType;
    operationAmount: number;

    balanceAfterOperation: number;
}

const OPERATION_STYLES =
    'h-full flex flex-col items-start w-40 p-4 text-WHITE gap-2 text-WHITE';

export const MoneyOperation = ({
    operationType,
    operationDate,
    operationAmount,
    balanceAfterOperation,
}: MoneyOperationProps) => {
    // FIXME: Hardcoded text in this component
    return (
        <div className="flex flex-row justify-between items-center px-4 gap-0 bg-WHITE rounded">
            <div className="flex flex-row justify-left items-center w-28 gap-2">
                <AttachMoneyIcon />
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {operationType}
                </span>
            </div>
            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">{'Data'}</span>
                <span className="text-EERIE_BLACK text-base">
                    {operationDate}
                </span>
            </div>

            {operationType === OperationType.DEPOSIT && (
                <div className={`${OPERATION_STYLES} bg-RIGHT_GREEN`}>
                    <span className="text-xs">Operação</span>
                    <span className="text-base font-semibold">
                        + {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {operationType === OperationType.WITHDRAW && (
                <div className={`${OPERATION_STYLES} bg-IMPERIAL_RED`}>
                    <span className="text-xs">Operação</span>
                    <span className="text-base font-semibold">
                        - {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {operationType === OperationType.BET_WIN && (
                <div className={`${OPERATION_STYLES} bg-RIGHT_GREEN`}>
                    <span className="text-xs">Operação</span>
                    <span className="text-base font-semibold">
                        + {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {operationType === OperationType.BET_LOSS && (
                <div className={`${OPERATION_STYLES} bg-IMPERIAL_RED`}>
                    <span className="text-xs">Operação</span>
                    <span className="text-base font-semibold">
                        - {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {'Saldo após movimento'}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {balanceAfterOperation} €{' '}
                    {/* FIXME: Money currency is hardcoded and can vary */}
                </span>
            </div>
        </div>
    );
};
