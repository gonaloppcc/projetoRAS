import React from 'react';
import {Box} from '@mui/system';
import {PALETTE} from '../../constants/Palette';

interface Props {
    children?: React.ReactNode;
}

const layoutStyle = {
    paddingX: '2vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '7.5%',
    background: PALETTE.IMPERIAL_RED,
};

const navlinksStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
};

const profileNavbarStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
};

export const Navbar = ({children: navlinks}: Props) => {
    return (
        <Box sx={layoutStyle}>
            <Box sx={navlinksStyle}>{navlinks}</Box>
            <Box sx={profileNavbarStyle}>Profile Stuff</Box>
        </Box>
    );
};
