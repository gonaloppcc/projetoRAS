import React from 'react';
import {SlideOver} from '@components/SlideOver';
import {useNotification} from '@hooks/useNotification';
import {Notification} from '@components/Notification';
import classNames from 'classnames';

export interface NotificationProps {
    open: boolean;
    setOpen: (state: boolean) => void;
}

export const Notifications = ({open, setOpen}: NotificationProps) => {
    const {isLoading, isError, isSuccess, notifications, refetch} =
        useNotification();

    const slideTitle = (
        <span className="flex flex-row gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={classNames(
                    'w-6 h-6 cursor-pointer hover:text-BLACK_SHADOW select-none'
                )}
                onClick={() => refetch()}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
            </svg>
            Notificações
        </span>
    );

    return (
        <SlideOver title={slideTitle} open={open} setOpen={setOpen}>
            {isLoading && <div>A carregar notificações...</div>}
            {isError && <div>Erro ao carregar notificações</div>}
            {isSuccess && (
                <div className="flex flex-col gap-4">
                    {notifications.map((notification) => (
                        <Notification key={notification.id} {...notification} />
                    ))}
                </div>
            )}
        </SlideOver>
    );
};
