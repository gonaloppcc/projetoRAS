import {PrimaryButton} from '@components/Button';
import {InputForm} from '@components/createBetter/inputForm';
import React, {useState} from 'react';

export interface UpdateOddProps {
    odd: string;
}

export interface handleChangeProps {
    name: string;
    value: string;
}

export const UpdateOdd = ({odd}: UpdateOddProps) => {
    //const [sportName, setSportName] = useState<string>(sports[0].name);
    const [oddValue, setOddValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (e: handleChangeProps) => {
        //console.log(e);
        setOddValue(e.value);
        //set({...values, [name]: value});
    };

    const submit = () => {
        if (parseInt(oddValue) > 0) {
            console.log('Submit?');
        } else {
            setError('Só números positivos');
        }
    };

    return (
        <div>
            <div className="p-10 flex flex-col gap-2">
                <div className="font-bold text-xl">Alterar Odd: </div>
                <InputForm
                    type="number"
                    name={odd}
                    id={odd}
                    value={oddValue}
                    handleChange={handleChange}
                    error={error}
                />
                <div className="w-fit">
                    <PrimaryButton onClick={submit}>Atualizar</PrimaryButton>
                </div>
            </div>
        </div>
    );
};
