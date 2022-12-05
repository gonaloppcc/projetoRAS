import React, {useState} from 'react';
import {InsertMailBody} from '@components/RegisterSpecialist/insertMailBody';
import {InsertCodeBody} from '@components/RegisterSpecialist/insertCodeBody';

export const ForgetPassword = () => {
    // This var is only for debugging purposes.
    // Used to check if mails is going to be sent or not.
    const [mailSent, setMailSent] = useState<boolean>(false);

    const [code, setCode] = useState<number>(Math.floor(Math.random() * 100));
    const [mail, setMail] = useState<string>('');

    return (
        <div>
            {!mailSent && (
                <InsertMailBody
                    mailSent={setMailSent}
                    code={code}
                    changeCode={setCode}
                    mail={mail}
                    changeMail={setMail}
                />
            )}
            {mailSent && <InsertCodeBody code={code} />}
        </div>
    );
};
