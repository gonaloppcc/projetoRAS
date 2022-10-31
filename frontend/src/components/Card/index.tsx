import React from 'react';
import {CardStyles} from './styles';

interface CardProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

export const Card = ({style, children}: CardProps) => {
    return <div style={{...CardStyles, ...style}}>{children}</div>;
};
