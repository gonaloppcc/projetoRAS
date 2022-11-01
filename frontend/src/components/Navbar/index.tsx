import React from 'react';
import {Box} from '@mui/system';
import {layoutStyle, navlinksStyle, profileNavbarStyle} from './styles';
import {Balance} from '../Balance';
import Link from 'next/link';
import {Avatar} from '../Avatar';
import NotesIcon from '@mui/icons-material/Notes';
import {Flex} from '../Flex';

export interface NavbarProps {
    children?: React.ReactNode;
}

const betsUrl = '/bets';

export const Navbar = ({children: navlinks}: NavbarProps) => {
    const money = 100;

    return (
        <Box sx={layoutStyle}>
            <Box sx={navlinksStyle}>{navlinks}</Box>
            <Box sx={profileNavbarStyle}>
                <Balance money={money} />
                <Link href={betsUrl}>
                    <a>
                        <Flex alignItems="center" gap="0.2vw">
                            <NotesIcon />
                            Apostas
                        </Flex>
                    </a>
                </Link>
                <Avatar name="Marco"></Avatar>
            </Box>
        </Box>
    );
};
