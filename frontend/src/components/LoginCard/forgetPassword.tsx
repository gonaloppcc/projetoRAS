import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL} from 'utils/regex';

export interface ForgetPasswordProps {
    code_generated: number;
    mail: string;
}

export const ForgetPassword = ({code_generated, mail}: ForgetPasswordProps) => {
    const sendMail: boolean = false;

    const [code, setCode] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [errorMail, setErrorMail] = useState('');

    const changeCode = (e) => {
        const {name, value} = e.target;
        setCode(value);
    };

    const changeMail = (e) => {
        const {name, value} = e.target;
        setInputMail(value);
    };

    var templateParams = {
        to_name: 'USER_MAIL',
        message: `${code_generated}`,
    };

    const sendEmailClicked = () => {
        let canSendMail: boolean = true;
        if (!inputMail) {
            setErrorMail('Obrigatório');
            canSendMail = false;
        } else if (!REGEX_MAIL.test(values.mail)) {
            setErrorMail('Mail incorreto');
            canSendMail = false;
        }
        if (canSendMail) {
            sendEmail();
        }
    };

    const sendEmail = () => {
        console.log('Send email');
        if (sendMail) {
            emailjs
                .send(
                    'gmail',
                    'template_h8to77o',
                    templateParams,

                    'xSUyz4Yg5V6qWfUlw'
                )
                .then(
                    function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    },
                    function (error) {
                        console.log('FAILED...', error);
                    }
                );
        }
    };
    const RedButton = (props) => {
        return (
            <div
                onClick={props.onClick}
                className="  text-white	h-12 p-2 w-24  bg-red-600 text-center	rounded"
            >
                <button type="submit">{props.text}</button>
            </div>
        );
    };

    const codeInserted = () => {
        console.log('Code inserted');
        console.log(code);
        console.log('Is equal?');
        console.log(parseInt(code) === code_generated);
    };
    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg  pl-6 pb-2">Esqueci-me da password</div>
            <div>
                Foi enviado um mail para o endereço pg50334 com um código de
                verificação.
            </div>
            <div className=" relative z-0">
                <InputForm
                    htmlForm="text"
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
            <div className="pt-4 flex flex-row gap-4 center">
                <RedButton text={'Send Mail'} onClick={sendEmailClicked} />
                <RedButton text={'Check code'} onClick={codeInserted} />
            </div>
        </div>
    );
};
