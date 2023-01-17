import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useProfile} from '@state/useProfile';
import {Notification} from '@domain/User';
import {getNotifications} from '../services/backend/user';

export const useNotification = () => {
    const {id: userId} = useProfile();

    const {
        isSuccess,
        isLoading,
        isError,
        data: notifications,
        error,
        refetch,
    } = useQuery(['notifications', userId], () => getNotifications(userId));

    return {
        isSuccess,
        isLoading,
        isError,
        notifications: (notifications || []) as Notification[],
        error: error as AxiosError,
        refetch,
    };
};
