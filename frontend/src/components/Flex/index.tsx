import React from 'react';
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
    background?: string;
}

export const Flex = ({
    children,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    width,
    height,
    background,
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
        background: background,
    };

    return <div style={flexStyles}>{children}</div>;
};
