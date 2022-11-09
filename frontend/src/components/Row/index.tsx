import React from 'react';
import {Flex} from '../Flex';

interface RowProps {
    children: React.ReactNode;
}

export const Row = ({children}: RowProps) => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
        >
            {children}
        </Flex>
    );
};
