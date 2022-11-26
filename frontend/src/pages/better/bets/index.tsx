import React from 'react';
import {BetRecord, BetRecordProps} from '@components/BetRecord';
import {PageLayout} from '@components/PageLayout';
import {Accordion} from '@components/Accordion';

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
            <Accordion>
                <div className="w-full flex flex-col justify-start gap-1">
                    <BetRecord {...MOCK_WIN_BET_RECORD}></BetRecord>
                    <BetRecord {...MOCK_LOST_BET_RECORD}></BetRecord>
                    <BetRecord {...MOCK_WIN_BET_RECORD}></BetRecord>
                </div>
            </Accordion>
        </PageLayout>
    );
};

export default Bets;
