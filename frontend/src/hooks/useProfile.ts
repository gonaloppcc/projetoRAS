import {useProfileState} from '@state/useProfileState';
import React from 'react';
export const useProfile = () => {
    const {login, ...props} = useProfileState();

    // FIXME: This is just for demo purposes
    React.useEffect(() => {}, []);

    return {...props};
};
