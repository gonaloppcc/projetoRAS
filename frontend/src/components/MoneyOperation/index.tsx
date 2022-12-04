import React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {FormattedMessage, useIntl} from 'react-intl';
import { AddAPhotoOutlined } from '@mui/icons-material';

    
export enum OperationType {
    DEPOSIT = 'Depósito',
    WITHDRAW = 'Retiro',
    BET_WIN = 'Aposta Ganha',
    BET_LOSS = 'Aposta Perdida',
}

export interface MoneyOperationProps {
    operationDate: string;
    operationAmount: number;
    operationType: OperationType;
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

    const intl = useIntl();
    const featureDate = intl.formatMessage({id: 'OnGoingBetRecord.Date'});
    const featureOperation = intl.formatMessage({id: 'MoneyOperation.Operation'});
    const featureBalance = intl.formatMessage({id: 'MoneyOperation.Balance'});


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
                <span className="text-LIGHT_GRAY text-sm">{featureDate}</span>
                <span className="text-EERIE_BLACK text-base">
                    {operationDate}
                </span>
            </div>

            {operationType === OperationType.DEPOSIT && (
                <div className={`${OPERATION_STYLES} bg-RIGHT_GREEN`}>
                    <span className="text-xs">{featureOperation}</span>
                    <span className="text-base font-semibold">
                        + {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {operationType === OperationType.WITHDRAW && (
                <div className={`${OPERATION_STYLES} bg-IMPERIAL_RED`}>
                    <span className="text-xs">{featureOperation}</span>
                    <span className="text-base font-semibold">
                        - {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {operationType === OperationType.BET_WIN && (
                <div className={`${OPERATION_STYLES} bg-RIGHT_GREEN`}>
                    <span className="text-xs">{featureOperation}</span>
                    <span className="text-base font-semibold">
                        + {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}
            {operationType === OperationType.BET_LOSS && (
                <div className={`${OPERATION_STYLES} bg-IMPERIAL_RED`}>
                    <span className="text-xs">{featureOperation}</span>
                    <span className="text-base font-semibold">
                        - {operationAmount} €
                        {/* FIXME: Money currency is hardcoded and can vary */}
                    </span>
                </div>
            )}

            <div className="flex flex-col items-start p-0 gap-2">
                <span className="text-LIGHT_GRAY text-sm">
                    {featureBalance}
                </span>
                <span className="text-EERIE_BLACK text-base font-semibold">
                    {balanceAfterOperation} €
                    {/* FIXME: Money currency is hardcoded and can vary */}
                </span>
            </div>
        </div>
    );
};

