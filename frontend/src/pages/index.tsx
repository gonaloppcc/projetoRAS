import type {NextPage} from 'next';
import {EventCard, EventCardProps} from '@components/EventCard';
import {useRouter} from 'next/router';
import {FormattedMessage, useIntl} from 'react-intl';

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
    const {locales} = useRouter();

    const intl = useIntl();

    const title = intl.formatMessage({id: 'page.home.head.title'});

    const listOdds = [
        {name: 'Porto', price: 32},
        {name: 'Empate', price: 32},
        {name: 'Benfica', price: 22},
    ];
    /*
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
    );*/
    return (
        <div className="bg-blue-600">
            <div>{title}</div>
        </div>
    );
};

export default Home;
