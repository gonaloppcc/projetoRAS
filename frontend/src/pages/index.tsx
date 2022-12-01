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
    const listOdds = [
        {name: 'Porto', price: 32},
        {name: 'Empate', price: 32},
        {name: 'Benfica', price: 22},
    ];
    return (
        <PageLayout>
            <div className="flex flex-col justify-start gap-3 w-full">
                <EventCard
                    eventName={'Porto - Benfica'}
                    date={'Hoje 20:15'}
                    odds={listOdds}
                />
                <EventCard
                    eventName={'Porto - Benfica'}
                    date={'Hoje 20:15'}
                    odds={listOdds}
                />
                <EventCard
                    eventName={'Porto - Benfica'}
                    date={'Hoje 20:15'}
                    odds={listOdds}
                />
            </div>
        </PageLayout>
    );
};

export default Home;
