import type {NextPage} from 'next';
import Head from 'next/head';
import {Box} from '@mui/material';
import {EventCard} from '../components/cards/EventCard';
import {useEvents} from '../hooks/useEvents';
import {Report} from '../components/Report';
import {BetCard} from '../components/cards/BetCard';
import {Flex} from '../components/Flex';
import {useReport} from '../hooks/useReport';

const Home: NextPage = () => {
    const {isSuccess, isLoading, events, isError, error} = useEvents();
    const {bets} = useReport();

    return (
        <>
            <Head>
                <title>RASBET</title>
                <meta
                    name="description"
                    content="Conteudo fornedido pela RASBET"
                />
                <link rel="icon" href="/logo.png" />
            </Head>

            <Box
                sx={{
                    borderRadius: '2%',
                    height: '100%',
                    width: '45%',
                    //background: PALETTE.WHITE,
                }}
            />
            <Flex flexDirection="column" justifyContent="flex-start" gap="2vh">
                {isError && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {isSuccess &&
                    events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
            </Flex>
            <Flex width="45%">
                <Report>
                    {bets.map((bet, index) => (
                        <BetCard
                            key={index}
                            /* FIXME Key shouldn't be the index */ odd={bet.odd}
                            event={bet.eventName}
                        />
                    ))}
                </Report>
            </Flex>
        </>
    );
};

export default Home;
