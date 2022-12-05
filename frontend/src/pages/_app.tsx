import React from 'react';
import '../styles/globals.css';
import {useRouter} from 'next/router';
import {IntlProvider} from 'react-intl';
import {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import pt from '../../public/locales/pt/common.json';
import en from '../../public/locales/en/common.json';

const queryClient = new QueryClient();

import '../styles/globals.css';

const messages = {
    pt,
    en,
};

function getDirection(locale) {
    if (locale === 'ar') {
        return 'rtl';
    }
    return 'ltr';
}

function MyApp({Component, pageProps}: AppProps) {
    const {locale} = useRouter();
    return (
        <QueryClientProvider client={queryClient}>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <Component {...pageProps} />
            </IntlProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
