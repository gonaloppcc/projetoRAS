import type {NextPage} from 'next';
import {EventCard, EventCardProps} from '@components/EventCard';
import {useEvents} from '@hooks/useEvents';
import {PageLayout} from '@components/PageLayout';

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

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, events, error} = useEvents('0');

    return (
        <PageLayout>
            <div className="flex flex-col justify-start gap-3 w-full">
                {MOCK_EVENTS.map((event) => (
                    <EventCard key={event.eventId} {...event} />
                ))}
            </div>
        </PageLayout>
    );
};

export default Home;
