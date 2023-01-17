import React from 'react';

export interface SuspendedGameInfo {
    eventName: string;
    date: string;
    open: boolean;
}

export interface SuspendedGameCardProps {
    game: SuspendedGameInfo;
}

export const EndGameCard = ({game}: SuspendedGameCardProps) => {
    console.log(game);
    const column = (header: string, body: string) => {
        return (
            <div className=" m-3 p-3 rounded-lg w-full">
                <div className="flex flex-col gap-1  pl-3">
                    <div className="text-sm text-zinc-500 font-light">AAA</div>
                    <div className="  font-medium">Body</div>
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

    const openBet = () => {};

    const closeBet = () => {};

    return (
        <>
            <div className=" bg-white px-5 rounded flex flex-row w-full">
                <div className="pr-5 m-auto text-xl content-between grow rounded-lg w-full">
                    {game.eventName}
                </div>
                {/*FIXME*/}
                {column('Data', game.date)}
                {column('Estado', 'Fechado')}
                <div className=" bg-white rounded flex flex-row items-center gap-2">
                    {button('Abrir', openBet)}
                    {button('Fechar', closeBet)}
                </div>
            </div>
        </>
    );
};
