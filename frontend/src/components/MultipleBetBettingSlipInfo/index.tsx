import React from 'react';
import {formatNumber} from '../../utils/formatters';
import {Input} from '@components/Input';

interface MultipleBettingSlipInfoProps {
    odd: number;
    placeBetOnClick: () => void;
    bettingAmount: number;
    setBettingAmount: (amount: number) => void;
}

export const MultipleBetBettingSlipInfo = ({
    odd,
    placeBetOnClick,
    bettingAmount,
    setBettingAmount,
}: MultipleBettingSlipInfoProps) => {
    const bettingAmountAsString = String(bettingAmount);

    const setBettingAmountHandler = (amount: string) => {
        setBettingAmount(Number(amount));
    };

    return (
        <div className="w-full flex flex-col items-start p-2 gap-2 bg-WHITE shadow rounded">
            <div className="w-full flex flex-row justify-between items-start p-0">
                <div className="flex flex-row justify-center items-center gap-2">
                    <span>{'Cota' /* FIXME Text hardcoded for now!! */}</span>
                    <span className="bg-SPECIAL p-2 text-EERIE_BLACK rounded font-semibold">
                        {formatNumber(odd)}
                    </span>
                </div>
                <Input
                    type="number"
                    placeholder={
                        'Montante' /* FIXME Text hardcoded for now!! */
                    }
                    value={bettingAmountAsString}
                    onChange={setBettingAmountHandler}
                    suffix={'€' /* FIXME Currency hardcoded for now!! */}
                />
            </div>
            <div className="w-full flex flex-row justify-between items-start pr-2">
                <span>
                    {'Total de Ganhos' /* FIXME Text hardcoded for now!! */}
                </span>
                <span>{`${formatNumber(odd * bettingAmount)} €`}</span>
            </div>
            <button
                className="w-full py-1.5 bg-IMPERIAL_RED rounded-xl shadow-2xl text-WHITE"
                onClick={placeBetOnClick}
            >
                {'APOSTAR' /* FIXME Text hardcoded for now!! */}
            </button>
        </div>
    );
};
