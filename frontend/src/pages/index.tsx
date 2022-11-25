import type {NextPage} from 'next';
import {EventCard, EventCardProps} from '@components/EventCard';
//import hello from '../../locales/pt/common.json';
import pt from '@locales/pt/common.json';
import en from '@locales/en/common.json';
import {useRouter} from 'next/router';
import {Competitions} from '@components/Competitions';
import {CompetitionProps} from '@components/CompetitionCard';

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

const MOCK_EVENTS: EventCardProps[] = [MOCK_EVENT, MOCK_EVENT, MOCK_EVENT];

const MOCK_COMPETITIONS: CompetitionProps[] = [
    {
        name: 'Portugal - Primeira Liga',
        eventType: 'Futebol',
        isFavorite: true,
    },
    {
        name: 'Portugal - Segunda Liga',
        eventType: 'Futebol',
        isFavorite: false,
    },
];

const Home: NextPage = () => {
    const router = useRouter();

    const locale = router.locale || 'en';

    /* FIXME DUMMY MAIN PAGE!! */
    return (
        <div className="bg-CULTURED w-screen h-screen p-2 flex flex-col gap-3">
            {MOCK_EVENTS.map((event) => (
                <EventCard key={event.eventName} {...event} />
            ))}
            <Competitions competitions={MOCK_COMPETITIONS} />
            {
                locale == 'en'
                    ? en.hello
                    : pt.hello /* FIXME Hardcoded as an example */
            }
        </div>
    );
};

export default Home;
