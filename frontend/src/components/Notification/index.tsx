import React from 'react';
import {Notification as NotificationType} from '@domain/User';
import {formatDate} from '../../utils/formatters';
import {XMarkIcon} from '@heroicons/react/20/solid';

export interface NotificationProps extends NotificationType {
    deleteNotification: () => void;
}

export const Notification = ({
    message,
    date,
    severity,
    deleteNotification,
}: NotificationProps) => {
    return (
        <div className="bg-WHITE flex flex-col justify-between items-center p-4 rounded-md border border-BLACK_SHADOW">
            <div className="w-full flex flex-row gap-2 justify-between">
                <div className="text-lg font-medium leading-none">
                    {message}
                </div>
                <XMarkIcon
                    className="h-6 w-6 cursor-pointer"
                    aria-hidden="true"
                    onClick={deleteNotification}
                />
            </div>
            <div className="w-full flex flex-row justify-between items-center">
                <div className="text-xs text-gray-600 leading-none">
                    {formatDate(date)}
                </div>
            </div>
        </div>
    );
};
