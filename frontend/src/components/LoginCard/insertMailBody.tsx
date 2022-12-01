

import React, {useRef, useState} from 'react';

export const InsertMailBody =  => {
    
    const [inputMail, setInputMail] = useState<string>('');
    const [errorMail, setErrorMail] = useState<string>('');

    const changeMail = (e) => {
        const {name, value} = e.target;
        setInputMail(value);
    };

    var templateToMail = {
        to_name: 'USER_MAIL',
        message: `${code_generated}`,
    };

    const sendEmailClicked = () => {
        let canSendMail: boolean = true;
        if (!inputMail) {
            setErrorMail('Obrigatório');
            canSendMail = false;
        } else if (!REGEX_MAIL.test(inputMail)) {
            setErrorMail('Mail incorreto');
            canSendMail = false;
        }
        if (canSendMail) {
            sendEmail();
        }
    };

    // This has to be constant, are api keys.
    const sendEmail = () => {
        console.log(`Send email to ${inputMail}`);
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
    };

    return (<div>Página de inserir mail</div>)


}