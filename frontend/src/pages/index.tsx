import type {NextPage} from 'next';
import {EventCard, EventCardProps} from '@components/EventCard';

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
    const listOdds = [
        {name: 'Porto', price: 32},
        {name: 'Empate', price: 32},
        {name: 'Benfica', price: 22},
    ];
    return (
        <div className="bg-CULTURED w-screen h-screen p-2 flex flex-col gap-3">
            <EventCard
                eventName={'Porto - Benfica'}
                date={'Hoje 20:15'}
                odds={listOdds}
            ></EventCard>
            <EventCard
                eventName={'Porto - Benfica'}
                date={'Hoje 20:15'}
                odds={listOdds}
            ></EventCard>
            <EventCard
                eventName={'Porto - Benfica'}
                date={'Hoje 20:15'}
                odds={listOdds}
            ></EventCard>
        </div>
    );
};

export default Home;
