import React from 'react';
import classNames from 'classnames';
import {useRouter} from 'next/router';

export interface NavlinkProps {
    name: string;
    href: string;
    isActive?: boolean;
}

export const Navlink = ({name, href, isActive}: NavlinkProps) => {
    const router = useRouter();

    const onClickHandler = async () => {
        await router.push(href);
    };

    return (
        <div
            className={classNames(
                'flex flex-row items-start p-4 gap-2 h-full text-WHITE cursor-pointer',
                {
                    'bg-CARNELIAN': isActive,
                }
            )}
            onClick={onClickHandler}
        >
            {name}
        </div>
    );
};
