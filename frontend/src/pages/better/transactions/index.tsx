import React from 'react';
import {PageLayout} from '@components/PageLayout';
import {MoneyTransaction} from '@components/MoneyTransaction';
import {useTransactions} from '@hooks/useTransactions';

const Transactions = () => {
    const {isSuccess, isLoading, isError, transactions, error} =
        useTransactions();

    return (
        <PageLayout>
            <div className="w-full flex flex-col justify-start gap-1 overflow-y-auto">
                {isSuccess &&
                    transactions.map((transaction) => (
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
