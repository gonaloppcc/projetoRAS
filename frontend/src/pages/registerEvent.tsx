import type {NextPage} from 'next';
import {RegisterEvent} from '@components/RegisterEvent';

/* FIXME Mock data hardcoded */
const MOCK_SPORTS: AllSport[] = [
    {
        name: 'Football',
        leagues: ['Premier League', 'La Liga', 'Serie A', 'Bundesliga'],
        participants: ['Benfica', 'Porto', 'Real Madrid', 'Varzim', 'Rio Ave'],
    },
    {
        name: 'Basketball',
        leagues: ['NBA', 'Liga ACB', 'Liga Portuguesa'],
        participants: [
            'LA Lakers',
            'Boston Celtics',
            'Golden State Warriors',
            'Milwaukee Bucks',
        ],
    },
    {
        name: 'Karate',
        leagues: ['World Karate Federation', 'World Karate Federation2'],
        participants: ['Benfica', 'Porto', 'Real Madrid', 'Varzim', 'Rio Ave'],
    },
];

export interface AllSport {
    name: string;
    leagues: string[];
    participants: string[];
}

const Home: NextPage = () => {
    return (
        <div className="flex flex-col justify-start gap-3 w-full">
            <RegisterEvent sports={MOCK_SPORTS} />
        </div>
    );
};

export default Home;
