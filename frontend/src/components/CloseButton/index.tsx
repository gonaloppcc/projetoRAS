import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material';

interface CloseButtonProps {
    onClick?: () => void;
}

export const CloseButton = ({onClick}: CloseButtonProps) => {
    return (
        <div style={{height: '100%'}}>
            <IconButton onClick={onClick} disableRipple>
                <CloseIcon fontSize="small" sx={{cursor: 'pointer'}} />
            </IconButton>
        </div>
    );
};
