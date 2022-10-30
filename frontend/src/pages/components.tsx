import React from 'react';
import {Report} from '../components/Report';
import {BetCard} from '../components/cards/BetCard';
import {Flex} from '../components/Flex';
import {useReport} from '../hooks/useReport';

const Components = () => {
    const {bets} = useReport();

    return (
        <Flex flexDirection="row" justifyContent="flex-end" gap="2vw">
            <Report>
                {bets.map((bet, index) => (
                    <BetCard
                        key={index}
                        /* FIXME Key shouldn't be the index */ odd={bet.odd}
                        event={bet.eventName}
                    />
                ))}
            </Report>
        </Flex>
    );
};

export default Components;
