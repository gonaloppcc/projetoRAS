import React, {useState} from 'react';
import {Modal} from '@components/Modal';
import {SetResult} from './setResult';
import {EventReceived} from '../../services/backend/event';

export interface GameCardAdminProps {
    game: EventReceived;
    sport: string;
    textButton: string;
    textPropsUp: string;
    textSucess: string;
    resultOrOdd: boolean;
    textSet: string;
}

export const GameCardAdmin = ({
    game,
    sport,
    textButton,
    textPropsUp,
    textSucess,
    resultOrOdd,
    textSet,
}: GameCardAdminProps) => {
    const [open, setOpen] = useState(false);
    const column = (header: string, body: string) => {
        return (
            <div className=" m-3 p-3 rounded-lg w-full">
                <div className="flex  flex-col gap-1  pl-3">
                    <div className="text-sm text-zinc-500 font-light">
                        {header}
                    </div>
                    <div className="  font-medium">{body}</div>
                </div>
            </div>
        );
    };

    const button = (text: string, onClick: () => void) => {
        return (
            <button
                onClick={onClick}
                className="bg-yellow-500 font-bold p-3 grow-0 rounded w-full "
            >
                {text}
            </button>
        );
    };

    const closeGame = () => {
        setOpen(true);
    };

    const homeTeam = game.participants.home.participant.participantName
        ? game.participants.home.participant.participantName
        : 'Home Team';
    const awayTeam = game.participants.away.participant.participantName
        ? game.participants.away.participant.participantName
        : 'Away Team';
    const oddHome = game.participants.home.participant.price;
    const oddAway = game.participants.away.participant.price;
    const oddTie = game.participants.tie.price;
    const date = game.date.split('T')[0];
    const completed = game.completed;

    return (
        <>
            {open && (
                <Modal isOpen={open} setIsOpen={setOpen}>
                    <SetResult
                        game={game}
                        sport={sport}
                        textPropsUp={textPropsUp}
                        textSucess={textSucess}
                        resultOrOdd={resultOrOdd}
                        textSet={textSet}
                    />
                </Modal>
            )}
            <div className=" bg-white px-5 rounded flex flex-row w-full">
                <div className="pr-5 m-auto text-xl content-between grow rounded-lg w-full">
                    {`${homeTeam}-${awayTeam}`}
                </div>
                {/*FIXME*/}
                {column('Data', date)}
                {completed
                    ? column('Estado', 'Fechado')
                    : column('Estado', 'Aberto')}
                {!resultOrOdd &&
                    column(
                        'Odd casa-empate-fora',
                        `${oddHome}-${oddTie}-${oddAway}`
                    )}
                <div className=" bg-white rounded flex flex-row items-center ">
                    {!completed && button(textButton, closeGame)}
                    {completed &&
                        column(
                            'Resultado:',
                            `${game.participants.home.score}-${game.participants.away.score}`
                        )}
                </div>
            </div>
        </>
    );
};
