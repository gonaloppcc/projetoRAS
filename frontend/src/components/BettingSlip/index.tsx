import React from 'react';
import {Bets} from '@components/Bets';
import {BettingSlipInfo} from '@components/BettingSlipInfo';

import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

export const BettingSlip = () => {
    const intl = useIntl();
    const featureMybet = intl.formatMessage({id: 'BettingSlip.mybet'});
    const featureSingle = intl.formatMessage({id: 'BettingSlip.singles'});
    const featureMultiple = intl.formatMessage({id: 'BettingSlip.multiples'});
    return (
        <div className="w-full flex flex-col items-start p-0 gap-1 bg-WHITE rounded">
            <div className="w-full flex flex-col items-start p-2 gap-2 bg-WHITE shadow rounded-t">
                {featureMybet /* FIXME Text hardcoded for now!! */}
                <div className="w-full flex flex-row justify-start items-center p-0 gap-2">
                    <div className="p-2 border-b-2 border-RICH_BLACK">
                        {featureSingle /* FIXME Text hardcoded for now!! */}
                    </div>
                    <div className="p-2 border-RICH_BLACK">
                        {featureMultiple /* FIXME Text hardcoded for now!! */}
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
