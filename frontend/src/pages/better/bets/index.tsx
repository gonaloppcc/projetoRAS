import React from 'react';
import {BetRecord, BetRecordProps} from '@components/BetRecord';
import {PageLayout} from '@components/PageLayout';
import {Accordion} from '@components/Accordion';
import {
    OnGoingBetRecord,
    OnGoingBetRecordProps,
} from '@components/OnGoingBetRecord';
import {useBets} from '@hooks/useBets';
import {Bet} from '@domain/Bet';
import {CircularProgress} from '@mui/material';

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

const USER_ID = '0';

const Bets = () => {
    const {isSuccess, isLoading, isError, bets, error} = useBets(USER_ID);

    let onGoingBets: Bet[] = [];
    let finishedBets: Bet[] = [];

    if (!isLoading) {
        onGoingBets = bets.filter((bet) => !bet.Closed);

        finishedBets = bets.filter((bet) => bet.Closed);
    }

    return (
        <PageLayout>
            <div className="w-full flex flex-col gap-4">
                <Accordion header={'Em Curso'}>
                    <div className="w-full flex flex-col justify-start gap-1">
                        {isLoading && <CircularProgress />}
                        {isSuccess &&
                            onGoingBets.map((bet) => (
                                <OnGoingBetRecord key={bet.Id} {...bet} />
                            ))}
                    </div>
                </Accordion>
                <Accordion header={'Terminadas'}>
                    <div className="w-full flex flex-col justify-start gap-1">
                        {isLoading && <CircularProgress />}
                        {isSuccess &&
                            finishedBets.map((bet) => (
                                <BetRecord key={bet.Id} {...bet} />
                            ))}
                    </div>
                </Accordion>
            </div>
        </PageLayout>
    );
};

export default Bets;
