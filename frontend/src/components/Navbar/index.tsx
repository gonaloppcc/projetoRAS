import React from 'react';
import Image from 'next/image';
import {Navlink} from '@components/Navlink';
import Link from 'next/link';

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

const BALANCE = 100; // FIXME: This should be the user's balance

export const Navbar = () => {
    return (
        <div className="hidden md:flex flex-row justify-between items-center px-8 h-12 gap-3 bg-IMPERIAL_RED">
            <div className="h-full flex flex-row items-center gap-8">
                <Image src={'/logo.png'} width={50} height={50} />
                <div className="h-full flex flex-row ">
                    {navlinks.map((navlink) => (
                        <Navlink key={navlink.name} {...navlink} />
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-end items-center p-0 gap-12">
                <span className="text-WHITE rounded-2xl bg-RUBY_RED px-4 py-2">
                    {BALANCE} €
                </span>

                <Link href="better/bets" className="text-WHITE">
                    {'Apostas' /* FIXME Hardcoded for now */}
                </Link>
                <div className="flex flex-row items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-LIGHT_GRAY" />
                    <span className="text-WHITE">
                        {'Marco Costa' /* FIXME Hardcoded for now */}
                    </span>
                </div>
            </div>
        </div>
    );
};
