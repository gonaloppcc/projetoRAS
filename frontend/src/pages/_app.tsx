import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {PageLayout} from '../components/layouts/PageLayout';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <PageLayout>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps}></Component>
            </QueryClientProvider>
        </PageLayout>
    );
}

export default MyApp;
