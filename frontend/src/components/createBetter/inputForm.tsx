import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

export const InputForm = (props) => {
    return (
        <div className="py-2">
            <div className="relative z-0">
                <input
                    type={props.htmlFor}
                    name={props.id}
                    id={props.id}
                    value={props.value}
                    onChange={props.handleChange}
                    placeholder={' '}
                    //className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    className={classNames(
                        'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
                        {
                            'border-red-500 border-2': props.error,
                            'border-black border-b-2': !props.error,
                        }
                    )}
                />
                <label
                    htmlFor={props.name}
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    {props.name}
                </label>
                {props.error && (
                    <span className="text-base mt-1 text-red-500">
                        {props.error}
                    </span>
                )}
            </div>
        </div>
    );
};
