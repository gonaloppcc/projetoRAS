import React, {useState} from 'react';
import {EventReceived} from '@domain/Event';
import {Modal} from '@components/Modal';
import {SetResult} from './setResult';

export interface GameCardAdminProps {
    game: EventReceived;
    sport: string;
}

export const GameCardAdmin = (game: GameCardAdminProps) => {
    const [open, setOpen] = useState(false);
    const column = (header: string, body: string) => {
        return (
            <div className=" m-3 p-3 rounded-lg w-full">
                <div className="flex flex-col gap-1  pl-3">
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
                className="bg-yellow-500 font-bold py-3 px-2 grow-0 rounded w-full "
            >
                {text}
            </button>
        );
    };

    const closeGame = () => {
        setOpen(true);
    };

    const homeTeam = game.game.participants.home.participant.participantName
        ? game.game.participants.home.participant.participantName
        : 'Home Team';
    const awayTeam = game.game.participants.away.participant.participantName
        ? game.game.participants.away.participant.participantName
        : 'Away Team';
    const date = game.game.date.split('T')[0];
    const completed = game.game.completed;

    return (
        <>
            {open && (
                <Modal isOpen={open} setIsOpen={setOpen}>
                    <SetResult game={game.game} sport={game.sport} />
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
                <div className=" bg-white rounded flex flex-row items-center ">
                    {!completed && button('Fechar jogo', closeGame)}
                    {completed &&
                        column(
                            'Resultado:',
                            `${game.game.participants.home.score}-${game.game.participants.away.score}`
                        )}
                </div>
            </div>
        </>
    );
};
