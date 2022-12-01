import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL} from 'utils/regex';
import {RedButton} from './RedButton';
import {InsertMailBody} from './insertMailBody';
import {InsertCodeBody} from './insertCodeBody';

export interface ForgetPasswordProps {
    code_generated: number;
    mail: string;
}

export const ForgetPassword = ({code_generated, mail}: ForgetPasswordProps) => {
    // This var is only for debugging purposes.
    // Used to check if mails is going to be sent or not.
    const sendMail: boolean = false;

    const [mailSent, setMailSent] = useState<boolean>(false);
    {
        /*
    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg  pl-6 pb-2">Esqueci-me da password</div>
            <div>
                Foi enviado um mail para o endereço pg50334 com um código de
                verificação.
            </div>
            <div className=" relative z-0">
                <InputForm
                    htmlForm="mail"
                    name="Email"
                    id="emailRecover"
                    value={inputMail}
                    handleChange={changeMail}
                    error={errorMail}
                />
            </div>

            <div className=" relative z-0">
                <InputForm
                    htmlForm="number"
                    name="Code"
                    id="code"
                    value={code}
                    handleChange={changeCode}
                    error={''}
                />
            </div>
            <div className="flex items-center justify-center gap-10">
                <RedButton text={'Send Mail'} onClick={sendEmailClicked} />
                <RedButton text={'Check code'} onClick={codeInserted} />
            </div>
        </div>
    );
    */
    }
    return (
        <div>
            {!mailSent && <InsertMailBody mailSent={setMailSent} />}
            {mailSent && <InsertCodeBody />}
        </div>
    );
};
