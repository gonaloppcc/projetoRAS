import React from 'react';
import FlexDirection = Property.FlexDirection;
import JustifyContent = Property.JustifyContent;
import Gap = Property.Gap;

export interface FlexProps {
    children: React.ReactNode;
    flexDirection?: FlexDirection;
    justifyContent?: JustifyContent;
    gap?: Gap;
    width?: string;
    height?: string;
    background?: string;
}

export const Flex = ({
    children,
    flexDirection,
    justifyContent,
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
        gap: gap,
        overflow: 'auto',
        background: background,
    };

    return <div style={flexStyles}>{children}</div>;
};
