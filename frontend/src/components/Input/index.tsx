import React from 'react';

interface InputProps {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = ({type, placeholder, value, onChange}: InputProps) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event.target.value);
    };

    return (
        <input
            type={type}
            className="w-40 bg-LIGHT_GRAY p-2 rounded font-semibold focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
        />
    );
};
