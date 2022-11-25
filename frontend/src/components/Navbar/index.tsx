import React from 'react';
import Image from 'next/image';
import {Navlink} from '@components/Navlink';

const navlinks = [
    {
        name: 'Desporto', // FIXME: Name is in portuguese, needs to be generic
        href: '/', // FIXME: Change this href to the sports page
        isActive: false, // FIXME Change this to true if the current page is the sports page
    },
    {
        name: 'Promoções', // FIXME: Same as above
        href: '/',
        isActive: true,
    },
];

export const Navbar = () => {
    return (
        <div className="hidden md:flex flex-row justify-between items-center px-8 h-12 gap-3 bg-IMPERIAL_RED ">
            <div className="flex flex-row items-center gap-8">
                <Image src={'/logo.png'} width={50} height={50} />
                <div className="h-full flex flex-row ">
                    {navlinks.map((navlink) => (
                        <Navlink key={navlink.name} {...navlink} />
                    ))}
                </div>
            </div>
        </div>
    );
};
