import React, {useState} from 'react';
import {REGEX_MAIL} from 'utils/regex';
import emailjs from '@emailjs/browser';
import {InputForm} from '@components/createBetter/inputForm';
import {PrimaryButton} from '@components/Button';

export interface ForgetPasswordProps {
    code: number;
    changeCode: (value: number) => void;
    mail: string;
    changeMail: (value: string) => void;
    mailSent: (value: boolean) => void;
}

export const InsertMailBody = ({
    code,
    changeCode,
    changeMail,
    mail,
    mailSent,
}: ForgetPasswordProps) => {
    // Constant, to prevent sending too many mails while testing.
    const sendMail: boolean = false;

    const [errorMail, setErrorMail] = useState<string>('');

    const changeMailInput = (e) => {
        const {name, value} = e.target;
        changeMail(value);
    };

    var templateToMail = {
        to_name: 'USER_MAIL',
        message: `${code}`,
    };

    const sendEmailClicked = () => {
        let canSendMail: boolean = true;
        if (!mail) {
            setErrorMail('Obrigatório');
            canSendMail = false;
        } else if (!REGEX_MAIL.test(mail)) {
            setErrorMail('Mail incorreto');
            canSendMail = false;
        }
        if (canSendMail) {
            sendEmail();
        }
    };

    // This has to be constant, are api keys.
    const sendEmail = () => {
        console.log(`Send email to ${mail}`);
        if (sendMail) {
            emailjs
                .send(
                    'gmail',
                    'template_h8to77o',
                    templateToMail,

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
        mailSent(true);
    };

    const TextInsertMailBTN = () => <div>Send Mail</div>;

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg font-semibold pb-2 border-b">
                Esqueci-me da password
            </div>
            <div>Introduza um email para recuperar o acesso à conta.</div>
            <div className=" relative z-0">
                <InputForm
                    htmlForm="mail"
                    name="Email"
                    id="emailRecover"
                    value={mail}
                    handleChange={changeMailInput}
                    error={errorMail}
                />
            </div>

            <div className="flex items-center justify-center gap-10">
                <PrimaryButton
                    children={<TextInsertMailBTN />}
                    onClick={sendEmailClicked}
                />
            </div>
        </div>
    );
};
