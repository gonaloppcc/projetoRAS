import React from 'react';
import {INPUT_STYLES} from './styles';

interface InputProps {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const Input = ({label, value, onChange}: InputProps) => {
    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <input
            style={INPUT_STYLES}
            value={value}
            onChange={onChangeHandler}
            placeholder={label}
        ></input>
    );
};
