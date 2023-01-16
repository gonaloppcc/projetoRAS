import type {NextPage} from 'next';
import {OpenGameCard, OpenGameInfo} from '@components/OpenGameCard';
import {PageLayout} from '@components/PageLayout';
import {GameCardAdmin} from '@components/GameCardAdmin';

// FIXME
/* FIXME Mock data hardcoded */
const MOCK_GAME_OPEN: OpenGameInfo = {
    eventName: 'Porto - Benfica',
    date: '10/11/2022',
    open: true,
    oddHome: 2,
    oddAway: 2,
    oddTie: 3,
};

const MOCK_GAME_OPEN2: OpenGameInfo = {
    eventName: 'Nome comprido - Outro nome grande',
    date: '10/11/2022',
    open: true,
    oddHome: 2,
    oddAway: 2,
    oddTie: 3,
};

const MOCK_EVENTS = [MOCK_GAME_OPEN, MOCK_GAME_OPEN2];

const Home: NextPage = () => {
    return (
        <div className="gap-8 h-screen w-screen justify-center flex items-center">
            <div className=" flex flex-col gap-5 items-top min-h-screen w-max">
                {MOCK_EVENTS.map((game) => {
                    console.log(game);
                    return game.open ? (
                        <OpenGameCard
                            key={game.eventName}
                            game={game as OpenGameInfo}
                        />
                    ) : (
                        <GameCardAdmin key={game.eventName} game={game} />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
