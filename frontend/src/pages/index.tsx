import type {NextPage} from 'next';
import {BetCard} from '@components/BetCard';
//import hello from '../../locales/pt/common.json';
import pt from '@locales/pt/common.json';
import en from '@locales/en/common.json';
import {useRouter} from 'next/router';
import {Competitions} from '@components/Competitions';
import {CompetitionProps} from '@components/CompetitionCard';

/* FIXME Mock data hardcoded */
const listOdds = [
    {name: 'Porto', price: 32},
    {name: 'Empate', price: 3.05},
    {name: 'Benfica', price: 1.56},
];

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

    return (
        <div className="bg-CULTURED w-screen h-screen p-2 flex flex-col gap-3">
            <BetCard
                eventName={'Porto - Benfica'}
                date={'Hoje 20:15'}
                odds={listOdds}
            />
            <BetCard
                eventName={'Porto - Benfica'}
                date={'Hoje 20:15'}
                odds={listOdds}
            />
            <BetCard
                eventName={'Porto - Benfica'}
                date={'Hoje 20:15'}
                odds={listOdds}
            />
            {
                locale == 'en'
                    ? en.hello
                    : pt.hello /* FIXME Hardcoded as an example */
            }
            <Competitions competitions={MOCK_COMPETITIONS} />
        </div>
    );
};

export default Home;
