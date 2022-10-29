import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {PageLayout} from '../components/layouts/pageLayout';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <PageLayout>
            <Component {...pageProps}></Component>
        </PageLayout>
    );
}

export default MyApp;
