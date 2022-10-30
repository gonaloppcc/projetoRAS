import React from 'react';
import {Property} from 'csstype';
import FlexDirection = Property.FlexDirection;
import JustifyContent = Property.JustifyContent;
import Gap = Property.Gap;
import AlignItems = Property.AlignItems;

export interface FlexProps {
    children: React.ReactNode;
    flexDirection?: FlexDirection;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    gap?: Gap;
    width?: string;
    height?: string;
}

export const Flex = ({
    children,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    width,
    height,
}: FlexProps) => {
    const flexStyles = {
        width: width ?? '100%',
        height: height ?? '100%',
        display: 'flex',
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        gap: gap,
        overflow: 'auto',
    };

    return <div style={flexStyles}>{children}</div>;
};
