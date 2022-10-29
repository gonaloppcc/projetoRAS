import React from 'react';
import {Avatar as MuiAvatar} from '@mui/material';
import {Box} from '@mui/system';
import {PALETTE} from '../../constants/Palette';

export interface AvatarProps {
    name: string;
    profileImage?: string;
}

export const Avatar = ({name, profileImage}: AvatarProps) => {
    const firstLetter = name.charAt(0);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5vw',
            }}
        >
            <MuiAvatar src={profileImage} sx={{bgcolor: PALETTE.RUBY_RED}}>
                {firstLetter}
            </MuiAvatar>
            {name}
        </Box>
    );
};
