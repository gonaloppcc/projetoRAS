import React from 'react';
import {NextPage} from 'next';
import {PageLayout} from '@components/PageLayout';
import {useEventsByCompetition} from '@hooks/useEventsByCompetition';
import {CircularProgress} from '@mui/material';
import {EventCard} from '@components/EventCard';
import {usePagination} from '@hooks/usePagination';
import {Pagination} from '@components/Pagination';

interface PageProps {
    competitionId: string;
}

const NUM_PAGES = 10;

const CompetitionPage: NextPage<PageProps> = ({competitionId}) => {
    const {currentPage, setCurrentPage} = usePagination();
    const {isSuccess, isLoading, isError, events} = useEventsByCompetition({
        compId: competitionId,
        pageNum: currentPage,
    });

    return (
        <PageLayout>
            <div className="min-w-min flex flex-col justify-between items-start gap-3 w-full">
                <div className="min-w-min flex flex-col justify-start items-center gap-3 w-full">
                    {isLoading && <CircularProgress />}
                    {isSuccess &&
                        events.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    {isSuccess && events.length === 0 && (
                        <span>Não há jogos por agora</span>
                    )}

                    {isError && (
                        <span>Ocorreu um erro ao carregar os jogos</span>
                    )}
                </div>
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalPages={NUM_PAGES}
                />
            </div>
        </PageLayout>
    );
};

CompetitionPage.getInitialProps = async ({query}) => {
    return {competitionId: query.id as string};
};

export default CompetitionPage;
