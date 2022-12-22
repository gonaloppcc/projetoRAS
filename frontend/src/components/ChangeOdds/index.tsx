import React, {useState} from 'react';
import {SuspendedGameCard} from '../SuspendedGameCard';

export interface ChangeOddsProps {
    homeOdd: number;
    tieOdd: number;
    awayOdd: number;
}
export interface ChangeOdds {
    home: number;
    tie: number;
    away: number;
}
export const ChangeOdds = ({homeOdd, tieOdd, awayOdd}: ChangeOddsProps) => {
    const initialValues = {
        home: homeOdd,
        tie: tieOdd,
        away: awayOdd,
    };
    const [values, setValues] = useState<ChangeOdds>(initialValues);

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(e.target);
        setValues({...values, [name]: value});
    };

    const inputBox = (name: string, value: number) => {
        return (
            <div>
                {`Odd ${name}: `}
                <input
                    type="number"
                    id={name}
                    name={name}
                    className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                    onChange={handleChange}
                    value={value}
                ></input>
            </div>
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

    const submit = () => {};

    return (
        <div className="bg-white flex flex-col gap-3">
            {inputBox('Home odd', values.home)}
            {inputBox('Tie odd', values.tie)}
            {inputBox('Away odd', values.away)}
            <Button text={'Confirmar'} onCLick={submit} />
        </div>
    );
};
