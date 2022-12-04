import {useRouter} from 'next/router';
import {IntlProvider} from 'react-intl';

import pt from '../../public/locales/pt/common.json';
import en from '../../public/locales/en/common.json';

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

function MyApp({Component, pageProps}) {
    const {locale} = useRouter();

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Component {...pageProps} dir={getDirection(locale)} />
        </IntlProvider>
    );
}

export default MyApp;
