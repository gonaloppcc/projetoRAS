import React from 'react';

interface BettingSlipInfoProps {
    amount: number;
    possibleWinnings: number;
    placeBetOnClick: () => void;
}

export const BettingSlipInfo = ({
    amount,
    possibleWinnings,
    placeBetOnClick,
}: BettingSlipInfoProps) => {
    return (
        <div className="w-full flex flex-col items-start p-2 gap-2 bg-WHITE shadow">
            <div className="w-full flex flex-row justify-between items-start p-0">
                <span>
                    {'Montante Total' /* FIXME Text hardcoded for now!! */}
                </span>
                <span>{amount}</span>
            </div>
            <div className="w-full flex flex-row justify-between items-start p-0">
                <span>
                    {'Total de Ganhos' /* FIXME Text hardcoded for now!! */}
                </span>
                <span>{possibleWinnings}</span>
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
