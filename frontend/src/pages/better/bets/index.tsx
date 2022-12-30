import React from 'react';
import {PageLayout} from '@components/PageLayout';
import {Accordion} from '@components/Accordion';
import {OnGoingBetRecord} from '@components/OnGoingBetRecord';
import {useBets} from '@hooks/useBets';
import {Bet} from '@domain/Bet';
import {CircularProgress} from '@mui/material';
import {deleteBet} from '../../../services/backend/bet';
import {useProfileState} from '@state/useProfileState';

const Bets = () => {
    const {Id} = useProfileState();

    const {isSuccess, isLoading, isError, bets, refetch} = useBets(Id);

    let onGoingBets: Bet[] = [];
    let finishedBets: Bet[] = [];

    if (!isLoading) {
        onGoingBets = bets.filter((bet) => !bet.Closed);

        finishedBets = bets.filter((bet) => bet.Closed);
    }

    const cancelBetHandler = (betId: string) => {
        return async () => {
            await deleteBet(betId);
            refetch();
        };
    };

    return (
        <PageLayout>
            <div className="w-full flex flex-col items-center gap-4">
                {isLoading && <CircularProgress />}
                {isError && <div>{'Something went wrong!'}</div>}
                {isSuccess && (
                    <>
                        <Accordion header={'Em Curso'}>
                            <div className="w-full flex flex-col justify-start gap-1">
                                {isSuccess &&
                                    onGoingBets.map((bet) => (
                                        <OnGoingBetRecord
                                            key={bet.Id}
                                            bet={bet}
                                            cancelBetHandler={cancelBetHandler(
                                                bet.Id
                                            )}
                                        />
                                    ))}
                            </div>
                        </Accordion>
                        <Accordion header={'Terminadas'}>
                            <div className="w-full flex flex-col justify-start gap-1">
                                {isSuccess &&
                                    finishedBets.map((bet) => (
                                        <>

                                        </> /*<BetRecord key={bet.Id} {...bet} />*/
                                    ))}
                            </div>
                        </Accordion>
                    </>
                )}
            </div>
        </PageLayout>
    );
};

export default Bets;
