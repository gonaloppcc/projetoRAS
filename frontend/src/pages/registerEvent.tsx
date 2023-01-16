import type {NextPage} from 'next';
import {CircularProgress} from '@mui/material';
import {RegisterEvent} from '@components/RegisterEvent';
import {InfoSport} from '@domain/Event';
import {useSports} from '@hooks/useSports';

/* FIXME Mock data hardcoded */
const MOCK_SPORTS: InfoSport[] = [
    {
        name: 'Football',
        competitions: ['Premier League', 'La Liga', 'Serie A', 'Bundesliga'],
        teams: ['Benfica', 'Porto', 'Real Madrid', 'Varzim', 'Rio Ave'],
    },
    {
        name: 'Basketball',
        competitions: ['NBA', 'Liga ACB', 'Liga Portuguesa'],
        teams: [
            'LA Lakers',
            'Boston Celtics',
            'Golden State Warriors',
            'Milwaukee Bucks',
        ],
    },
    {
        name: 'Karate',
        competitions: ['World Karate Federation', 'World Karate Federation2'],
        teams: ['Benfica', 'Porto', 'Real Madrid', 'Varzim', 'Rio Ave'],
    },
];

const Home: NextPage = () => {
    const {isSuccess, isLoading, isError, sports, error} = useSports();
    return (
        <>
            {isLoading && <CircularProgress />}
            {isSuccess && (
                <div className="flex flex-col justify-start gap-3 w-full">
                    <RegisterEvent sports={sports} />
                </div>
            )}

            {isError && <span>{error}</span>}
        </>
    );
};

export default Home;
