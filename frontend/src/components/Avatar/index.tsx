import React from 'react';
import {Avatar as AvatarMUI} from '@mui/material';

interface AvatarProps {
    src?: string;
    children?: React.ReactNode;
}

export const Avatar = ({src, children}: AvatarProps) => {
    return (
        <AvatarMUI className="bg-EERIE_BLACK" src={src}>
            {children}
        </AvatarMUI>
    );
};
