import React, {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';
import {InputForm} from '@components/createBetter/inputForm';

export const ForgetPassword = (props) => {
    const sendMail: boolean = false;
    const form = useRef();

    const [code, setCode] = useState('');
    const [mail, setMail] = useState('');

    const changeCode = (e) => {
        const {name, value} = e.target;
        setCode(value);
    };

    const changeMail = (e) => {
        const {name, value} = e.target;
        setMail(value);
    };

    var templateParams = {
        to_name: 'USER_MAIL',
        message: `${props.code_generated}`,
    };

    const [error, setError] = useState({});
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
        console.log(parseInt(code) === props.code_generated);
    };
    return (
        <>
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
                        value={mail}
                        handleChange={changeMail}
                        error={error.mail}
                    />
                </div>

                <div className=" relative z-0">
                    <InputForm
                        htmlForm="text"
                        name="Code"
                        id="code"
                        value={code}
                        handleChange={changeCode}
                        error={error.mail}
                    />
                </div>
                <div className="pt-4 flex flex-row gap-4 center">
                    <RedButton text={'Send Mail'} onClick={sendEmail} />
                    <RedButton
                        text={'Check code'}
                        onClick={codeInserted}
                    />{' '}
                </div>
            </div>
        </>
    );
};
