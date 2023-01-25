import type {NextPage} from 'next';
import {EventCard} from '@components/EventCard';
import {PageLayout} from '@components/PageLayout';
import {useEventsByCompetition} from '@hooks/useEventsByCompetition';
import {CircularProgress} from '@mui/material';
import {Pagination} from '@components/Pagination';
import {usePagination} from '@hooks/usePagination';
import {Event} from '@domain/Event';

const PRIMARY_COMPETITION_ID = 'Portuguese First League';

const NUM_PAGES = 10;

const orderEvents = (event1: Event, event2: Event) => {
    return new Date(event2.date).getTime() - new Date(event1.date).getTime();
};

const Home: NextPage = () => {
    const {currentPage, setCurrentPage} = usePagination();

    const {isSuccess, isLoading, isError, events} = useEventsByCompetition({
        compId: PRIMARY_COMPETITION_ID,
        pageNum: currentPage,
    });

    return (
        <PageLayout>
            <div className="min-w-min flex flex-col justify-between items-start gap-3 w-full">
                <div className="min-w-min flex flex-col justify-start items-center gap-3 w-full">
                    {isLoading && <CircularProgress />}
                    {isSuccess &&
                        events
                            .sort(orderEvents)
                            .map((event) => (
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

export default Home;
