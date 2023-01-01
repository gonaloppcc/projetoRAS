import React from 'react';
import '../styles/globals.css';
import {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import toast, {Toaster} from 'react-hot-toast';
import {AxiosError} from 'axios';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            onError: (error) =>
                // TODO: Improve error handling
                toast.error(
                    'Erro de conexão com o servidor. Por favor, tente novamente mais tarde.'
                ),
            retry: 0, // FIXME: For now, we don't want to retry requests
        },
        mutations: {
            onError: (error) => toast.error((error as AxiosError).message),
        },
    },
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
