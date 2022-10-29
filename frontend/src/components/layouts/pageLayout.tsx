import React from 'react';
import {Box} from '@mui/system';
import {PALETTE} from '../../constants/Palette';
import {Navbar} from '../navbar/Navbar';
import {Navlink} from '../navbar/Navlink';
import {EventCard} from '../cards/EventCard';

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
    // Code a navbar here and return it
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                background: PALETTE.LIGHT_GRAY,
            }}
        >
            <Navbar>
                {navlinksProps.map((props, index) => (
                    <Navlink key={index} {...props} />
                ))}
            </Navbar>

            <Box
                sx={{
                    padding: '2vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '2vw',
                    alignItems: 'center',
                    height: '92.5%', // TODO: Height hardcoded for now
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '2%',
                        width: '45%',
                        height: '100%',
                        //background: PALETTE.WHITE,
                    }}
                />
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'auto',
                        scrollbar: '',

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '2vh',
                    }}
                >
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                    <EventCard name={'Porto - Benfica'} date={new Date()} />
                </Box>
                <Box
                    sx={{
                        borderRadius: '2%',
                        width: '45%',
                        height: '100%',
                        //background: PALETTE.WHITE,
                    }}
                />
            </Box>
        </Box>
    );
};
