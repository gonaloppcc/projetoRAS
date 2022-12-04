import {PrimaryButton} from '@components/Button';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import React, {useState} from 'react';

export interface ForgetPasswordProps {
    code: number;
}

export const InsertCodeBody = ({code}: ForgetPasswordProps) => {
    const [insertedCode, setInsertedCode] = useState<string>('');

    const codeInserted = ({value}: HandleChangeProps) => {
        setInsertedCode(value);
    };
    const compareCodes = () => {
        console.log('Code inserted');
        console.log(code);
        console.log(insertedCode);
        console.log('Is equal?');
        console.log(parseInt(insertedCode) === code);
    };

    const TextCheckCodeBTN = () => <div>Check code</div>;

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg font-semibold pb-2 border-b">
                Esqueci-me da password
            </div>
            <div>Introduza o código que foi enviado para o seu mail.</div>
            <div className=" relative z-0">
                <InputForm
                    type="number"
                    name="Code"
                    id="code"
                    value={insertedCode}
                    handleChange={codeInserted}
                    error={''}
                />
            </div>
            <div className="flex items-center justify-center gap-10">
                <PrimaryButton
                    children={<TextCheckCodeBTN />}
                    onClick={compareCodes}
                />
            </div>
        </div>
    );
};
