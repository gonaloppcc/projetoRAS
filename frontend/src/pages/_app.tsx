import React from 'react';
import '../styles/globals.css';
import {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from 'react-hot-toast';

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
