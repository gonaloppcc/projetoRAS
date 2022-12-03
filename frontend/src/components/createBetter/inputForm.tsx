import React from 'react';
import classNames from 'classnames';

export interface HandleChangeProps {
    name: string;
    value: string;
}

interface InputFormProps {
    type: string;
    name: string;
    id: string;
    placeholder?: string;
    handleChange?: (props: HandleChangeProps) => void;
    value: string;
    error: string;
}

export const InputForm = ({
    type,
    name,
    id,
    placeholder,
    handleChange,
    value,
    error,
}: InputFormProps) => {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (handleChange) {
            handleChange({name: e.target.name, value: e.target.value});
        }
    };

    return (
        <div className="py-2">
            <label
                htmlFor={name}
                className="text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {name}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={classNames(
                    'block py-2 px-2 w-full text-sm text-black bg-CULTURED border focus:outline-none focus:ring-0 focus:border-LIGHT_GRAY'
                )}
            />
            {error && (
                <span className="text-base mt-1 text-IMPERIAL_RED">
                    {error}
                </span>
            )}
        </div>
    );
};
