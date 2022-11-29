import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';

export const ForgetPassword = (props) => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        console.log('Send email');

        emailjs
            .sendForm(
                'gmail',
                'template_h8to770',
                form.current,
                'xSUyz4Yg5V6qWfUlw'
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };
    const RedButton = (props) => {
        return (
            <div
                onClick={props.onClick}
                className=" items-start text-white	align-baseline	 h-12 p-2 w-24  bg-red-600 text-center	rounded"
            >
                <button type="submit">{props.text}</button>
            </div>
        );
    };
    return (
        <>
            <form
                ref={form}
                className="flex flex-col gap-3 p-5"
                onSubmit={sendEmail}
            >
                <label>Para quem?</label>
                <input type="text" name="to_name" />
                <label>Email</label>
                <input type="email" name="message" />
            </form>
            {/*
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
                        value={formValues.emailRecover}
                        handleChange={handleChange}
                        error={formErrors.emailRecover}
                    />

                    <div className="pt-4">
                        <RedButton text={'Reset'} onClick={sendEmail} />{' '}
                    </div>
                </div>
            </div>
    */}{' '}
        </>
    );
};
