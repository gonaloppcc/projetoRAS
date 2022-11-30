import React from 'react';
import classNames from 'classnames';

export interface TabProps {
    name: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const Tab = ({name, isActive, onClick}: TabProps) => {
    return (
        <div
            onClick={onClick}
            className={classNames({
                'p-2 border-RICH_BLACK cursor-pointer': true,
                'border-b-2': isActive,
            })}
        >
            {name}
        </div>
    );
};
