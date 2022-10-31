import type {NextPage} from 'next';
import Head from 'next/head';
import {Box, CircularProgress} from '@mui/material';
import {EventCard} from '../components/cards/EventCard';
import {useEvents} from '../hooks/useEvents';
import {Report} from '../components/Report';
import {Flex} from '../components/Flex';

const Home: NextPage = () => {
    const {isSuccess, isLoading, events, isError, error} = useEvents();

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
                {isLoading && (
                    <Flex justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Flex>
                )}
                {isSuccess &&
                    events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
            </Flex>
            <Flex width="45%">
                <Report />
            </Flex>
        </>
    );
};

export default Home;
