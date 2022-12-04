import type {NextPage} from 'next';
import {EventCard} from '@components/EventCard';
import {PageLayout} from '@components/PageLayout';
import {useEvents} from '@hooks/useEvents';
import {CircularProgress} from '@mui/material';

const PRIMARY_COMPETITION_ID = '0'; // Football

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, events, error} = useEvents(
        PRIMARY_COMPETITION_ID
    );

    return (
        <PageLayout>
            <div className="flex flex-col justify-start items-center gap-3 w-full">
                {isLoading && <CircularProgress />}
                {isSuccess &&
                    events.map((event) => (
                        <EventCard key={event.Id} {...event} />
                    ))}
                {isSuccess && events.length === 0 && (
                    <span>Não há jogos por agora</span>
                )}
                {isError && <span>{error}</span>}
            </div>
        </PageLayout>
    );
};

export default Home;
