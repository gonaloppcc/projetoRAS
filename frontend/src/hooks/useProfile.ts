import {useProfileState} from '@state/useProfileState';
import React from 'react';

const LOGIN_CREDENTIALS = {
    email: 'marco@gmail.com',
    password: 'marco123',
};

export const useProfile = () => {
    const {login, ...props} = useProfileState();

    // FIXME: This is just for demo purposes
    React.useEffect(() => {
        login(LOGIN_CREDENTIALS.email, LOGIN_CREDENTIALS.password);
        console.log('Login with credentials: ', LOGIN_CREDENTIALS);
    }, []);

    return {...props};
};
