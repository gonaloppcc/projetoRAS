import {ClassNames} from '@emotion/react';
import {ErrorSharp} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {SuspendedGameCard} from '../SuspendedGameCard';

export const OpenGameCard = (props) => {
    const inputBox = (placeholder) => {
        return (
            <input
                type="number"
                id={placeholder}
                className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                placeholder={placeholder}
            ></input>
        );
    };
    const button = (text) => {
        return (
            <button className="bg-yellow-500 font-bold py-3 px-2 grow-0 rounded ">
                {text}
            </button>
        );
    };

    return (
        <div className="bg-white flex flex-col gap-3">
            <SuspendedGameCard game={props.game} />
            <div className="pl-5 pb-3  ">
                <div className="pr-10 m-auto text-xl content-between grow rounded-lg w-full ">
                    {/*FIXME*/}
                    Adicionar Promoção
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*FIXME*/}
                    {inputBox('Duração (Horas)')}
                    {inputBox('Multiplicador')}
                    {button('Confirmar')}
                </div>
            </div>
        </div>
    );
};
