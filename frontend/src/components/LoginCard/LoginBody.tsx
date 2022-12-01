import React, {useEffect, useState} from 'react';
import {InputForm} from '@components/createBetter/inputForm';
import {REGEX_MAIL} from '../../utils/regex';
import {RedButton} from './RedButton';
import {PrimaryButton} from '@components/Button';

// Receives a function that opens the Modal of "ForgetPassword"
export interface LoginBodyProps {
    setOpen: (value: boolean) => void;
}

export const LoginBody = ({setOpen}: LoginBodyProps) => {
    const intialValues = {
        mail: '',
        password: '',
    };

    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        console.log('Submissão feita');
        console.log(formValues);
    };

    //input change handler
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
    };

    //form validation handler
    // FIXME Em todos
    const validate = (values) => {
        let errors = {};
        // Phone numbers, cc, nifs all with 9 numbers

        if (!values.mail) {
            errors.mail = 'Obrigatório';
        } else if (!REGEX_MAIL.test(values.mail)) {
            errors.mail = 'Mail incorreto';
        }

        if (!values.password) {
            errors.password = 'Obrigatório';
        } else if (values.password.length < 4) {
            errors.password = 'Password tem de ter mais de 4 carateres';
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    const TextLoginBodyBTN = () => <div>Aceder</div>;

    return (
        <div className="h-screen w-screen justify-center flex items-center bg-CULTURED ">
            <div className="bg-white w-auto flex flex-col items-center px-10 pt-10 h-auto gap-3 relative pb-10 ">
                <div className="w-24 h-10  not-italic font-normal text-3xl leading-10 text-black flex-none order-none flex-grow-0">
                    Entrar
                </div>
                <div className="flex flex-col items-start flex-none order-1">
                    <div className="flex-none order-none  ">
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="gap-5"
                        >
                            {/*  FIXME Em todos */}
                            <InputForm
                                htmlFor="email"
                                name="Email"
                                id="mail"
                                value={formValues.mail}
                                handleChange={handleChange}
                                error={formErrors.mail}
                            />

                            <InputForm
                                htmlFor="password"
                                name="Palavra-passe"
                                id="password"
                                value={formValues.password}
                                handleChange={handleChange}
                                error={formErrors.password}
                            />

                            <div className="flex flex-col center px-20 py-3">
                                {/*  FIXME Em todos */}
                                {/*<button type="submit">Aceder</button>*/}
                                <PrimaryButton
                                    type={'submit'}
                                    children={<TextLoginBodyBTN />}
                                />
                            </div>
                            <div className="flex-none order-2  text-center	">
                                <a
                                    href="/register"
                                    className="flex-none order-2 h text-lg"
                                >
                                    {/*  FIXME Em todos */}
                                    Não tem conta? Registe-se agora!
                                </a>
                                <div
                                    onClick={() => setOpen(true)}
                                    className="cursor-pointer"
                                >
                                    Esqueci-me da palavra-passe
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
