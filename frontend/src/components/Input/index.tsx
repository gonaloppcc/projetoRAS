import React from 'react';

interface InputProps {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    suffix?: string;
}

export const Input = ({
    type,
    placeholder,
    value,
    onChange,
    suffix,
}: InputProps) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event.target.value);
    };

    return (
        <div className="w-40 flex flex-row bg-LIGHT_GRAY p-2 rounded font-semibold">
            <input
                className="bg-inherit w-full focus:outline-none"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
            />
            {suffix}
        </div>
    );
};
