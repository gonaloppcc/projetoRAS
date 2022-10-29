import React from 'react';
import Link from 'next/link';
import {UrlObject} from 'url';
import {PALETTE} from '../../constants/Palette';

export interface NavlinkProps {
    name: string;
    href: string | UrlObject;
    isActive?: boolean;
}

export const Navlink = ({name, href, isActive}: NavlinkProps) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '1vw',
                background: isActive ? PALETTE.RUBY_RED : PALETTE.CARNELIAN,
                color: PALETTE.WHITE,
                opacity: isActive ? 1 : 0.8,
            }}
        >
            <Link href={href}>{name}</Link>
        </div>
    );
};
