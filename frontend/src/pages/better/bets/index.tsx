import React from 'react';
import {BetRecord, BetRecordProps} from '@components/BetRecord';
import {PageLayout} from '@components/PageLayout';
import {Accordion} from '@components/Accordion';
import {
    OnGoingBetRecord,
    OnGoingBetRecordProps,
} from '@components/OnGoingBetRecord';

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

const MOCK_ON_GOIN_BET_RECORD: OnGoingBetRecordProps = {
    eventName: 'Manchester United vs. Liverpool',
    eventDate: '21-10-2022',
    eventType: 'football',
    betAmount: 1.0,
    betName: 'Resultado Final: United',
    betOdd: 1.54,
    betPossibleWinnings: 1.54,
    cancelBetHandler: () => {
        console.log('Aposta cancelada');
    },
};

const Bets = () => {
    return (
        <PageLayout>
            <div className="w-full flex flex-col gap-4">
                <Accordion header={'Em Curso'}>
                    <div className="w-full flex flex-col justify-start gap-1">
                        <OnGoingBetRecord {...MOCK_ON_GOIN_BET_RECORD} />
                        <OnGoingBetRecord {...MOCK_ON_GOIN_BET_RECORD} />
                        <OnGoingBetRecord {...MOCK_ON_GOIN_BET_RECORD} />
                    </div>
                </Accordion>
                <Accordion header={'Terminadas'}>
                    <div className="w-full flex flex-col justify-start gap-1">
                        <BetRecord {...MOCK_WIN_BET_RECORD} />
                        <BetRecord {...MOCK_LOST_BET_RECORD} />
                        <BetRecord {...MOCK_WIN_BET_RECORD} />
                    </div>
                </Accordion>
            </div>
        </PageLayout>
    );
};

export default Bets;
