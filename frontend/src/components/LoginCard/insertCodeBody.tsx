import {PrimaryButton} from '@components/Button';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';


export interface ForgetPasswordProps {
    code: number;
}

export const InsertCodeBody = ({code}: ForgetPasswordProps) => {
    const [insertedCode, setInsertedCode] = useState<string>('');
    const intl = useIntl();

    const featureForget = intl.formatMessage({id: 'loginCard.ForgetPassword'});
    const featureMessage = intl.formatMessage({id: 'loginCard.Message'});
    const featureCode = intl.formatMessage({id: 'loginCard.Code'});
    const featureCheck = intl.formatMessage({id: 'loginCard.CheckCode'});

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

    const TextCheckCodeBTN = () => <div>{featureCheck}</div>;

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg font-semibold pb-2 border-b">
                {featureForget}
            </div>
            <div>{featureMessage}</div>
            <div className=" relative z-0">
                <InputForm
                    type="number"
                    name={featureCode}
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
