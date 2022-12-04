import type {NextPage} from 'next';
import {EventCard, EventCardProps} from '@components/EventCard';
import {PageLayout} from '@components/PageLayout';
import {useEvents} from '@hooks/useEvents';

/* FIXME Mock data hardcoded */
const MOCK_EVENT: EventCardProps = {
    eventId: '1',
    eventName: 'Real Madrid vs Barcelona',
    eventType: 'football',
    commenceTime: new Date().toString(),
    odds: [
        {
            name: 'Real Madrid',
            price: 1.54,
        },
        {
            name: 'Empate',
            price: 2.57,
        },
        {
            name: 'Barcelona',
            price: 3.59,
        },
    ],
};

const MOCK_EVENTS: EventCardProps[] = [
    MOCK_EVENT,
    MOCK_EVENT,
    MOCK_EVENT,
    MOCK_EVENT,
    MOCK_EVENT,
    MOCK_EVENT,
    MOCK_EVENT,
    MOCK_EVENT,
];

const PRIMARY_SPORT_ID = '0'; // Football
const PRIMARY_COMPETITION_ID = '0'; // Football

const EVENT_ID = '08508dce-5873-4c44-8df0-f1df13187225';

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, events, error} = useEvents(
        PRIMARY_COMPETITION_ID
    );

    return (
        <PageLayout>
            <div className="flex flex-col justify-start gap-3 w-full">
                {isSuccess &&
                    events.map((event) => (
                        <EventCard key={event.Id} {...event} />
                    ))}
            </div>
        </PageLayout>
    );
};

export default Home;
