import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface CloseButtonProps {
    onClick?: () => void;
}

export const CloseButton = ({onClick}: CloseButtonProps) => {
    return (
        <div onClick={onClick} className="text-base cursor-pointer">
            <CloseIcon />
        </div>
    );
};
