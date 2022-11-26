import React from 'react';
import {Bets} from '@components/Bets';
import {BettingSlipInfo} from '@components/BettingSlipInfo';

export const BettingSlip = () => {
    return (
        <div className="w-full flex flex-col items-start p-0 gap-1 bg-WHITE rounded">
            <div className="w-full flex flex-col items-start p-2 gap-2 bg-WHITE shadow rounded-t">
                {'BOLETIM' /* FIXME Text hardcoded for now!! */}
                <div className="w-full flex flex-row justify-start items-center p-0 gap-2">
                    <div className="p-2 border-b-2 border-RICH_BLACK">
                        {'Simples' /* FIXME Text hardcoded for now!! */}
                    </div>
                    <div className="p-2 border-RICH_BLACK">
                        {'Múltipla' /* FIXME Text hardcoded for now!! */}
                    </div>
                </div>
            </div>
            <Bets></Bets>
            <BettingSlipInfo
                amount={5}
                possibleWinnings={20}
                placeBetOnClick={() => {}}
            ></BettingSlipInfo>
        </div>
    );
};
