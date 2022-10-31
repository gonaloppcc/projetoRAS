import React from 'react';
import {Odd} from '../../../types/Event';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import {Flex} from '../../Flex';
import {Card} from '../../Card';
import {CloseButton} from '../../CloseButton';

export interface BetCardProps {
    odd: Odd;
    event: string;
    removeHandler?: () => void;
}

export const BetCard = ({
    odd: {name, price},
    event,
    removeHandler,
}: BetCardProps) => {
    const priceFormatted = price.toFixed(2);

    return (
        <Card style={{height: '25%'}}>
            <Flex
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                gap="1vw"
            >
                <SportsSoccerIcon />
                <Flex
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <span style={{fontWeight: 700}}>{name}</span>
                    <span style={{fontWeight: 300, fontSize: '14px'}}>
                        {event}
                    </span>
                </Flex>
            </Flex>
            <Flex
                justifyContent="flex-end"
                alignItems="center"
                gap="2vw"
                width="50%"
            >
                <span>{priceFormatted}</span>
            </Flex>
            <CloseButton onClick={removeHandler} />
        </Card>
    );
};
