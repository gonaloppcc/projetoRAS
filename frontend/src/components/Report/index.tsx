import React from 'react';
import {Card} from '@mui/material';

export const Report = () => {
    return (
        <Card
            sx={{
                borderRadius: '2%',
                background: 'white',
                height: '100%',
                width: '100%',
                padding: '2vh',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        >
            Boletim
        </Card>
    );
};
