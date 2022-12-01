import {ClassNames} from '@emotion/react';
import {ErrorSharp} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';

export const SuspendedGameCard = (props) => {
    const column = (header, body) => {
        return (
            <>
                <div className=" m-3 p-3 rounded-lg w-full">
                    <div className="flex flex-col gap-1  pl-3">
                        <div className="text-sm text-zinc-500 font-light">
                            {header}
                        </div>
                        <div className="  font-medium">{body}</div>
                    </div>
                </div>
            </>
        );
    };

    const button = (text) => {
        return (
            <>
                <button className="bg-yellow-500 font-bold py-3 px-2 grow-0 rounded ">
                    {text}
                </button>
            </>
        );
    };

    return (
        <>
            <div className=" bg-white px-5 rounded flex items-stretch flex-row w-full">
                <div className="pr-10 m-auto text-xl content-between grow rounded-lg w-full">
                    {props.game.eventName}
                </div>
                {/*FIXME*/}
                {column('Data', props.game.date)}
                {column('Estado', 'Aberto')}
                <div className=" bg-white rounded flex flex-row items-center gap-2">
                    {button('Suspender')}
                    {button('Fechar')}
                </div>
            </div>
        </>
    );
};
