import React from 'react';
import Image from 'next/image';

export const Navbar = () => {
    return (
        <div className="hidden md:flex flex-row justify-between items-center px-8 h-12 gap-3 bg-IMPERIAL_RED ">
            <div className="flex flex-row items-center">
                <Image src={'/logo.png'} width={50} height={50} />
            </div>
            <div></div>
        </div>
    );
};
