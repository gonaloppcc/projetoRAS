import React from 'react';
import {Box} from '@mui/system';
import {Navbar} from '../../Navbar';
import {Navlink} from '../../Navlink';
import {PAGE_BODY_STYLES, PAGE_CHILDREN_STYLES} from './styles';

export interface PageLayoutProps {
    children: React.ReactNode;
}

const navlinksProps = [
    {
        name: 'Desporto',
        href: '/',
        isActive: true,
    },
    {
        name: 'Promoções',
        href: '/',
    },
];

export const PageLayout = ({children}: PageLayoutProps) => {
    return (
        <Box sx={PAGE_BODY_STYLES}>
            <Navbar>
                {navlinksProps.map((props, index) => (
                    <Navlink key={index} {...props} />
                ))}
            </Navbar>
            <Box sx={PAGE_CHILDREN_STYLES}>{children}</Box>
        </Box>
    );
};
