import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {CircularProgress} from '@mui/material';
import {useEventsBySport} from '@hooks/useEvents';
import {EndGameCard} from '@components/EndGameCard';
import {OpenGameCard, OpenGameInfo} from '@components/OpenGameCard';

interface PageProps {
    eventId: string;
}

const EventPage: NextPage<PageProps> = ({eventId}) => {
    const {isSuccess, isLoading, isError, events, error} =
        useEventsBySport(eventId);
    console.log(events);
    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="gap-8 h-screen w-screen justify-center flex items-center">
                    <div className=" flex flex-col gap-5 items-top min-h-screen w-max">
                        {events.map((game) => {
                            console.log(game);
                            return game.Completed ? (
                                /*<OpenGameCard
                                    key={game.eventName}
                                    game={game as OpenGameInfo}
                                />*/
                                <div>Jogo aberto</div>
                            ) : (
                                <EndGameCard game={game} />
                            );
                        })}
                    </div>
                </div>
            )}
            {isError && <span>{error}</span>}
        </>
    );
};

EventPage.getInitialProps = async ({query}) => {
    return {eventId: query.id as string};
};

export default EventPage;
