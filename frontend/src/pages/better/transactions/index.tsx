import React from 'react';
import {PageLayout} from '@components/PageLayout';
import {MoneyTransaction} from '@components/MoneyTransaction';
import {useTransactions} from '@hooks/useTransactions';
import {Transaction} from '@domain/User';

const orderTransactions = (
    transaction1: Transaction,
    transaction2: Transaction
) => {
    return (
        new Date(transaction2.date).getTime() -
        new Date(transaction1.date).getTime()
    );
};
const Transactions = () => {
    const {isSuccess, isLoading, isError, transactions, error} =
        useTransactions();

    return (
        <PageLayout>
            <div className="w-full flex flex-col justify-start gap-1 overflow-y-auto">
                {isSuccess &&
                    transactions
                        .sort(orderTransactions)
                        .slice(0, 8)
                        .map((transaction) => (
                            <MoneyTransaction
                                key={transaction.id}
                                {...transaction}
                            />
                        ))}
            </div>
        </PageLayout>
    );
};

export default Transactions;
