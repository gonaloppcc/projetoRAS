import React, {Fragment, ReactNode} from 'react';
import {Menu, Transition} from '@headlessui/react';
import classNames from 'classnames';

export interface DropdownAction {
    name: string;
    onClick: () => void;
}

export interface DropdownProps {
    children?: ReactNode;
    actions: DropdownAction[];
}

export const Dropdown = ({children, actions}: DropdownProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>{children}</Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {actions.map((action) => (
                            <Menu.Item key={action.name}>
                                {({active}) => (
                                    <button
                                        onClick={action.onClick}
                                        className={classNames(
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'w-full block px-4 py-2 text-sm text-start'
                                        )}
                                    >
                                        {action.name}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
