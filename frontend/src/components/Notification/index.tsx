import React from 'react';
import {Notification as NotificationType} from '@domain/User';
import {formatDate} from '../../utils/formatters';

export type NotificationProps = NotificationType;

export const Notification = ({message, date, severity}: NotificationProps) => {
    return (
        <div className="bg-WHITE flex flex-row justify-between items-center p-4 rounded-md border border-BLACK_SHADOW">
            <div className="flex flex-col gap-2">
                <div className="text-lg font-medium leading-none">
                    {message}
                </div>
                <div className="text-xs text-gray-600 leading-none">
                    {formatDate(date)}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="text-sm text-gray-500">{severity}</div>
            </div>
        </div>
    );
};
