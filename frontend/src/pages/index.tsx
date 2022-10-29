import type {NextPage} from 'next';
import Head from 'next/head';
import {Box} from '@mui/system';
import {EventCard} from '../components/cards/EventCard';
import {useEvents} from '../hooks/useEvents';
import {PALETTE} from '../constants/Palette';
import {Report} from '../components/Report';

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
                    background: PALETTE.WHITE,
                }}
            />
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    scrollbar: '',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: '2vh',
                }}
            >
                {isError && <div>{error}</div>}
                {isLoading && <div>Loading...</div>}
                {isSuccess &&
                    events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
            </Box>
            <Box
                sx={{
                    width: '45%',
                    height: '100%',
                }}
            >
                <Report />
            </Box>
        </>
    );
};

export default Home;
