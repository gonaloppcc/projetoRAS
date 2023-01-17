import React, {useState} from 'react';
import {PrimaryButton} from '@components/Button';
import {EndGameCard} from '@components/EndGameCard';

export interface OpenGameInfo {
    eventName: string;
    date: string;
    open: boolean;
    oddHome: number;
    oddAway: number;
    oddTie: number;
}

export interface OpenGameCardProps {
    game: OpenGameInfo;
}

export const OpenGameCard = (game: Event) => {
    const initialValues = {
        duration: 0,
        multiplier: 0,
    };
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const submit = () => {
        if (values['duration'] > 0 && values['multiplier'] > 0) {
            setError('');
        } else {
            if (!values['duration']) {
                setError('Duração da promoção obrigatória');
            } else {
                setError('Multiplicador obrigatório');
            }
        }
    };

    return (
        <div className="bg-white flex flex-col gap-3">
            <EndGameCard game={game} />
            <div className="pl-5 pb-3  ">
                <div className="pr-10 m-auto text-xl content-between grow rounded-lg w-full ">
                    {/*FIXME*/}
                    Adicionar Promoção
                </div>
                <div className="flex flex-row gap-2 items-center">
                    {/*FIXME*/}
                    <input
                        type="number"
                        id={'Duração (Horas)'}
                        name={'duration'}
                        className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                        placeholder={'Duração (Horas)'}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        id={'Multiplicador'}
                        name={'multiplier'}
                        className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                        placeholder={'Multiplicador'}
                        onChange={handleChange}
                    />
                    <PrimaryButton onClick={submit}>Confirmar</PrimaryButton>
                    <div className="text-base mt-1 text-IMPERIAL_RED">
                        {error}
                    </div>
                </div>
            </div>
        </div>
    );
};
