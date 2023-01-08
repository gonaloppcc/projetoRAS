import type {NextPage} from 'next';
import {EventCard} from '@components/EventCard';
import {PageLayout} from '@components/PageLayout';
import {useEventsByCompetition} from '@hooks/useEventsByCompetition';
import {CircularProgress} from '@mui/material';

const PRIMARY_COMPETITION_ID = 'Portuguese First League';

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, events, error} =
        useEventsByCompetition(PRIMARY_COMPETITION_ID);

    return (
        <PageLayout>
            <div className="min-w-min flex flex-col justify-start items-start gap-3 w-full">
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

export default Home;
