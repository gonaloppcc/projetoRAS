import type {NextPage} from 'next';
import {EventCard, EventCardProps} from '@components/EventCard';
import {PageLayout} from '@components/PageLayout';

/* FIXME Mock data hardcoded */
const MOCK_EVENT: EventCardProps = {
    eventName: 'Real Madrid vs Barcelona',
    date: 'Hoje 20:15',
    odds: [
        {
            name: 'Real Madrid',
            price: 1.5,
        },
        {
            name: 'Empate',
            price: 2.5,
        },
        {
            name: 'Barcelona',
            price: 3.5,
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
    /* FIXME DUMMY MAIN PAGE!! */
    return (
        <PageLayout>
            <div className="flex flex-col justify-start gap-3 w-full">
                {MOCK_EVENTS.map((event) => (
                    <EventCard key={event.eventName} {...event} />
                ))}
                {/*<Competitions competitions={MOCK_COMPETITIONS} />*/}
            </div>
        </PageLayout>
    );
};

export default Home;
