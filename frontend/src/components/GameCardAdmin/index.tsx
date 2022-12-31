import React, {useState} from 'react';
import {EventMini} from '@domain/Event';
import {Modal} from '@components/Modal';
import {SetResult} from './setResult';

export interface GameCardAdminProps {
    game: EventMini;
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

    const openBet = () => {
        setOpen(true);
    };

    const homeTeam = game.game.participants.home.participant.participantName
        ? game.game.participants.home.participant.participantName
        : '???';
    const awayTeam = game.game.participants.away.participant.participantName
        ? game.game.participants.away.participant.participantName
        : '???';
    const date = game.game.date.split('T')[0];

    return (
        <>
            {open && (
                <Modal isOpen={open} setIsOpen={setOpen}>
                    <SetResult game={game.game} />
                </Modal>
            )}
            <div className=" bg-white px-5 rounded flex flex-row w-full">
                <div className="pr-5 m-auto text-xl content-between grow rounded-lg w-full">
                    {`${homeTeam}-${awayTeam}`}
                </div>
                {/*FIXME*/}
                {column('Data', date)}
                {column('Estado', 'Fechado')}
                <div className=" bg-white rounded flex flex-row items-center ">
                    {button('Definir odd', openBet)}
                </div>
            </div>
        </>
    );
};
