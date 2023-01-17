import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {CircularProgress} from '@mui/material';
import {useEventsBySport} from '@hooks/useEventsBySport';
import {GameCardAdmin} from '@components/GameCardAdmin';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    const {isSuccess, isLoading, isError, events, error} =
        useEventsBySport(eventId);
    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="gap-8 bg-gray-400 w-screen justify-center flex items-center">
                    <div className=" flex flex-col gap-5 items-top  py-4 w-max">
                        <div className="text-xl bg-white w-full font-semibold pl-4  py-4">
                            Jogos
                        </div>
                        {events
                            .filter((game) => !game.completed)
                            .map((game) => {
                                return (
                                    <div key={game.id}>
                                        <GameCardAdmin
                                            game={game}
                                            sport={eventId}
                                            textButton={'Alterar cotas'}
                                            textPropsUp={'Insira novas cotas'}
                                            textSucess={
                                                'Cotas alteradas com sucesso'
                                            }
                                            resultOrOdd={false}
                                            textSet={'Cota'}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
            {isError && <span>Something went wrong</span>}
        </>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
