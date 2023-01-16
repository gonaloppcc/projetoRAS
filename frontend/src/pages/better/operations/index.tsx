import React from 'react';
import {PageLayout} from '@components/PageLayout';
import {MoneyOperation, OperationType} from '@components/MoneyOperation';
import {useTransactions} from '@hooks/useTransactions';

const MOCK_DEPOSIT_OPERATION = {
    operationDate: '2021-10-10',
    operationType: OperationType.DEPOSIT,
    operationAmount: 100,
    balanceAfterOperation: 100,
};

const MOCK_WITHDRAW_OPERATION = {
    operationDate: '2021-10-12',
    operationType: OperationType.WITHDRAW,
    operationAmount: 20,
    balanceAfterOperation: 80,
};

const MOCK_BET_WIN_OPERATION = {
    operationDate: '2021-10-15',
    operationType: OperationType.BET_WIN,
    operationAmount: 124.3,
    balanceAfterOperation: 24.3,
};

const MOCK_BET_LOST_OPERATION = {
    operationDate: '2021-10-15',
    operationType: OperationType.BET_LOSS,
    operationAmount: 50,
    balanceAfterOperation: 24.3,
};

const Operations = () => {
    const {isSuccess, isLoading, isError, transactions, error} =
        useTransactions();

    return (
        <PageLayout>
            <div className="w-full flex flex-col justify-start gap-1">
                <MoneyOperation {...MOCK_WITHDRAW_OPERATION} />
                <MoneyOperation {...MOCK_BET_WIN_OPERATION} />
                <MoneyOperation {...MOCK_BET_LOST_OPERATION} />
                <MoneyOperation {...MOCK_DEPOSIT_OPERATION} />
            </div>
        </PageLayout>
    );
};

export default Operations;
