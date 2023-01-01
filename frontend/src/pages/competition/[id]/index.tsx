import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useEventsByCompetition} from '@hooks/useEventsByCompetition';
import {CircularProgress} from '@mui/material';
import {EventCard} from '@components/EventCard';

interface PageProps {
    competitionId: string;
}

const CompetitionPage: NextPage<PageProps> = ({competitionId}) => {
    const {isSuccess, isLoading, isError, events, error} =
        useEventsByCompetition(competitionId);

    return (
        <PageLayout>
            <div className="min-w-min flex flex-col justify-start items-center gap-3 w-full">
                {isLoading && <CircularProgress />}
                {isSuccess &&
                    events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                {isSuccess && events.length === 0 && (
                    <span>Não há jogos por agora</span>
                )}
                {isError && <span>Ocorreu um erro ao carregar os jogos</span>}
            </div>
        </PageLayout>
    );
};

CompetitionPage.getInitialProps = async ({query}) => {
    return {competitionId: query.id as string};
};

export default CompetitionPage;
