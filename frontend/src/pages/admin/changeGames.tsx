import type {NextPage} from 'next';
import {SuspendedGameCard} from '../../components/SuspendedGameCard';
import {OpenGameCard} from '../../components/OpenGameCard';
// FIXME
/* FIXME Mock data hardcoded */
const MOCK_GAME_OPEN = {
    eventName: 'Porto - Benfica',
    date: '10/11/2022',
    open: true,
};
const MOCK_GAME_OPEN2 = {
    eventName: 'Nome comprido - Outro nome grande',
    date: '10/11/2022',
    open: true,
};
const MOCK_GAME_SUSPENDED2 = {
    eventName: 'Nome comprido - Outro nome grande2',
    date: '10/11/2022',
    open: false,
};
const MOCK_GAME_SUSPENDED = {
    eventName: 'Porto - Benfica2',
    date: '10/11/2022',
    open: false,
};
const MOCK_EVENTS = [
    MOCK_GAME_OPEN,
    MOCK_GAME_SUSPENDED,
    MOCK_GAME_OPEN2,
    MOCK_GAME_SUSPENDED2,
];

const Home: NextPage = () => {
    return (
        <div className="gap-8 h-screen w-screen justify-center flex items-center bg-CULTURED">
            <div className=" flex flex-col gap-5 items-top pt-10  min-h-screen w-max  ">
                <div className="bg-white h-fit pl-5  text-xl inline-block py-2 ">
                    {/* TODO: Alterar*/}
                    JOGOS
                </div>
                {MOCK_EVENTS.map((game) =>
                    game.open ? (
                        <OpenGameCard key={game.eventName} game={game} />
                    ) : (
                        <SuspendedGameCard key={game.eventName} game={game} />
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
