import React from 'react';
import {Box} from '@mui/system';
import {layoutStyle, navlinksStyle, profileNavbarStyle} from './styles';
import {Balance} from '../Balance';
import Link from 'next/link';
import {Avatar} from '../Avatar';

export interface NavbarProps {
    children?: React.ReactNode;
}

export const Navbar = ({children: navlinks}: NavbarProps) => {
    return (
        <Box sx={layoutStyle}>
            <Box sx={navlinksStyle}>{navlinks}</Box>
            <Box sx={profileNavbarStyle}>
                <Balance />
                <Link href="/bets" /* TODO: Hardcoded endpoint for now*/>
                    Apostas
                </Link>
                <Avatar name="Marco"></Avatar>
            </Box>
        </Box>
    );
};
