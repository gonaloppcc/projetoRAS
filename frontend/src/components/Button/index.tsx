import React from 'react';
import {BUTTON_STYLES} from './styles';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({children, onClick}: ButtonProps) => {
    return (
        <button style={BUTTON_STYLES} onClick={onClick}>
            {children}
        </button>
    );
};
