import React from 'react';
import {BetRecord, BetRecordProps} from '@components/BetRecord';
import {PageLayout} from '@components/PageLayout';

const MOCK_WIN_BET_RECORD: BetRecordProps = {
    eventName: 'Manchester United vs. Liverpool',
    eventDate: '21-10-2022',
    eventType: 'football',
    betAmount: 1.0,
    betName: 'Resultado Final: United',
    betOdd: 1.54,
    betWinnings: 1.54,
};

const MOCK_LOST_BET_RECORD: BetRecordProps = {
    eventName: 'Manchester United vs. Liverpool',
    eventDate: '21-10-2022',
    eventType: 'football',
    betAmount: 1.0,
    betName: 'Resultado Final: United',
    betOdd: 1.54,
    betWinnings: 0,
};

const Bets = () => {
    return (
        <PageLayout>
            <div className="flex flex-col justify-start gap-4">
                <BetRecord {...MOCK_WIN_BET_RECORD}></BetRecord>
                <BetRecord {...MOCK_LOST_BET_RECORD}></BetRecord>
                <BetRecord {...MOCK_WIN_BET_RECORD}></BetRecord>
            </div>
        </PageLayout>
    );
};

export default Bets;
