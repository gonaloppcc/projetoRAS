import type {NextPage} from 'next';
import Head from 'next/head';
import {Box} from '@mui/system';
import {BetStatusCard} from '../components/cards/BetStatusCard';
import {useEvents} from '../hooks/useEvents';

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
                    alignContent: 'center',
                    //background: PALETTE.WHITE,
                }}
            />
            <Box
                sx={{
                    paddingX: '5vw',
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
                    events
                        .filter((event) => event.completed)
                        .map((event) => {
                            console.log(event);
                            return <BetStatusCard key={event.id} {...event} />;
                        })}
            </Box>
        </>
    );
};

export default Home;
