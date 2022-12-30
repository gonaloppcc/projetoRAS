import React, {useState} from 'react';
import {TertiaryButton} from '@components/Button';

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

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    };

    const submit = () => {
        // TODO: submit to backend
    };

    return (
        <div className="bg-white flex flex-col gap-3">
            <div>
                {`Odd ${'Home odd'}: `}
                <input
                    type="number"
                    id={'Home odd'}
                    name={'Home odd'}
                    className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                    onChange={handleChange}
                    value={values.home}
                ></input>
            </div>
            <div>
                {`Odd ${'Tie odd'}: `}
                <input
                    type="number"
                    id={'Tie odd'}
                    name={'Tie odd'}
                    className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                    onChange={handleChange}
                    value={values.tie}
                ></input>
            </div>
            <div>
                {`Odd ${'Away odd'}: `}
                <input
                    type="number"
                    id={'Away odd'}
                    name={'Away odd'}
                    className=" border-gray-500 py-1 text-sm border-2 text-gray-900 "
                    onChange={handleChange}
                    value={values.away}
                ></input>
            </div>
            <TertiaryButton onClick={submit}> Confirmar </TertiaryButton>
        </div>
    );
};
