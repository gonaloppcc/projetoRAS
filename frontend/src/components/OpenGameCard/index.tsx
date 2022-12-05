import {ClassNames} from '@emotion/react';
import {ErrorSharp} from '@mui/icons-material';
import {duration} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {InputForm} from '../createBetter/inputForm';
import {SuspendedGameCard} from '../SuspendedGameCard';

export const OpenGameCard = (props) => {
    const initialValues = {
        duration: 0,
        multiplier: 0,
    };
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const inputBox = (placeholder, name) => {
        return (
            <input
                type="number"
                id={placeholder}
                name={name}
                className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                placeholder={placeholder}
                onChange={handleChange}
            ></input>
        );
    };

    const Button = ({text, onCLick}) => {
        return (
            <button
                onClick={onCLick}
                className="bg-yellow-500 font-bold py-3 px-2 grow-0 rounded "
            >
                {text}
            </button>
        );
    };

    const submit = () => {
        if (values['duration'] > 0 && values['multiplier'] > 0) {
            setError('');
            console.log('Submter correto');
            console.log('Duration: ', values['duration']);
            console.log(values['multiplier']);
        } else {
            if (values['duration'] === undefined) {
                setError('Duração da promoção obrigatória');
            } else {
                setError('Multiplicador obrigatório');
            }
        }
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
                    {inputBox('Duração (Horas)', 'duration')}
                    {inputBox('Multiplicador', 'multiplier')}
                    <Button text={'Confirmar'} onCLick={submit} />
                    {
                        <div className="text-base mt-1 text-IMPERIAL_RED">
                            {error}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
