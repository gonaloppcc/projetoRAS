import React, {useState} from 'react';
import {REGEX_MAIL} from 'utils/regex';
import emailjs from '@emailjs/browser';
import {HandleChangeProps, InputForm} from '@components/createBetter/inputForm';
import {PrimaryButton} from '@components/Button';
import {FormattedMessage, useIntl} from 'react-intl';

export interface ForgetPasswordProps {
    code: number;
    changeCode: (value: number) => void;
    mail: string;
    changeMail: (value: string) => void;
    mailSent: (value: boolean) => void;
}

export const InsertMailBody = ({
    code,
    changeMail,
    mail,
    mailSent,
}: ForgetPasswordProps) => {
    const intl = useIntl();

    const featureRequired = intl.formatMessage({id: 'loginCard.Required'});
    const errorMail = intl.formatMessage({id: 'loginCard.error.mail'});
    const featureForget = intl.formatMessage({id: 'loginCard.ForgetPassword'});
    const featureMail = intl.formatMessage({id: 'loginCard.EnterMail'});
    const featureSend = intl.formatMessage({id: 'loginCard.SendMail'});

    const [mailError, setMailError] = useState<string>('');

    const sendMail: boolean = false; // Constant, to prevent sending too many mails while testing.

    const changeEmailHandler = ({value}: HandleChangeProps) => {
        changeMail(value);
    };

    const templateToMail = {
        to_name: 'USER_MAIL',
        message: `${code}`,
    };

    const sendEmailClicked = () => {
        let canSendMail: boolean = true;
        if (!mail) {
            setMailError(featureRequired);
            canSendMail = false;
        } else if (!REGEX_MAIL.test(mail)) {
            setMailError(errorMail);
            canSendMail = false;
        }
        if (canSendMail) {
            sendEmail();
        }
    };

    // This has to be constant, are api keys.
    const sendEmail = () => {
        console.log(`Send mail to ${mail}`);
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

    return (
        <div className="flex flex-col gap-3 p-5">
            <div className="text-lg font-semibold pb-2 border-b">
                {featureForget}
            </div>
            <div>{featureMail}</div>
            <div className=" relative z-0">
                <InputForm
                    type="mail"
                    name="Email"
                    id="emailRecover"
                    value={mail}
                    handleChange={changeEmailHandler}
                    error={mailError}
                />
            </div>

            <div className="flex items-center justify-center gap-10">
                <PrimaryButton onClick={sendEmailClicked}>
                    <div>{featureSend}</div>
                </PrimaryButton>
            </div>
        </div>
    );
};
