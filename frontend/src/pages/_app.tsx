import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {PageLayout} from '../components/layouts/PageLayout';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
