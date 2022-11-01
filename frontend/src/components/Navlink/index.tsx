import React from 'react';
import Link from 'next/link';
import {UrlObject} from 'url';
import {PALETTE} from '../../constants/PALETTE';
import {NAVLINK_STYLES} from './styles';

export interface NavlinkProps {
    name: string;
    href: string | UrlObject;
    isActive?: boolean;
}

export const Navlink = ({name, href, isActive}: NavlinkProps) => {
    const isActiveStyle = isActive
        ? {
              background: isActive ? PALETTE.RUBY_RED : PALETTE.CARNELIAN,
              opacity: isActive ? 1 : 0.8,
          }
        : undefined;

    return (
        <div style={{...NAVLINK_STYLES, ...isActiveStyle}}>
            <Link href={href}>{name}</Link>
        </div>
    );
};
